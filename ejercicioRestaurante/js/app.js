// Importar funciones
import { addReserva, get, getReservas, deleteReserva } from "./API.js";

"use strict";

//Inicializamos variable
let restaurante, fecha, empleado, mesaPulsada;

// Cuando el documento se ha cargado: 
document.addEventListener("DOMContentLoaded", () => {
    //listar restaurantes en el option
    listarRestaurantes();
    //cuando se cambie la selección de restaurante se carga el evento
    $("#rest").on("change", listarEmpleados);
    // Configurar la validación de formularios
    validar();
});

//obtener y mostrar la lista de restaurantes
const listarRestaurantes = async () => {
    // Obtener la lista de restaurantes mediante la API
    const restaurantes = await get("http://localhost:3000/restaurantes", "");
    
    // Iterar sobre los restaurantes y agregar opciones
    restaurantes.forEach(restaurante => {
        $("#rest").append(`<option value="${restaurante.idrest}">${restaurante.name}</option>`);
        $("#rest").append(`<input type="hidden" id="mesas${restaurante.idrest}" value="${restaurante.mesas}">`);
    });
}

//obtener y mostrar empleados
const listarEmpleados = async () => {
    // Limpiar empleados
    $("#emp").empty();
    // opción por defecto
    $("#emp").append(`<option value="">Seleccione un empleado</option>`);
    // Obtener empleados mediante la API, pasando el ID del restaurante seleccionado
    const empleados = await get("http://localhost:3000/empleados", $("#rest").val());
    
    // Iterar sobre los empleados y agregar opciones
    empleados.forEach(empleado => {
        $("#emp").append(`<option value="${empleado.idemp}">${empleado.nomape}</option>`);
    });
}

// Configuración de la validación de formularios usando el plugin jQuery Validate
const validar = () => {
    $(".form-datos").validate({
        errorElement: "em",
        errorPlacement: function (error, element) {
            error.addClass("invalid-feedback");
            error.insertAfter(element);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass("is-invalid").removeClass("is-valid");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).addClass("is-valid").removeClass("is-invalid");
        },
        // Reglas de validación
        rules: {
            rest: "required",
            emp: "required",
            fechaR: "required",
        },
        submitHandler: (form) => {
            // Al enviar el formulario, se actualizan las mesas y se almacenan datos
            pintarMesas()
            restaurante = $("#rest").val();
            fecha = $("#fechaR").val();
            empleado = $("#emp").val();
        },
    });

    $(".frmReservas").validate({
        errorElement: "em",
        errorPlacement: function (error, element) {
            error.addClass("invalid-feedback");
            error.insertAfter(element);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass("is-invalid").removeClass("is-valid");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).addClass("is-valid").removeClass("is-invalid");
        },
        // Reglas de validación
        rules: {
            nameApeCli: "required",
            numCom: "required",
        },
        submitHandler: (form) => {
            // Al enviar el formulario, se añaden las reservas
            anadirReserva()
        },
    });
}

//muestra las mesas del restaurante seleccionado
const pintarMesas = async () => {
    // Obtener el numero de mesas del restaurante seleccionado
    const nMesas = $(`#mesas${$("#rest").val()}`).val();
    // Obtener las reservas del restaurante y fecha seleccionados
    const reservas = await getReservas($("#rest").val(), $("#fechaR").val());
    
    // Limpiar el contenedor de mesas
    $("#comedor").empty();
    
    // Iterar sobre las mesas y agregar imágenes al contenedor
    for (let index = 1; index <= nMesas; index++) {
        let pos = reservas.findIndex(reserva => reserva.mesa === index);
        if (pos!=-1) {
            $("#comedor").append(`<img id="${(index)}" id-reserva="${reservas[pos].idreservas}" class="mesaOcupada" src='imagenes/mesaOcupada.png' title='mesa = ${(index)}, cliente = ${reservas[pos].nomapecli}'>`)
        } else {
            $("#comedor").append(`<img id="${(index)}" class="mesaLibre" src='imagenes/mesaLibre.png' title='mesa = ${(index)}'>`)
        }
    }
    
    // Configurar eventos click para las mesas ocupadas y libres
    $(".mesaOcupada").on("click", eliminarReserva);
    $(".mesaLibre").on("click", function() {
        // Al hacer clic en una mesa librese guarda la mesa pulsada y se muestra el frmulario
        mesaPulsada = $(this).attr("id");
        $(".frmReservas input").val("");
        $("input").removeClass("is-valid");
        $("input").removeClass("is-invalid");
        $("#frmModal").modal("show");
    });
}

//añade una reserva
const anadirReserva = function () {
    // Obtener valores de los campos del formulario
    const cliente = $("#nameApeCli").val();
    const comensales = $("#numCom").val();
    
    // Crear objeto de reserva
    const reserva = {
        'mesa': mesaPulsada,
        'rest': restaurante,
        'emp': empleado,
        'fecha': fecha,
        'cli': cliente,
        'comen': comensales,
    }
    
    //Enviamos la reserva a la API
    agregarReserva(reserva);
    
    // Ocultamos el modal después de añadir la reserva
    $("#frmModal").modal("hide");
}

// agregar una reserva mediante la API
const agregarReserva = async (reserva) => {
    // Llamar a la función de la API para agregar la reserva
    const data = await addReserva(reserva);
    
    // Mostrar mensaje de éxito o error según la respuesta de la API
    if (data.mensaje == "exito") {
        mensaje("Reserva Completada", "success")
        //pintamos las mesas del restaurante
        pintarMesas();
    } else {
        mensaje("Fallo en la reserva: " + data.mensaje, "error");
    }
}

//eliminar una reserva
const eliminarReserva = function () {
    // Obtiene el número de mesa de la reserva a eliminar
    const nMesa = $(this).attr("id");
    const nReserva = $(this).attr("id-reserva");
    
    // Mostrar confirmación antes de eliminar
    Swal.fire({
        title: "¿Desea eliminar la reserva?",
        text: "De la mesa " + nMesa,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Eliminar",
        focusCancel: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            // Si se confirma la eliminación, mostrar mensaje y actualizar las mesas
            mensaje(`reserva borrada`, "success");
            await deleteReserva(nReserva);
            pintarMesas();
        }
    });
}

// Función para mostrar mensajes emergentes usando la librería SweetAlert
function mensaje(texto, icono) {
    Swal.fire({
        position: 'center',
        icon: icono,
        title: texto,
        showConfirmButton: true,
        timer: 10000
    })
}
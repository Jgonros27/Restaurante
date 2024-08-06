"use strict";

export const get=async (url,rest)=>{
    try {
        let response;
        if (rest == "") {
            response = await fetch(url);
        }
        else{
            response = await fetch(`${url}/${rest}`)
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return ({'error':error});
    }
}

export const getReservas=async (rest,fecha)=>{
    try {
        const response = await fetch(`http://localhost:3000/reservas/${rest}/${fecha}`)
        const data = await response.json();
        return data;
    } catch (error) {
        return ({'error':error});
    }
}

export const addReserva= async(reserva)=>{
    const params = {
        method: "POST",
        body: JSON.stringify(reserva),
        headers: {
          "Content-Type": "application/json",
        },
    }
    try {
        const response = await fetch(`http://localhost:3000/reservas`,params);
        if (response.ok) {
            const data = await response.json();
            return { 'mensaje': `exito` };
        } else {
            // Devuelve un objeto con el mensaje de error en caso de fallo
            return { 'mensaje': `Error en la solicitud: ${response.status} ${response.statusText}` };
        }
    } catch (error) {
        return ({'mensaje' : error})
    }
}

export const deleteReserva=async(id)=>{
    const param={
        method:"DELETE"
    }
    try {
        const response = await fetch(`http://localhost:3000/reservas/${id}`,param);
        const data = await response.json();
        return ({'mensaje':'borrado'});
    } catch (error) {
        return ({'mensaje':'no borrado'});
    }
}
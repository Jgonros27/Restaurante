"use strict"

import { Router } from "express"
import { getRestaurantes, getEmpleados, getReservas, addReserva,deleteReservas } from "../controllers/restaurante.controllers.js";
import { validacionInsertar,validacionDelete } from "../validators/restaurante.validator.js";

const router = Router();

router.get("/restaurantes",getRestaurantes);

router.get("/empleados/:idrest",getEmpleados);

router.get("/reservas/:idrest/:fecha",getReservas);

router.post("/reservas",validacionInsertar,addReserva);

router.delete("/reservas/:idreserva",validacionDelete,deleteReservas);

export default router; //exportamos
"use strict";
import {check, validationResult} from "express-validator"

export const validacionInsertar=[
    
    check("mesa").exists().notEmpty().isNumeric().withMessage("El id de la mesa no debe estar vacio, y debe de ser numérico"),
    check("rest").exists().notEmpty().isNumeric().withMessage("El id del restaurante no debe estar vacio, y debe de ser numérico"),
    check("emp").exists().notEmpty().isNumeric().withMessage("El id del empleado no debe estar vacio, y debe de ser numérico"),
    check("fecha").exists().notEmpty().matches(/^([2][0][2-9][0-9])[-]([0][0-9]||[1][0-2])[-]([0-2][0-9]||[3][0-1])$/).withMessage("La fecha no debe de estar vacía y debe de ser válida"),
    check("cli").exists().notEmpty().isLength({min:3,max:40}).withMessage("El nombre del cliente no debe estar vacio, debe tener entre 3 y 40 caracteres"),
    check("comen").exists().notEmpty().isNumeric().withMessage("El numero de comensales no debe estar vacio, debe de ser un número"),
    
    (req,res,next)=>{
        const errors = validationResult(req); //Array tantas filas como campos valide
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors:errors.array() //Devolver el mensaje
            })
        } else { //todo correcto
            next(); //Sigue la ejecución del siguiente middleware
        }
    }
]

export const validacionDelete=[
    
    check("idreserva").exists().notEmpty().isNumeric().withMessage("El id de la reserva no debe estar vacio, y debe de ser numérico"),
    
    (req,res,next)=>{
        const errors = validationResult(req); //Array tantas filas como campos valide
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors:errors.array() //Devolver el mensaje
            })
        } else { //todo correcto
            next(); //Sigue la ejecución del siguiente middleware
        }
    }
]
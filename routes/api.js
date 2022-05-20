const express = require('express');
const router = express.Router(); 
const {vistaPersonas, crearPersonas, vistaUnaPersona, editarPersona, borrarPersona} = require('../controller/controller.js')
const {check, validationResult, body} = require ("express-validator");
const {validarId} = require("../middleware/validation")

/* GET users listing. */
router.get('/ver', vistaPersonas);
router.post('/crear',[
    check("nombre").not().isEmpty().withMessage("El campo no debe estar vacio.")
                   .isLength({min: 5, max: 30}).withMessage("El nombre debe tener entre 5 y 30 caracteres."),
    check("edad").not().isEmpty().withMessage("El campo no debe estar vacio."),
    check("dni").not().isEmpty().withMessage("El campo no debe estar vacio."),
    check("sexo").not().isEmpty().withMessage("El campo no debe estar vacio.")
                 /*se iba a crear otro validador para el sexo pero se 
                 seteo valores via schema*/,
    check("email").not().isEmpty().withMessage("El campo no debe estar vacio.")
                  .isEmail().normalizeEmail().withMessage("No se ingreso un mail valido.")
], crearPersonas);

router.get('/ver/:id', validarId, vistaUnaPersona);
router.put("/editar/:id", validarId, editarPersona)
router.delete("/eliminar/:id", validarId, borrarPersona)

module.exports = router;

const { useColors } = require('debug/src/browser');
const { validationResult } = require('express-validator');
const {validar} = require("../middleware/validation");
const {Persona} = require('../models/model');

const vistaUno = (req, res)=>{
    res.render('index', { title: 'Express' });
}

const vistaPersonas = async (req, res) =>{
    const personas = await Persona.find()
    res.json({personas})
}

const vistaUnaPersona = async (req, res) => {
    try {
        const persona = await Persona.findById(req.params.id)
        res.json({persona})
    } catch (error) {
        res.status(400).json({msg: "Persona no encontrada", error})
    }
}

const editarPersona = async (req, res) => {
    try {
        const {id} = req.params
        const valores = req.body.valores
        await Persona.findByIdAndUpdate(id, req.body)
        res.status(202).json({valores, msg:"Persona editada"})
    } catch (error) {
        res.status(501).json({msg: "No se puede editar persona", error})
    }
}

const crearPersonas = async (req, res) => {
    try {
        const error = validationResult(req)
        if (error.isEmpty()) {
        const crear = new Persona(req.body);
        await crear.save()
        res.status(201).json({msg: "Persona registrada",crear})
        } else {
            res.status(501).json(error)
        }
    } catch (error) {
        res.status(501).json({msg: "No se puede guardar persona", error})
    }
}

const borrarPersona = async (req,res) => {
    try {
        const persona = await Persona.findByIdAndDelete(req.params.id)
        res.json({msg: "Persona eliminada", persona})
    } catch (error) {
        res.status(400).json({msg: "La persona no pudo ser eliminada", error})
    }
}

module.exports = {vistaUno, crearPersonas, vistaPersonas, vistaUnaPersona, editarPersona, borrarPersona}
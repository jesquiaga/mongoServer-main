const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const storeSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    edad: {
        type: Number,
        required: true,
    },
    dni: {
        type: Number,
        required: true,
        unique: true,
    },
    sexo: {
        type: String,
        enum: ['Femenino', 'Masculino'],
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

});
const Persona = mongoose.model('Persona', storeSchema);

module.exports = {Persona}
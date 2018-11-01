const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let contenedorSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    subtitulo: {
        type: String,
        required: [true, 'El subtitulo es necesario']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es necesaria']
    },
    img: {
        type: String,
        require: false
    },
    estado: {
        type: Boolean,
        default: true
    },
    pais: {
        type: String
    },
    tipo: {
        type: String,
        required: [true, 'El tipo es necesario']
    }
});

module.exports = mongoose.model("Contenedor", contenedorSchema);

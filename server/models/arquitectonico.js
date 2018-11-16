const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let arquitectonicoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es necesaria']
    },
    precio: { 
        desde: { type: String, required: [true, 'Desde es necesario']  },
        hasta: { type: String, required: [true, 'Hasta es necesario'] }
     }, 
    caracteristicas: {
        cocina: { type: String, required: [true, 'Cocina es necesario']  },
        banio: { type: String, required: [true, 'Baño es necesario'] }
    },
    imgs: {
        plano: { type: String, required: [true, 'Plano es necesario']  },
        img_1: { type: String, required: [true, 'Imagen 1 es necesaria']  },
        img_2: { type: String, required: [true, 'Imagen 2 es necesaria'] },
        img_3: { type: String, required: [true, 'Imagen 2 es necesaria'] }
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Contenedor", arquitectonicoSchema);

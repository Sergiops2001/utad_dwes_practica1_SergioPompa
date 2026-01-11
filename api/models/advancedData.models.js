/*
    Título: Advanced Data   Model
    Nombre: Sergio Pompa
    Descripción: Creamos un módulo para gestionar el modelo de datos avanzados para MongoDB con Mongoose
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Sondas */
const AdvancedDataScheme = new mongoose.Schema(
    {
        airPressure: {
            type: Number,
            required: true
        },
        uvIndex: {
            type: Number,
            required: true
        },
        pollenIndex: {
            type: Number,
            required: true
        },
        sondaName: {
            type: String,
            required: true
        },
        dateMedition: {
            type: Date,
            required: true
        },
        hourMedition: {
            type: String,
            required: true
        },
        deleted: {
            type: Boolean,
            default: false
        },

    },
    {
        timestamps: true,
        versionKey: false
    }
);
/* Exportado de Módulo */
module.exports = mongoose.model("datoavanzado", AdvancedDataScheme);

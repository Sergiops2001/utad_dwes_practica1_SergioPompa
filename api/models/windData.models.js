/*
    Título: Wind data  Model
    Nombre: Sergio Pompa
    Descripción: Creamos un módulo para gestionar el modelo de datos de viento para MongoDB con Mongoose
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Sondas */
const WindDataScheme = new mongoose.Schema(
    {
        windSpeed: {
            type: Number,
            required: true
        },
        windGustSpeed: {
            type: Number,
            required: true
        },
        windDirection: {
            type: String,
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
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
/* Exportado de Módulo */
module.exports = mongoose.model("datoviento", WindDataScheme);
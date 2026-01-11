/*
    Título: Temperature data Model
    Nombre: Sergio Pompa
    Descripción: Creamos un módulo para gestionar el modelo de datos de temperatura para MongoDB con Mongoose
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de informacion de temperatura */
const TemperatureDataScheme = new mongoose.Schema(
    {
        value: {
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
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
/* Exportado de Módulo */
module.exports = mongoose.model("datotemperatura", TemperatureDataScheme);

/*
    Título: Humidity Data Model
    Nombre: Sergio Pompa
    Descripción: Creamos un módulo para gestionar el modelo de datos de humedad para MongoDB con Mongoose
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Sondas */
const HumidityDataScheme = new mongoose.Schema(
    {
        airHumidity: {
            type: Number,
            required: true
        },
        DewPoint: {
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
module.exports = mongoose.model("datohumedad", HumidityDataScheme);

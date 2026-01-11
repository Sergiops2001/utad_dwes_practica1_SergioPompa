/*
    Título: Meteorology info Model
    Nombre: Sergio Pompa
    Descripción: Creamos un módulo para gestionar el modelo de informacion meteorologica para MongoDB con Mongoose
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de informacion meteorologica */
const MeteorologyInfoScheme = new mongoose.Schema(
    {
        temperature: {
            type: Number,
            required: true
        },
        windChill: {
            type: Number,
            required: true
        },
        cloudCover: {
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
module.exports = mongoose.model("infometeorologica", MeteorologyInfoScheme);

/*
    Título: Precipitation data Model
    Nombre: Sergio Pompa
    Descripción: Creamos un módulo para gestionar el modelo de datos de precipitacion para MongoDB con Mongoose
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de informacion meteorologica */
const PrecipitationDataScheme = new mongoose.Schema(
    {
        precipitationType: {
            type: String,
            required: true           
        },
        precipitationProbability: {
            type: Number,
            required: true
        },
        acumulatedPrecipitation: {
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
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
/* Exportado de Módulo */
module.exports = mongoose.model("datoprecipitacion", PrecipitationDataScheme);
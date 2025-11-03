/*
    Título: Air quality  Model
    Nombre: Sergio Pompa
    Descripción: Creamos un módulo para gestionar el modelo de calidad del viento para MongoDB con Mongoose
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Sondas */
const AirQualityScheme = new mongoose.Schema(
    {
        airQualityIndex: {
            type: Number,
            required: true           
        },
        ozoneAmount: {
            type: Number,
            required: true
        },
        numberSmallParticles: {
            type: Number,
            required: true
        },
        numberLargeParticles: {
            type: Number,
            required: true
        },
        amountNitrogenDioxide: {
            type: Number,
            required: true
        },
        amountCarbonMonoxide: {
            type: Number,
            required: true
        },
        amountSulfurDioxide: {
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
module.exports = mongoose.model("calidadaire", AirQualityScheme);

/*
    Título: Sondas Model
    Nombre: Sergio Pompa
    Descripción: Creamos un módulo para gestionar el modelo de sondas para MongoDB con Mongoose
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Sondas */
const SondasScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        description: {
            type: String,
            default: ""
        },
        location: {
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
module.exports = mongoose.model("sondas", SondasScheme);
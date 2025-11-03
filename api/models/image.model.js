
/*
    Título: Image Model
    Nombre: Sergio Pompa
    Descripción: Creamos un módulo para gestionar el modelo de images para MongoDB con Mongoose
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Sondas */
const ImageScheme = new mongoose.Schema(
    {
        location: {
            type: String,
            required: true           
        },
        imageUrl: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        hour: {
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
module.exports = mongoose.model("images", ImageScheme);
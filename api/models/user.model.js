/*
    Título: Users Model
    Nombre: Sergio Pompa 
    Descripción: Creamos un módulo para gestionar el modelo de users para MongoDB con Mongoose
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Usuarios */
const UsersScheme = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        fullName: {
            type: String,
            unique: true,
            required: true
        },
        description: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
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
module.exports = mongoose.model("users", UsersScheme);
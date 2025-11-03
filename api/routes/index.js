/*
    Título: Index
    Nombre: Sergio Pompa Sierra 
    Descripción: Creamos un fichero general para importar las rutas del programa
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");
const fs = require("fs");

/* Declaraciones Globales */
// Constantes
const router = express.Router();

/* Codificación de Funciones */
const removeFileExtension = (fileName) => {

    // Devolvemos la primera parte (antes del punto)
    return fileName.split(".").shift();
}

/* Ejecución Principal */
// Recorremos todas las rutas y las vamos añadiendo
fs.readdirSync(__dirname).forEach((file) => {
    // Variables necesarias
    const name = removeFileExtension(file);

    // Si no es el fichero filter añadimos la ruta
    if (name !== "index") {
        router.use("/" + name, require("./" + name + ".routes"));
    }
});

/* Exportado de módulo */
module.exports = router;
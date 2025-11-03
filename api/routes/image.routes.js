/*
    Título: Image Route
    Nombre: Sergio Pompa
    Descripción: Declaración de las rutas de usuario
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");

// Bibliotecas propias
const { 
    getImages,
    getImage,
    createImage,
    updateImage,
    deleteImage
} = require("../controllers/image.controller");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
// GET ALL
router.get("/", getImages);

// GET BY ID
router.get("/:id", getImage);

// CREATE
router.post("/", createImage);

// UPDATE
router.put("/:id", updateImage);

// DELETE
router.delete("/:id", deleteImage);

/* Exportado de Módulo */
module.exports = router;
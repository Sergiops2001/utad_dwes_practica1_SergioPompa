/*
    Título: precipitationData Route
    Nombre: Sergio Pompa
    Descripción: Declaración de las rutas de precipitationData
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");

// Bibliotecas propias
const { 
    getAllPrecipitation,
    getPrecipitationById,
    createPrecipitation,
    updatePrecipitation,
    deletePrecipitation
} = require("../controllers/precipitationData.controller");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
// GET ALL
router.get("/", getAllPrecipitation);

// GET BY ID
router.get("/:id", getPrecipitationById);

// CREATE
router.post("/", createPrecipitation);

// UPDATE
router.put("/:id", updatePrecipitation);

// DELETE
router.delete("/:id", deletePrecipitation);

/* Exportado de Módulo */
module.exports = router;
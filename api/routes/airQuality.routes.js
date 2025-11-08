/*
    Título: airQuality Route
    Nombre: Sergio Pompa
    Descripción: Declaración de las rutas de airQuality
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");

// Bibliotecas propias
const { 
    getAllAirQuality,
    getAirQualityById,
    createAirQuality,
    updateAirQuality,
    deleteAirQuality
} = require("../controllers/airQuality.controller");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
// GET ALL
router.get("/", getAllAirQuality);

// GET BY ID
router.get("/:id", getAirQualityById);

// CREATE
router.post("/", createAirQuality);

// UPDATE
router.put("/:id", updateAirQuality);

// DELETE
router.delete("/:id", deleteAirQuality);

/* Exportado de Módulo */
module.exports = router;
/*
    Título: User Route
    Nombre: Sergio Pompa
    Descripción: Declaración de las rutas de usuario
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");

// Bibliotecas propias
const { 
    getAllHumidity,
    getHumidityById,
    createHumidity,
    updateHumidity,
    deleteHumidity
} = require("../controllers/humidityData.controller");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
// GET ALL
router.get("/", getAllHumidity);

// GET BY ID
router.get("/:id", getHumidityById);

// CREATE
router.post("/", createHumidity);

// UPDATE
router.put("/:id", updateHumidity);

// DELETE
router.delete("/:id", deleteHumidity);

/* Exportado de Módulo */
module.exports = router;
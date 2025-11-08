/*
    Título: meteorologyinfo Route
    Nombre: Sergio Pompa
    Descripción: Declaración de las rutas de meteorologyinfo
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");

// Bibliotecas propias
const { 
    getAllMeteorology,
    getMeteorologyById,
    createMeteorology,
    updateMeteorology,
    deleteMeteorology
} = require("../controllers/meteorologyinfo.controller");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
// GET ALL
router.get("/", getAllMeteorology);

// GET BY ID
router.get("/:id", getMeteorologyById);

// CREATE
router.post("/", createMeteorology);

// UPDATE
router.put("/:id", updateMeteorology);

// DELETE
router.delete("/:id", deleteMeteorology);

/* Exportado de Módulo */
module.exports = router;
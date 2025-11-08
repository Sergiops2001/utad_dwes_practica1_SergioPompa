/*
    Título: Sonda Route
    Nombre: Sergio Pompa
    Descripción: Declaración de las rutas de Sonda
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");

// Bibliotecas propias
const { 
    getSondas,
    getSonda,
    createSonda,
    updateSonda,
    deleteSonda
} = require("../controllers/sonda.controller");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
// GET ALL
router.get("/", getSondas);

// GET BY ID
router.get("/:id", getSonda);

// CREATE
router.post("/", createSonda);

// UPDATE
router.put("/:id", updateSonda);

// DELETE
router.delete("/:id", deleteSonda);

/* Exportado de Módulo */
module.exports = router;
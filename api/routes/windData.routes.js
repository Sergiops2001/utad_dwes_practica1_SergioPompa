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
    getAllWind,
    getWindById,
    createWind,
    updateWind,
    deleteWind
} = require("../controllers/windData.controller");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
// GET ALL
router.get("/", getAllWind);

// GET BY ID
router.get("/:id", getWindById);

// CREATE
router.post("/", createWind);

// UPDATE
router.put("/:id", updateWind);

// DELETE
router.delete("/:id", deleteWind);

/* Exportado de Módulo */
module.exports = router;
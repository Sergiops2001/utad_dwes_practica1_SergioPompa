/*
    Título: advancedData Route
    Nombre: Sergio Pompa
    Descripción: Declaración de las rutas de advancedData
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");

// Bibliotecas propias
const { 
    getAllAdvancedData,
    getAdvancedDataById,
    createAdvancedData,
    updateAdvancedData,
    deleteAdvancedData
} = require("../controllers/advancedData.controller");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
// GET ALL
router.get("/", getAllAdvancedData);

// GET BY ID
router.get("/:id", getAdvancedDataById);

// CREATE
router.post("/", createAdvancedData);

// UPDATE
router.put("/:id", updateAdvancedData);

// DELETE
router.delete("/:id", deleteAdvancedData);

/* Exportado de Módulo */
module.exports = router;
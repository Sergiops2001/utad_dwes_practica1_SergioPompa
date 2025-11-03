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
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/user.controller");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
// GET ALL
router.get("/", getUsers);

// GET BY ID
router.get("/:id", getUser);

// CREATE
router.post("/", createUser);

// UPDATE
router.put("/:id", updateUser);

// DELETE
router.delete("/:id", deleteUser);

/* Exportado de Módulo */
module.exports = router;
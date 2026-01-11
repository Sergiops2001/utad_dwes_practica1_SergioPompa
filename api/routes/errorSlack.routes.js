/*
    Título: Error Slack Route
    Nombre: Sergio Pompa
    Descripción: Declaración de las rutas de error slack
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");

// Bibliotecas propias
const router = express.Router();

/* Definición de Rutas */

/**
 * @openapi
 * /api/v1/errorSlack/not-error:
 *  get:
 *    tags:
 *      - Testing
 *    summary: Test endpoint - No error
 *    description: Returns a 200 OK response for testing purposes (should NOT trigger Slack notification)
 *    responses:
 *      200:
 *        description: Success - No error
 */
router.get("/not-error", (req, res) => { res.status(200).send("NOT ERROR") });

/**
 * @openapi
 * /api/v1/errorSlack/client-error:
 *  get:
 *    tags:
 *      - Testing
 *    summary: Test endpoint - Client error
 *    description: Returns a 404 error for testing purposes (should NOT trigger Slack notification as it's < 500)
 *    responses:
 *      404:
 *        description: Client error - Not found
 */
router.get("/client-error", (req, res) => { res.status(404).send("CLIENT ERROR") });

/**
 * @openapi
 * /api/v1/errorSlack/server-error:
 *  get:
 *    tags:
 *      - Testing
 *    summary: Test endpoint - Server error
 *    description: Returns a 500 error for testing purposes (SHOULD trigger Slack notification)
 *    responses:
 *      500:
 *        description: Server error - Internal server error
 */
router.get("/server-error", (req, res) => { res.status(500).send("SERVER ERROR") });

/* Exportado de Módulo */
module.exports = router;
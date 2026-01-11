/*
    Título: Sonda Route
    Nombre: Sergio Pompa
    Descripción: Declaración de las rutas de sonda
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
    deleteSonda,
    getSondasByLocation
} = require("../controllers/sonda.controller");

// Importacion de los validadores
const { validateCreateSonda, validateUpdateSonda, validateGetSondaById, validateDeleteSondaById, validateGetSondaByLocation } = require("../validators/sonda.validator");

//Importacion de middleware
const { authMiddleware } = require("../middlewares/sesion.middleware");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
/**
 * @openapi
 * /api/v1/sonda:
 *  get:
 *    tags:
 *      - Sondas
 *    summary: Get all sondas
 *    description: Retrieves all sonda (probe) records from the database
 *    responses:
 *      200:
 *        description: Sondas retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/", getSondas);

/**
 * @openapi
 * /api/v1/sonda/{id}:
 *  get:
 *    tags:
 *      - Sondas
 *    summary: Get sonda by ID
 *    description: Retrieves a specific sonda by its ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Sonda ID
 *    responses:
 *      200:
 *        description: Sonda retrieved successfully
 *      400:
 *        description: Bad request - Invalid ID format
 *      404:
 *        description: Sonda not found
 *      500:
 *        description: Internal server error
 */
router.get("/:id", validateGetSondaById, getSonda);

/**
 * @openapi
 * /api/v1/sonda:
 *  post:
 *    tags:
 *      - Sondas
 *    summary: Create new sonda
 *    description: Creates a new sonda (probe) record (requires authentication)
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - location
 *            properties:
 *              name:
 *                type: string
 *                example: "Sonda-01"
 *              location:
 *                type: string
 *                example: "Madrid"
 *    responses:
 *      201:
 *        description: Sonda created successfully
 *      400:
 *        description: Bad request - Invalid input data
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *      500:
 *        description: Internal server error
 */
router.post("/", authMiddleware, validateCreateSonda, createSonda);

/**
 * @openapi
 * /api/v1/sonda/{id}:
 *  put:
 *    tags:
 *      - Sondas
 *    summary: Update sonda
 *    description: Updates an existing sonda record (requires authentication)
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Sonda ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              location:
 *                type: string
 *    responses:
 *      200:
 *        description: Sonda updated successfully
 *      400:
 *        description: Bad request - Invalid input data
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *      404:
 *        description: Sonda not found
 *      500:
 *        description: Internal server error
 */
router.put("/:id", authMiddleware, validateUpdateSonda, updateSonda);

/**
 * @openapi
 * /api/v1/sonda/{id}:
 *  delete:
 *    tags:
 *      - Sondas
 *    summary: Delete sonda
 *    description: Deletes a sonda record (requires authentication)
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Sonda ID
 *    responses:
 *      200:
 *        description: Sonda deleted successfully
 *      400:
 *        description: Bad request - Invalid ID format
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *      404:
 *        description: Sonda not found
 *      500:
 *        description: Internal server error
 */
router.delete("/:id", authMiddleware, validateDeleteSondaById, deleteSonda);

/**
 * @openapi
 * /api/v1/sonda/location/{location}:
 *  get:
 *    tags:
 *      - Sondas
 *    summary: Get sondas by location
 *    description: Retrieves all sondas in a specific location
 *    parameters:
 *      - in: path
 *        name: location
 *        required: true
 *        schema:
 *          type: string
 *        description: Location name
 *        example: Madrid
 *    responses:
 *      200:
 *        description: Sondas retrieved successfully
 *      400:
 *        description: Bad request - Invalid location
 *      404:
 *        description: No sondas found in this location
 *      500:
 *        description: Internal server error
 */
router.get("/location/:location", validateGetSondaByLocation, getSondasByLocation);

/* Exportado de Módulo */
module.exports = router;
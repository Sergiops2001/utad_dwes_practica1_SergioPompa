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
    deleteMeteorology,
    getMeteorologyAdvanced,
    getMeteorologyMin,
    getMeteorologyMax,
    getMeteorologyAvg,
    getMeteorologyMedian
} = require("../controllers/meteorologyinfo.controller");

// Importacion de los validadores
const { validateCreateMeteorologyInfo, validateUpdateMeteorologyInfo, validateGetMeteorologyInfoById, validateDeleteMeteorologyInfoById, validateGetMeteorologyInfoAdvanced, validateGetMeteorologyInfoStats } = require("../validators/meteorologyinfo.validator");

// Importacion de middleware
const { authMiddleware } = require("../middlewares/sesion.middleware");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
/**
 * @openapi
 * /api/v1/meteorologyinfo:
 *  get:
 *    tags:
 *      - Meteorology Info
 *    summary: Get all meteorology records
 *    description: Retrieves all meteorology measurements from the database
 *    responses:
 *      200:
 *        description: Meteorology records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/", getAllMeteorology);

/**
 * @openapi
 * /api/v1/meteorologyinfo/advanced:
 *  get:
 *    tags:
 *      - Meteorology Info
 *    summary: Get all Meteorology Info records
 *    description: " "
 *    responses:
 *      200:
 *        description: Meteorology Info records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/advanced", validateGetMeteorologyInfoAdvanced, getMeteorologyAdvanced);

/**
 * @openapi
 * /api/v1/meteorologyinfo/stats/min:
 *  get:
 *    tags:
 *      - Meteorology Info
 *    summary: Get minimum meteorology value
 *    description: Calculates the minimum meteorology value within a specified date range
 *    responses:
 *      200:
 *        description: Minimum meteorology value calculated successfully
 *      500:
 *        description: Internal server error
 */
router.get("/stats/min", validateGetMeteorologyInfoStats, getMeteorologyMin);

/**
 * @openapi
 * /api/v1/advancedData:
 *  get:
 *    tags:
 *      - Advanced Data
 *    summary: Get all Advanced Data records
 *    description: " "
 *    responses:
 *      200:
 *        description: Maximum meteorology value calculated successfully
 *      500:
 *        description: Internal server error
 */
router.get("/stats/max", validateGetMeteorologyInfoStats, getMeteorologyMax);

/**
 * @openapi
 * /api/v1/meteorologyinfo/stats/avg:
 *  get:
 *    tags:
 *      - Meteorology Info
 *    summary: Get average meteorology value
 *    description: Calculates the average meteorology value within a specified date range
 *    responses:
 *      200:
 *        description: Average meteorology value calculated successfully
 *      500:
 *        description: Internal server error
 */
router.get("/stats/avg", validateGetMeteorologyInfoStats, getMeteorologyAvg);

/**
 * @openapi
 * /api/v1/meteorologyinfo/stats/median:
 *  get:
 *    tags:
 *      - Meteorology Info
 *    summary: Get median meteorology value
 *    description: Calculates the median meteorology value within a specified date range
 *    responses:
 *      200:
 *        description: Median meteorology value calculated successfully
 *      500:
 *        description: Internal server error
 */
router.get("/stats/median", validateGetMeteorologyInfoStats, getMeteorologyMedian);

/**
 * @openapi
 * /api/v1/meteorologyinfo/{id}:
 *  get:
 *    tags:
 *      - Meteorology Info
 *    summary: Get meteorology record by ID
 *    description: Retrieves a specific meteorology measurement by its ID
 *    responses:
 *      200:
 *        description: Meteorology record retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/:id", validateGetMeteorologyInfoById, getMeteorologyById);

/**
 * @openapi
 * /api/v1/meteorologyinfo:
 *  post:
 *    tags:
 *      - Meteorology Info
 *    summary: Create new meteorology record
 *    description: Creates a new meteorology measurement (requires authentication)
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/MeteorologyInfo'
 *    responses:
 *      200:
 *        description: Returns the inserted object
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *    security:
 *      - bearerAuth: []
 * 
 */
router.post("/", authMiddleware, validateCreateMeteorologyInfo, createMeteorology);

/**
 * @openapi
 * /api/v1/meteorologyinfo/{id}:
 *  put:
 *    tags:
 *      - Meteorology Info
 *    summary: Update meteorology record
 *    description: Updates an existing meteorology measurement (requires authentication)
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Meteorology record ID
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/MeteorologyInfo'
 *    responses:
 *      200:
 *        description: Returns the inserted object
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *    security:
 *      - bearerAuth: []
 * 
 */
router.put("/:id", authMiddleware, validateUpdateMeteorologyInfo, updateMeteorology);

/**
 * @openapi
 * /api/v1/meteorologyinfo/{id}:
 *  delete:
 *    tags:
 *      - Meteorology Info
 *    summary: Delete meteorology record
 *    description: Deletes an existing meteorology measurement (requires authentication)
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Meteorology record ID
 *    responses:
 *      200:
 *        description: Returns the inserted object
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *    security:
 *      - bearerAuth: []
 * 
 */
router.delete("/:id", authMiddleware, validateDeleteMeteorologyInfoById, deleteMeteorology);

/* Exportado de Módulo */
module.exports = router;

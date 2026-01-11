/*
    Título: windData Route
    Nombre: Sergio Pompa
    Descripción: Declaración de las rutas de windData
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
    deleteWind,
    getWindAdvanced,
    getWindMin,
    getWindMax,
    getWindAvg,
    getWindMedian
} = require("../controllers/windData.controller");

// Importacion de los validadores
const { validateCreateWindData, validateUpdateWindData, validateGetWindDataById, validateDeleteWindDataById, validateGetWindDataAdvanced, validateGetWindDataStats } = require("../validators/windData.validator");

// Importacion de middleware
const { authMiddleware } = require("../middlewares/sesion.middleware");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
/**
 * @openapi
 * /api/v1/windData:
 *  get:
 *    tags:
 *      - Wind
 *    summary: Get all wind records
 *    description: Retrieves all wind measurements from the database
 *    responses:
 *      200:
 *        description: Wind records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/", getAllWind);

/**
 * @openapi
 * /api/v1/windData/advanced:
 *  get:
 *    tags:
 *      - Wind
 *    summary: Get filtered wind records
 *    description: Retrieves wind records filtered by date range and optionally by sonda name
 *    parameters:
 *      - in: query
 *        name: startDate
 *        required: true
 *        schema:
 *          type: string
 *          format: date
 *        description: Start date for filtering (YYYY-MM-DD)
 *      - in: query
 *        name: endDate
 *        required: true
 *        schema:
 *          type: string
 *          format: date
 *        description: End date for filtering (YYYY-MM-DD)
 *      - in: query
 *        name: sondaName
 *        required: false
 *        schema:
 *          type: string
 *        description: Optional sonda name filter
 *    responses:
 *      200:
 *        description: Filtered wind records retrieved successfully
 *      400:
 *        description: Bad request - Invalid date format or missing required parameters
 *      500:
 *        description: Internal server error
 */
router.get("/advanced", validateGetWindDataAdvanced, getWindAdvanced);

/**
 * @openapi
 * /api/v1/windData/stats/min:
 *  get:
 *    tags:
 *      - Wind
 *    summary: Get minimum wind value
 *    description: Calculates the minimum wind value within a specified date range
 *    parameters:
 *      - in: query
 *        name: startDate
 *        required: true
 *        schema:
 *          type: string
 *          format: date
 *        description: Start date (YYYY-MM-DD)
 *      - in: query
 *        name: endDate
 *        required: true
 *        schema:
 *          type: string
 *          format: date
 *        description: End date (YYYY-MM-DD)
 *      - in: query
 *        name: sondaName
 *        required: false
 *        schema:
 *          type: string
 *        description: Optional sonda name filter
 *    responses:
 *      200:
 *        description: Minimum value calculated successfully
 *      400:
 *        description: Bad request - Invalid parameters
 *      500:
 *        description: Internal server error
 */
router.get("/stats/min", validateGetWindDataStats, getWindMin);

/**
 * @openapi
 * /api/v1/windData/stats/max:
 *  get:
 *    tags:
 *      - Wind
 *    summary: Get maximum wind value
 *    description: Calculates the maximum wind value within a specified date range
 *    parameters:
 *      - in: query
 *        name: startDate
 *        required: true
 *        schema:
 *          type: string
 *          format: date
 *        description: Start date (YYYY-MM-DD)
 *      - in: query
 *        name: endDate
 *        required: true
 *        schema:
 *          type: string
 *          format: date
 *        description: End date (YYYY-MM-DD)
 *      - in: query
 *        name: sondaName
 *        required: false
 *        schema:
 *          type: string
 *        description: Optional sonda name filter
 *    responses:
 *      200:
 *        description: Maximum value calculated successfully
 *      400:
 *        description: Bad request - Invalid parameters
 *      500:
 *        description: Internal server error
 */
router.get("/stats/max", validateGetWindDataStats, getWindMax);

/**
 * @openapi
 * /api/v1/windData/stats/avg:
 *  get:
 *    tags:
 *      - Wind
 *    summary: Get average wind value
 *    description: Calculates the average wind value within a specified date range
 *    parameters:
 *      - in: query
 *        name: startDate
 *        required: true
 *        schema:
 *          type: string
 *          format: date
 *        description: Start date (YYYY-MM-DD)
 *      - in: query
 *        name: endDate
 *        required: true
 *        schema:
 *          type: string
 *          format: date
 *        description: End date (YYYY-MM-DD)
 *      - in: query
 *        name: sondaName
 *        required: false
 *        schema:
 *          type: string
 *        description: Optional sonda name filter
 *    responses:
 *      200:
 *        description: Average value calculated successfully
 *      400:
 *        description: Bad request - Invalid parameters
 *      500:
 *        description: Internal server error
 */
router.get("/stats/avg", validateGetWindDataStats, getWindAvg);

/**
 * @openapi
 * /api/v1/windData/stats/median:
 *  get:
 *    tags:
 *      - Wind
 *    summary: Get median wind value
 *    description: Calculates the median wind value within a specified date range
 *    parameters:
 *      - in: query
 *        name: startDate
 *        required: true
 *        schema:
 *          type: string
 *          format: date
 *        description: Start date (YYYY-MM-DD)
 *      - in: query
 *        name: endDate
 *        required: true
 *        schema:
 *          type: string
 *          format: date
 *        description: End date (YYYY-MM-DD)
 *      - in: query
 *        name: sondaName
 *        required: false
 *        schema:
 *          type: string
 *        description: Optional sonda name filter
 *    responses:
 *      200:
 *        description: Median value calculated successfully
 *      400:
 *        description: Bad request - Invalid parameters
 *      500:
 *        description: Internal server error
 */
router.get("/stats/median", validateGetWindDataStats, getWindMedian);

/**
 * @openapi
 * /api/v1/windData/{id}:
 *  get:
 *    tags:
 *      - Wind
 *    summary: Get wind record by ID
 *    description: Retrieves a specific wind measurement by its ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Wind record ID
 *    responses:
 *      200:
 *        description: Wind record retrieved successfully
 *      400:
 *        description: Bad request - Invalid ID format
 *      404:
 *        description: Record not found
 *      500:
 *        description: Internal server error
 */
router.get("/:id", validateGetWindDataById, getWindById);

/**
 * @openapi
 * /api/v1/windData:
 *  post:
 *    tags:
 *      - Wind
 *    summary: Create new wind record
 *    description: Creates a new wind measurement (requires authentication)
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - windSpeed
 *              - windGustSpeed
 *              - dateMedition
 *              - sondaName
 *            properties:
 *              windSpeed:
 *                type: number
 *                example: 15.2
 *              windGustSpeed:
 *                type: number
 *                example: 22.5
 *              dateMedition:
 *                type: string
 *                format: date-time
 *                example: "2024-01-07T12:00:00Z"
 *              sondaName:
 *                type: string
 *                example: "Sonda-01"
 *    responses:
 *      201:
 *        description: Wind record created successfully
 *      400:
 *        description: Bad request - Invalid input data
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *      500:
 *        description: Internal server error
 */
router.post("/", authMiddleware, validateCreateWindData, createWind);

/**
 * @openapi
 * /api/v1/windData/{id}:
 *  put:
 *    tags:
 *      - Wind
 *    summary: Update wind record
 *    description: Updates an existing wind measurement (requires authentication)
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Wind record ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              windSpeed:
 *                type: number
 *              windGustSpeed:
 *                type: number
 *              dateMedition:
 *                type: string
 *                format: date-time
 *              sondaName:
 *                type: string
 *    responses:
 *      200:
 *        description: Wind record updated successfully
 *      400:
 *        description: Bad request - Invalid input data
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *      404:
 *        description: Record not found
 *      500:
 *        description: Internal server error
 */
router.put("/:id", authMiddleware, validateUpdateWindData, updateWind);

/**
 * @openapi
 * /api/v1/windData/{id}:
 *  delete:
 *    tags:
 *      - Wind
 *    summary: Delete wind record
 *    description: Deletes an wind measurement (requires authentication)
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Wind record ID
 *    responses:
 *      200:
 *        description: Wind record deleted successfully
 *      400:
 *        description: Bad request - Invalid ID format
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *      404:
 *        description: Record not found
 *      500:
 *        description: Internal server error
 */
router.delete("/:id", authMiddleware, validateDeleteWindDataById, deleteWind);

/* Exportado de Módulo */
module.exports = router;

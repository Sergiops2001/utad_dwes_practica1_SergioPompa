/*
    Título: precipitationData Route
    Nombre: Sergio Pompa
    Descripción: Declaración de las rutas de precipitationData
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");

// Bibliotecas propias
const {
    getAllPrecipitation,
    getPrecipitationById,
    createPrecipitation,
    updatePrecipitation,
    deletePrecipitation,
    getPrecipitationAdvanced,
    getPrecipitationMin,
    getPrecipitationMax,
    getPrecipitationAvg,
    getPrecipitationMedian
} = require("../controllers/precipitationData.controller");

// Importacion de los validadores
const { validateCreatePrecipitationData, validateUpdatePrecipitationData, validateGetPrecipitationDataById, validateDeletePrecipitationDataById, validateGetPrecipitationDataAdvanced, validateGetPrecipitationDataStats } = require("../validators/precipitationData.validator");

// Importacion de middleware
const { authMiddleware } = require("../middlewares/sesion.middleware");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
/**
 * @openapi
 * /api/v1/precipitationData:
 *  get:
 *    tags:
 *      - Precipitation
 *    summary: Get all precipitation records
 *    description: Retrieves all precipitation measurements from the database
 *    responses:
 *      200:
 *        description: Precipitation records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/", getAllPrecipitation);

/**
 * @openapi
 * /api/v1/precipitationData/advanced:
 *  get:
 *    tags:
 *      - Precipitation
 *    summary: Get filtered precipitation records
 *    description: Retrieves precipitation records filtered by date range and optionally by sonda name
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
 *        description: Filtered precipitation records retrieved successfully
 *      400:
 *        description: Bad request - Invalid date format or missing required parameters
 *      500:
 *        description: Internal server error
 */
router.get("/advanced", validateGetPrecipitationDataAdvanced, getPrecipitationAdvanced);

/**
 * @openapi
 * /api/v1/precipitationData/stats/min:
 *  get:
 *    tags:
 *      - Precipitation
 *    summary: Get minimum precipitation value
 *    description: Calculates the minimum precipitation value within a specified date range
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
router.get("/stats/min", validateGetPrecipitationDataStats, getPrecipitationMin);

/**
 * @openapi
 * /api/v1/precipitationData/stats/max:
 *  get:
 *    tags:
 *      - Precipitation
 *    summary: Get maximum precipitation value
 *    description: Calculates the maximum precipitation value within a specified date range
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
router.get("/stats/max", validateGetPrecipitationDataStats, getPrecipitationMax);

/**
 * @openapi
 * /api/v1/precipitationData/stats/avg:
 *  get:
 *    tags:
 *      - Precipitation
 *    summary: Get average precipitation value
 *    description: Calculates the average precipitation value within a specified date range
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
router.get("/stats/avg", validateGetPrecipitationDataStats, getPrecipitationAvg);

/**
 * @openapi
 * /api/v1/precipitationData/stats/median:
 *  get:
 *    tags:
 *      - Precipitation
 *    summary: Get median precipitation value
 *    description: Calculates the median precipitation value within a specified date range
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
router.get("/stats/median", validateGetPrecipitationDataStats, getPrecipitationMedian);

/**
 * @openapi
 * /api/v1/precipitationData/{id}:
 *  get:
 *    tags:
 *      - Precipitation
 *    summary: Get precipitation record by ID
 *    description: Retrieves a specific precipitation measurement by its ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Precipitation record ID
 *    responses:
 *      200:
 *        description: Precipitation record retrieved successfully
 *      400:
 *        description: Bad request - Invalid ID format
 *      404:
 *        description: Record not found
 *      500:
 *        description: Internal server error
 */
router.get("/:id", validateGetPrecipitationDataById, getPrecipitationById);

/**
 * @openapi
 * /api/v1/precipitationData:
 *  post:
 *    tags:
 *      - Precipitation
 *    summary: Create new precipitation record
 *    description: Creates a new precipitation measurement (requires authentication)
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - precipitationProbability
 *              - acumulatedPrecipitation
 *              - dateMedition
 *              - sondaName
 *            properties:
 *              precipitationProbability:
 *                type: number
 *                example: 25.5
 *              acumulatedPrecipitation:
 *                type: number
 *                example: 10.2
 *              dateMedition:
 *                type: string
 *                format: date-time
 *                example: "2024-01-07T12:00:00Z"
 *              sondaName:
 *                type: string
 *                example: "Sonda-01"
 *    responses:
 *      201:
 *        description: Precipitation record created successfully
 *      400:
 *        description: Bad request - Invalid input data
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *      500:
 *        description: Internal server error
 */
router.post("/", authMiddleware, validateCreatePrecipitationData, createPrecipitation);

/**
 * @openapi
 * /api/v1/precipitationData/{id}:
 *  put:
 *    tags:
 *      - Precipitation
 *    summary: Update precipitation record
 *    description: Updates an existing precipitation measurement (requires authentication)
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Precipitation record ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              precipitationProbability:
 *                type: number
 *              acumulatedPrecipitation:
 *                type: number
 *              dateMedition:
 *                type: string
 *                format: date-time
 *              sondaName:
 *                type: string
 *    responses:
 *      200:
 *        description: Precipitation record updated successfully
 *      400:
 *        description: Bad request - Invalid input data
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *      404:
 *        description: Record not found
 *      500:
 *        description: Internal server error
 */
router.put("/:id", authMiddleware, validateUpdatePrecipitationData, updatePrecipitation);

/**
 * @openapi
 * /api/v1/precipitationData/{id}:
 *  delete:
 *    tags:
 *      - Precipitation
 *    summary: Delete precipitation record
 *    description: Deletes an precipitation measurement (requires authentication)
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Precipitation record ID
 *    responses:
 *      200:
 *        description: Precipitation record deleted successfully
 *      400:
 *        description: Bad request - Invalid ID format
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *      404:
 *        description: Record not found
 *      500:
 *        description: Internal server error
 */
router.delete("/:id", authMiddleware, validateDeletePrecipitationDataById, deletePrecipitation);

/* Exportado de Módulo */
module.exports = router;

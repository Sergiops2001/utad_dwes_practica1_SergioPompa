/*
    Titulo: temperatureData Route
    Nombre: Sergio Pompa
    Descripcion: Declaracion de las rutas de temperatureData
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");

// Bibliotecas propias
const {
    getAlltemperatureData,
    gettemperatureDataById,
    createtemperatureData,
    updatetemperatureData,
    deletetemperatureData,
    gettemperatureDataAdvanced,
    gettemperatureDataMin,
    gettemperatureDataMax,
    gettemperatureDataAvg,
    gettemperatureDataMedian
} = require("../controllers/temperatureData.controller");

// Importacion de los validadores
const { validateCreatetemperatureData, validateUpdatetemperatureData, validateGettemperatureDataById, validateDeletetemperatureDataById, validateGettemperatureDataAdvanced, validateGettemperatureDataStats } = require("../validators/temperatureData.validator");

// Importacion de middleware
const { authMiddleware } = require("../middlewares/sesion.middleware");

/* Declaraciones Constantes */
const router = express.Router();

/* Definicion de Rutas */
/**
 * @openapi
 * /api/v1/temperatureData:
 *  get:
 *    tags:
 *      - Temperature
 *    summary: Get all Temperature records
 *    description: Retrieves all Temperature measurements from the database
 *    responses:
 *      200:
 *        description: Temperature records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/", getAlltemperatureData);

/**
 * @openapi
 * /api/v1/temperatureData/advanced:
 *  get:
 *    tags:
 *      - Temperature
 *    summary: Get filtered Temperature records
 *    description: Retrieves Temperature records filtered by date range and optionally by sonda name
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
 *        description: Filtered Temperature records retrieved successfully
 *      400:
 *        description: Bad request - Invalid date format or missing required parameters
 *      500:
 *        description: Internal server error
 */
router.get("/advanced", validateGettemperatureDataAdvanced, gettemperatureDataAdvanced);

/**
 * @openapi
 * /api/v1/temperatureData/stats/min:
 *  get:
 *    tags:
 *      - Temperature
 *    summary: Get minimum Temperature value
 *    description: Calculates the minimum Temperature value within a specified date range
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
router.get("/stats/min", validateGettemperatureDataStats, gettemperatureDataMin);

/**
 * @openapi
 * /api/v1/temperatureData/stats/max:
 *  get:
 *    tags:
 *      - Temperature
 *    summary: Get maximum Temperature value
 *    description: Calculates the maximum Temperature value within a specified date range
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
router.get("/stats/max", validateGettemperatureDataStats, gettemperatureDataMax);

/**
 * @openapi
 * /api/v1/temperatureData/stats/avg:
 *  get:
 *    tags:
 *      - Temperature
 *    summary: Get average Temperature value
 *    description: Calculates the average Temperature value within a specified date range
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
router.get("/stats/avg", validateGettemperatureDataStats, gettemperatureDataAvg);

/**
 * @openapi
 * /api/v1/temperatureData/stats/median:
 *  get:
 *    tags:
 *      - Temperature
 *    summary: Get median Temperature value
 *    description: Calculates the median Temperature value within a specified date range
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
router.get("/stats/median", validateGettemperatureDataStats, gettemperatureDataMedian);

/**
 * @openapi
 * /api/v1/temperatureData/{id}:
 *  get:
 *    tags:
 *      - Temperature
 *    summary: Get Temperature record by ID
 *    description: Retrieves a specific Temperature measurement by its ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Temperature record ID
 *    responses:
 *      200:
 *        description: Temperature record retrieved successfully
 *      400:
 *        description: Bad request - Invalid ID format
 *      404:
 *        description: Record not found
 *      500:
 *        description: Internal server error
 */
router.get("/:id", validateGettemperatureDataById, gettemperatureDataById);

/**
 * @openapi
 * /api/v1/temperatureData:
 *  post:
 *    tags:
 *      - Temperature
 *    summary: Create new Temperature record
 *    description: Creates a new Temperature measurement (requires authentication)
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - value
 *              - date
 *              - sondaName
 *            properties:
 *              value:
 *                type: number
 *                example: 22.3
 *              date:
 *                type: string
 *                format: date-time
 *                example: "2024-01-07T12:00:00Z"
 *              sondaName:
 *                type: string
 *                example: "Sonda-01"
 *    responses:
 *      201:
 *        description: Temperature record created successfully
 *      400:
 *        description: Bad request - Invalid input data
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *      500:
 *        description: Internal server error
 */
router.post("/", authMiddleware, validateCreatetemperatureData, createtemperatureData);

/**
 * @openapi
 * /api/v1/temperatureData/{id}:
 *  put:
 *    tags:
 *      - Temperature
 *    summary: Update Temperature record
 *    description: Updates an existing Temperature measurement (requires authentication)
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Temperature record ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              value:
 *                type: number
 *                example: 50.2
 *              date:
 *                type: string
 *                format: date-time
 *              sondaName:
 *                type: string
 *    responses:
 *      200:
 *        description: Temperature record updated successfully
 *      400:
 *        description: Bad request - Invalid input data
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *      404:
 *        description: Record not found
 *      500:
 *        description: Internal server error
 */
router.put("/:id", authMiddleware, validateUpdatetemperatureData, updatetemperatureData);

/**
 * @openapi
 * /api/v1/temperatureData/{id}:
 *  delete:
 *    tags:
 *      - Temperature
 *    summary: Delete Temperature record
 *    description: Deletes an Temperature measurement (requires authentication)
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Temperature record ID
 *    responses:
 *      200:
 *        description: Temperature record deleted successfully
 *      400:
 *        description: Bad request - Invalid ID format
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *      404:
 *        description: Record not found
 *      500:
 *        description: Internal server error
 */
router.delete("/:id", authMiddleware, validateDeletetemperatureDataById, deletetemperatureData);

/* Exportado de Modulo */
module.exports = router;

/*
    Título: humidityData Route
    Nombre: Sergio Pompa
    Descripción: Declaración de las rutas de humidityData
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");

// Bibliotecas propias
const {
    getAllHumidity,
    getHumidityById,
    createHumidity,
    updateHumidity,
    deleteHumidity,
    getHumidityAdvanced,
    getHumidityMin,
    getHumidityMax,
    getHumidityAvg,
    getHumidityMedian
} = require("../controllers/humidityData.controller");

// Importacion de los validadores
const { validateCreateHumidityData, validateUpdateHumidityData, validateGetHumidityDataById, validateDeleteHumidityDataById, validateGetHumidityDataAdvanced, validateGetHumidityDataStats } = require("../validators/humidityData.validator");

// Importacion de middleware
const { authMiddleware } = require("../middlewares/sesion.middleware");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
/**
 * @openapi
 * /api/v1/humidityData:
 *  get:
 *    tags:
 *      - Humidity
 *    summary: Get all humidity records
 *    description: Retrieves all humidity measurements from the database
 *    responses:
 *      200:
 *        description: Humidity records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/", getAllHumidity);

/**
 * @openapi
 * /api/v1/humidityData/advanced:
 *  get:
 *    tags:
 *      - Humidity
 *    summary: Get all humidity records filtered by date range and optionally by sonda name
 *    description: " "
 *    responses:
 *      200:
 *        description: Humidity records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/advanced", validateGetHumidityDataAdvanced, getHumidityAdvanced);

/**
 * @openapi
 * /api/v1/humidityData/stats/min:
 *  get:
 *    tags:
 *      - Humidity
 *    summary: Get minimum humidity value
 *    description: " "
 *    responses:
 *      200:
 *        description: Minimum humidity value retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/stats/min", validateGetHumidityDataStats, getHumidityMin);

/**
 * @openapi
 * /api/v1/humidityData/stats/max:
 *  get:
 *    tags:
 *      - Humidity
 *    summary: Get maximum humidity value
 *    description: " "
 *    responses:
 *      200:
 *        description: Maximum humidity value retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/stats/max", validateGetHumidityDataStats, getHumidityMax);

/**
 * @openapi
 * /api/v1/humidityData/stats/avg:
 *  get:
 *    tags:
 *      - Humidity
 *    summary: Get average humidity value
 *    description: " "
 *    responses:
 *      200:
 *        description: Average humidity value retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/stats/avg", validateGetHumidityDataStats, getHumidityAvg);

/**
 * @openapi
 * /api/v1/humidityData/stats/median:
 *  get:
 *    tags:
 *      - Humidity
 *    summary: Get median humidity value
 *    description: " "
 *    responses:
 *      200:
 *        description: Median humidity value retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/stats/median", validateGetHumidityDataStats, getHumidityMedian);

/**
 * @openapi
 * /api/v1/humidityData/{id}:
 *  get:
 *    tags:
 *      - Humidity
 *    summary: Get humidity record by ID
 *    description: Retrieves a specific humidity measurement by its ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Humidity record ID
 *    responses:
 *      200:
 *        description: Humidity record retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/:id", validateGetHumidityDataById, getHumidityById);

/**
 * @openapi
 * /api/v1/humidityData:
 *  post:
 *    tags:
 *      - Humidity
 *    summary: Create new Humidity record
 *    description: " "
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/HumidityData'
 *    responses:
 *      200:
 *        description: Returns the inserted object
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *    security:
 *      - bearerAuth: []
 * 
 */
router.post("/", authMiddleware, validateCreateHumidityData, createHumidity);

/**
 * @openapi
 * /api/v1/humidityData/{id}:
 *  put:
 *    tags:
 *      - Humidity
 *    summary: Update Humidity record
 *    description: " "
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Humidity record ID
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/HumidityData'
 *    responses:
 *      200:
 *        description: Returns the inserted object
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *    security:
 *      - bearerAuth: []
 * 
 */
router.put("/:id", authMiddleware, validateUpdateHumidityData, updateHumidity);

/**
 * @openapi
 * /api/v1/humidityData/{id}:
 *  delete:
 *    tags:
 *      - Humidity
 *    summary: Delete Humidity record
 *    description: " "
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Humidity record ID
 *    responses:
 *      200:
 *        description: Returns the inserted object
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *    security:
 *      - bearerAuth: []
 * 
 */
router.delete("/:id", authMiddleware, validateDeleteHumidityDataById, deleteHumidity);

/* Exportado de Módulo */
module.exports = router;

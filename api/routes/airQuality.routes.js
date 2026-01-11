/*
    Título: airQuality Route
    Nombre: Sergio Pompa
    Descripción: Declaración de las rutas de airQuality
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");

// Bibliotecas propias
const {
    getAllAirQuality,
    getAirQualityById,
    createAirQuality,
    updateAirQuality,
    deleteAirQuality,
    getAirQualityAdvanced,
    getAirQualityMin,
    getAirQualityMax,
    getAirQualityAvg,
    getAirQualityMedian
} = require("../controllers/airQuality.controller");

// Importacion de los validadores
const { validateCreateAirQuality, validateUpdateAirQuality, validateGetAirQualityById, validateDeleteAirQualityById, validateGetAirQualityAdvanced, validateGetAirQualityStats } = require("../validators/airQuality.validator");

// Importacion de middleware
const { authMiddleware } = require("../middlewares/sesion.middleware");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
/**
 * @openapi
 * /api/v1/airQuality:
 *  get:
 *    tags:
 *      - Air Quality
 *    summary: Get all air quality records
 *    description: Retrieves all air quality measurements from the database
 *    responses:
 *      200:
 *        description: Air quality records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/", getAllAirQuality);

/**
 * @openapi
 * /api/v1/airQuality/advanced:
 *  get:
 *    tags:
 *      - Air Quality
 *    summary: Get all air quality records
 *    description: Retrieves all air quality measurements from the database
 *    responses:
 *      200:
 *        description: Air quality records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/advanced", validateGetAirQualityAdvanced, getAirQualityAdvanced);

/**
 * @openapi
 * /api/v1/airQuality/stats/min:
 *  get:
 *    tags:
 *      - Air Quality
 *    summary: Get min air quality value
 *    description: Retrieves all air quality measurements from the database
 *    responses:
 *      200:
 *        description: Air quality records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/stats/min", validateGetAirQualityStats, getAirQualityMin);

/**
 * @openapi
 * /api/v1/airQuality/stats/max:
 *  get:
 *    tags:
 *      - Air Quality
 *    summary: Get max air quality value
 *    description: Retrieves all air quality measurements from the database
 *    responses:
 *      200:
 *        description: Air quality records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/stats/max", validateGetAirQualityStats, getAirQualityMax);

/**
 * @openapi
 * /api/v1/airQuality/stats/avg:
 *  get:
 *    tags:
 *      - Air Quality
 *    summary: Get avg air quality value
 *    description: Retrieves all air quality measurements from the database
 *    responses:
 *      200:
 *        description: Air quality records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/stats/avg", validateGetAirQualityStats, getAirQualityAvg);

/**
 * @openapi
 * /api/v1/airQuality/stats/median:
 *  get:
 *    tags:
 *      - Air Quality
 *    summary: Get median air quality value
 *    description: Retrieves all air quality measurements from the database
 *    responses:
 *      200:
 *        description: Air quality records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/stats/median", validateGetAirQualityStats, getAirQualityMedian);

/**
 * @openapi
 * /api/v1/airQuality/{id}:
 *  get:
 *    tags:
 *      - Air Quality
 *    summary: Get air quality record by ID
 *    description: Retrieves a specific air quality measurement by its ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Air quality record ID
 *    responses:
 *      200:
 *        description: Air quality records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/:id", validateGetAirQualityById, getAirQualityById);

/**
 * @openapi
 * /api/v1/airQuality:
 *  post:
 *    tags:
 *      - Air Quality
 *    summary: Create new air quality record
 *    description: " "
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/AirQuality'
 *    responses:
 *      200:
 *        description: Returns the inserted object
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *    security:
 *      - bearerAuth: []
 * 
 */
router.post("/", authMiddleware, validateCreateAirQuality, createAirQuality);

/**
 * @openapi
 * /api/v1/airQuality/{id}:
 *  put:
 *    tags:
 *      - Air Quality
 *    summary: Update air quality record
 *    description: " "
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Air quality record ID
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/AirQuality'
 *    responses:
 *      200:
 *        description: Returns the inserted object
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *    security:
 *      - bearerAuth: []
 * 
 */
router.put("/:id", authMiddleware, validateUpdateAirQuality, updateAirQuality);

/**
 * @openapi
 * /api/v1/airQuality/{id}:
 *  delete:
 *    tags:
 *      - Air Quality
 *    summary: Delete air quality record
 *    description: " "
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Air quality record ID
 *    responses:
 *      200:
 *        description: Returns the inserted object
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *    security:
 *      - bearerAuth: []
 * 
 */
router.delete("/:id", authMiddleware, validateDeleteAirQualityById, deleteAirQuality);

/* Exportado de Módulo */
module.exports = router;
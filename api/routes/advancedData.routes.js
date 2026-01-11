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
    deleteAdvancedData,
    getAdvancedDataAdvanced,
    getAdvancedDataMin,
    getAdvancedDataMax,
    getAdvancedDataAvg,
    getAdvancedDataMedian
} = require("../controllers/advancedData.controller");

// Importacion de los validadores
const { validateCreateAdvancedData, validateUpdateAdvancedData, validateGetAdvancedDataById, validateDeleteAdvancedDataById, validateGetAdvancedDataAdvanced, validateGetAdvancedDataStats } = require("../validators/advancedData.validator");

// Importacion de middleware
const { authMiddleware } = require("../middlewares/sesion.middleware");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
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
 *        description: Advanced Data records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/", getAllAdvancedData);

/**
 * @openapi
 * /api/v1/advancedData/advanced:
 *  get:
 *    tags:
 *      - Advanced Data
 *    summary: Get all Advanced Data records filtered by date range and optionally by sonda name
 *    description: " "
 *    responses:
 *      200:
 *        description: Advanced Data records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/advanced", validateGetAdvancedDataAdvanced, getAdvancedDataAdvanced);

/**
 * @openapi
 * /api/v1/advancedData/stats/min:
 *  get:
 *    tags:
 *      - Advanced Data
 *    summary: Get minimum Advanced Data value
 *    description: " "
 *    responses:
 *      200:
 *        description: Advanced Data records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/stats/min", validateGetAdvancedDataStats, getAdvancedDataMin);

/**
 * @openapi
 * /api/v1/advancedData/stats/max:
 *  get:
 *    tags:
 *      - Advanced Data
 *    summary: Get maximum Advanced Data value
 *    description: " "
 *    responses:
 *      200:
 *        description: Advanced Data records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/stats/max", validateGetAdvancedDataStats, getAdvancedDataMax);

/**
 * @openapi
 * /api/v1/advancedData/stats/avg:
 *  get:
 *    tags:
 *      - Advanced Data
 *    summary: Get average Advanced Data value
 *    description: " "
 *    responses:
 *      200:
 *        description: Advanced Data records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/stats/avg", validateGetAdvancedDataStats, getAdvancedDataAvg);

/**
 * @openapi
 * /api/v1/advancedData/stats/median:
 *  get:
 *    tags:
 *      - Advanced Data
 *    summary: Get median Advanced Data value
 *    description: " "
 *    responses:
 *      200:
 *        description: Advanced Data records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/stats/median", validateGetAdvancedDataStats, getAdvancedDataMedian);

/**
 * @openapi
 * /api/v1/advancedData/{id}:
 *  get:
 *    tags:
 *      - Advanced Data
 *    summary: Get Advanced Data record by ID
 *    description: " "
 *    responses:
 *      200:
 *        description: Advanced Data records retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/:id", validateGetAdvancedDataById, getAdvancedDataById);

/**
 * @openapi
 * /api/v1/advancedData:
 *  post:
 *    tags:
 *      - Advanced Data
 *    summary: Create new Advanced Data record
 *    description: " "
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/AdvancedData'
 *    responses:
 *      200:
 *        description: Returns the inserted object
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *    security:
 *      - bearerAuth: []
 * 
 */
router.post("/", authMiddleware, validateCreateAdvancedData, createAdvancedData);

/**
 * @openapi
 * /api/v1/advancedData/{id}:
 *  put:
 *    tags:
 *      - Advanced Data
 *    summary: Update Advanced Data record
 *    description: " "
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Advanced Data record ID
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/AdvancedData'
 *    responses:
 *      200:
 *        description: Returns the inserted object
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *    security:
 *      - bearerAuth: []
 * 
 */
router.put("/:id", authMiddleware, validateUpdateAdvancedData, updateAdvancedData);

/**
 * @openapi
 * /api/v1/advancedData/{id}:
 *  delete:
 *    tags:
 *      - Advanced Data
 *    summary: Delete Advanced Data record
 *    description: " "
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Advanced Data record ID
 *    responses:
 *      200:
 *        description: Returns the inserted object
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *    security:
 *      - bearerAuth: []
 * 
 */
router.delete("/:id", authMiddleware, validateDeleteAdvancedDataById, deleteAdvancedData);

/* Exportado de Módulo */
module.exports = router;

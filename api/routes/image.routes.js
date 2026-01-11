/*
    Título: Image Route
    Nombre: Sergio Pompa
    Descripción: Declaración de las rutas de image
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");

// Bibliotecas propias
const {
    getImages,
    getImage,
    createImage,
    updateImage,
    deleteImage,
    getImagesAdvanced
} = require("../controllers/image.controller");

// Importacion de los validadores
const { validateCreateImage, validateUpdateImage, validateGetImageById, validateDeleteImageById, validateGetImagesAdvanced } = require("../validators/image.validator");

//Importacion de middleware
const { authMiddleware } = require("../middlewares/sesion.middleware");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
/**
 * @openapi
 * /api/v1/image:
 *  get:
 *    tags:
 *      - Images
 *    summary: Get all images
 *    description: " "
 *    responses:
 *      200:
 *        description: Images retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/", getImages);

/* Definición de Rutas */
/**
 * @openapi
 * /api/v1/image/advanced:
 *  get:
 *    tags:
 *      - Images
 *    summary: Get filtered images
 *    description: " "
 *    responses:
 *      200:
 *        description: Images retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/advanced", validateGetImagesAdvanced, getImagesAdvanced);

/* Definición de Rutas */
/**
 * @openapi
 * /api/v1/image/{id}:
 *  get:
 *    tags:
 *      - Images
 *    summary: Get image by ID
 *    description: " "
 *    responses:
 *      200:
 *        description: Image retrieved successfully
 *      500:
 *        description: Internal server error
 */
router.get("/:id", validateGetImageById, getImage);

/**
 * @openapi
 * /api/v1/image:
 *  post:
 *    tags:
 *      - Images
 *    summary: Create new Image record
 *    description: " "
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Image'
 *    responses:
 *      200:
 *        description: Returns the inserted object
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *    security:
 *      - bearerAuth: []
 * 
 */
router.post("/", authMiddleware, validateCreateImage, createImage);

/**
 * @openapi
 * /api/v1/image/{id}:
 *  put:
 *    tags:
 *      - Images
 *    summary: Update Image record
 *    description: " "
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Image record ID
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Image'
 *    responses:
 *      200:
 *        description: Returns the inserted object
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *    security:
 *      - bearerAuth: []
 * 
 */
router.put("/:id", authMiddleware, validateUpdateImage, updateImage);

/**
 * @openapi
 * /api/v1/image/{id}:
 *  delete:
 *    tags:
 *      - Images
 *    summary: Delete Image record
 *    description: " "
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: Image record ID
 *    responses:
 *      200:
 *        description: Returns the inserted object
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *    security:
 *      - bearerAuth: []
 * 
 */
router.delete("/:id", authMiddleware, validateDeleteImageById, deleteImage);


/* Exportado de Módulo */
module.exports = router;
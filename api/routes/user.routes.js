/*
    Título: User Route
    Nombre: Sergio Pompa
    Descripción: Declaración de las rutas de usuario
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");

// Bibliotecas propias
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    registerUser,
    loginUser
} = require("../controllers/user.controller");
//Importacion de los validadores
const { validateRegisterUser, validateLoginUser, validateCreateUser, validateUpdateUser, validateGetUserById, validateDeleteUserById } = require("../validators/users.validator");
//Importacion de middleware
const { authMiddleware } = require("../middlewares/sesion.middleware");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
//Register
/**
 * @openapi
 * /users/register:
 *  post:
 *    tags:
 *      - Users
 *    summary: Register a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/user'
 *    responses:
 *      201:
 *        description: User registered successfully
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server error
 */
router.post("/register", validateRegisterUser, registerUser);

/**
 * @openapi
 * /api/v1/user/login:
 *  post:
 *    tags:
 *      - Users
 *    summary: User login
 *    description: Authenticates a user and returns a JWT token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                example: user@gmail.com
 *              password:
 *                type: string
 *                example: password123
 *    responses:
 *      200:
 *        description: Login successful - Returns JWT token
 *      400:
 *        description: Bad request - Invalid credentials
 *      401:
 *        description: Unauthorized - Invalid email or password
 *      500:
 *        description: Internal server error
 */
router.post("/login", validateLoginUser, loginUser);

// GET ALL
/**
 * @openapi
 * /users:
 *  get:
 *    tags:
 *      - Users
 *    summary: Get all users
 *    responses:
 *      200:
 *        description: Users retrieved successfully
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server error
 */
router.get("/", authMiddleware, getUsers);

/**
 * @openapi
 * /api/v1/user/{id}:
 *  get:
 *    tags:
 *      - Users
 *    summary: Get user by ID
 *    description: Retrieves a specific user by their ID (requires authentication)
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: User ID
 *    responses:
 *      200:
 *        description: User retrieved successfully
 *      400:
 *        description: Bad request - Invalid ID format
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *      404:
 *        description: User not found
 *      500:
 *        description: Internal server error
 */
router.get("/:id", authMiddleware, validateGetUserById, getUser);

/**
 * @openapi
 * /api/v1/user:
 *  post:
 *    tags:
 *      - Users
 *    summary: Create a new user (admin)
 *    description: Creates a new user account (requires authentication)
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/user'
 *    responses:
 *      201:
 *        description: User created successfully
 *      400:
 *        description: Bad request - Invalid input data
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *      500:
 *        description: Internal server error
 */
router.post("/", authMiddleware, validateCreateUser, createUser);

/**
 * @openapi
 * /api/v1/user/{id}:
 *  put:
 *    tags:
 *      - Users
 *    summary: Update user
 *    description: Updates an existing user's information (requires authentication)
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: User ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/user'
 *    responses:
 *      200:
 *        description: User updated successfully
 *      400:
 *        description: Bad request - Invalid input data
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *      404:
 *        description: User not found
 *      500:
 *        description: Internal server error
 */
router.put("/:id", authMiddleware, validateUpdateUser, updateUser);

/**
 * @openapi
 * /api/v1/user/{id}:
 *  delete:
 *    tags:
 *      - Users
 *    summary: Delete user
 *    description: Deletes a user account (requires authentication)
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: User ID
 *    responses:
 *      200:
 *        description: User deleted successfully
 *      400:
 *        description: Bad request - Invalid ID format
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *      404:
 *        description: User not found
 *      500:
 *        description: Internal server error
 */
router.delete("/:id", authMiddleware, validateDeleteUserById, deleteUser);

/* Exportado de Módulo */
module.exports = router;
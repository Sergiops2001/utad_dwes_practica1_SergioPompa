// Importado de bibliotecas 
//Bibliotecas externas
const { check } = require("express-validator");

//Bibliotecas propias
const { validateResults } = require("../utilities/handleValidator.util");

//Codificacion de funciones
//Vaidador de registro de usuarios 
const validateRegisterUser = [
    check("username").exists().notEmpty().withMessage("El nombre es obligatorio"),
    check("fullName").exists().notEmpty().withMessage("El nombre completo es obligatorio"),
    check("description").exists().notEmpty().withMessage("La descripción es obligatoria"),
    check("email").exists().notEmpty().withMessage("El email es obligatorio"),
    check("password").exists().notEmpty().withMessage("La contraseña es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

//Validador de login de usuarios 
const validateLoginUser = [
    check("email").exists().notEmpty().withMessage("El email es obligatorio"),
    check("password").exists().notEmpty().withMessage("La contraseña es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Validador de creacion de usuario
const validateCreateUser = [
    check("username").exists().notEmpty().withMessage("El nombre es obligatorio"),
    check("fullName").exists().notEmpty().withMessage("El nombre completo es obligatorio"),
    check("description").exists().notEmpty().withMessage("La descripción es obligatoria"),
    check("email").exists().notEmpty().withMessage("El email es obligatorio"),
    check("password").exists().notEmpty().withMessage("La contraseña es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

// Validador de actualizacion de usuario
const validateUpdateUser = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    check("username").exists().notEmpty().withMessage("El nombre es obligatorio"),
    check("fullName").exists().notEmpty().withMessage("El nombre completo es obligatorio"),
    check("description").exists().notEmpty().withMessage("La descripción es obligatoria"),
    check("email").exists().notEmpty().withMessage("El email es obligatorio"),
    check("password").exists().notEmpty().withMessage("La contraseña es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

// Validador de get user by id
const validateGetUserById = [
    check("id").exists().notEmpty().isMongoId("El id es obligatorio"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

// Validador de delete user by id
const validateDeleteUserById = [
    check("id").exists().notEmpty().isMongoId("El id es obligatorio"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

//Exportando modulo
module.exports = {
    validateRegisterUser,
    validateLoginUser,
    validateCreateUser,
    validateUpdateUser,
    validateGetUserById,
    validateDeleteUserById
};

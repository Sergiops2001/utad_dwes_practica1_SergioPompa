//Importando bibliotecas 
//Bibliotecas externas 
const { check } = require("express-validator");

//Bibliotecas propias 
const { validateResults } = require("../utilities/handleValidator.util");

//Codificacion de funciones 
// Validador de creacion de sonda
const validateCreateSonda = [
    check("name").exists().isString().withMessage("El nombre es obligatorio"),
    check("description").exists().isString().withMessage("La descripción es obligatoria"),
    check("location").exists().isString().withMessage("La localización es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de actualizacion de sonda
const validateUpdateSonda = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    check("name").exists().isString().withMessage("El nombre es obligatorio"),
    check("description").exists().isString().withMessage("La descripción es obligatoria"),
    check("location").exists().isString().withMessage("La localización es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de get sonda by id
const validateGetSondaById = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de delete sonda by id
const validateDeleteSondaById = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de get sonda by location
const validateGetSondaByLocation = [
    check("location").exists().isString().withMessage("La localización es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Exportando modulo
module.exports = {
    validateCreateSonda,
    validateUpdateSonda,
    validateGetSondaById,
    validateDeleteSondaById,
    validateGetSondaByLocation
}

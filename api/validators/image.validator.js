//Importando bibliotecas 
//Bibliotecas externas 
const { check } = require("express-validator");

//Bibliotecas propias 
const { validateResults } = require("../utilities/handleValidator.util");

//Codificacion de funciones 
// Validador de creacion de image
const validateCreateImage = [
    check("location").exists().isString().withMessage("La localización es obligatoria"),
    check("imageUrl").exists().isString().withMessage("La URL de la imagen es obligatoria"),
    check("date").exists().isDate().withMessage("La fecha es obligatoria"),
    check("hour").exists().isString().withMessage("La hora es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de actualizacion de image
const validateUpdateImage = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    check("location").exists().isString().withMessage("La localización es obligatoria"),
    check("imageUrl").exists().isString().withMessage("La URL de la imagen es obligatoria"),
    check("date").exists().isDate().withMessage("La fecha es obligatoria"),
    check("hour").exists().isString().withMessage("La hora es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de get image by id
const validateGetImageById = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de delete image by id
const validateDeleteImageById = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de busqueda avanzada de imagenes
const validateGetImagesAdvanced = [
    check("location").optional().isString(),
    check("startDate").optional().isString(),
    check("endDate").optional().isString(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

//Exportando modulo
module.exports = {
    validateCreateImage,
    validateUpdateImage,
    validateGetImageById,
    validateDeleteImageById,
    validateGetImagesAdvanced
}


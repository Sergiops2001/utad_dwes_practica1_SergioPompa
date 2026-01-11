//Importando bibliotecas 
//Bibliotecas externas 
const { check, query } = require("express-validator");

//Bibliotecas propias 
const { validateResults } = require("../utilities/handleValidator.util");

//Codificacion de funciones 
// Validador de creacion de advancedData
const validateCreateAdvancedData = [
    check("airPressure").exists().isNumeric().withMessage("La presión atmosférica es obligatoria"),
    check("uvIndex").exists().isNumeric().withMessage("El índice UV es obligatorio"),
    check("pollenIndex").exists().isNumeric().withMessage("El índice de polen es obligatorio"),
    check("sondaName").exists().isString().withMessage("El nombre de la sonda es obligatorio"),
    check("dateMedition").exists().isDate().withMessage("La fecha de medición es obligatoria"),
    check("hourMedition").exists().isString().withMessage("La hora de medición es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de actualizacion de advancedData
const validateUpdateAdvancedData = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    check("airPressure").exists().isNumeric().withMessage("La presión atmosférica es obligatoria"),
    check("uvIndex").exists().isNumeric().withMessage("El índice UV es obligatorio"),
    check("pollenIndex").exists().isNumeric().withMessage("El índice de polen es obligatorio"),
    check("sondaName").exists().isString().withMessage("El nombre de la sonda es obligatorio"),
    check("dateMedition").exists().isDate().withMessage("La fecha de medición es obligatoria"),
    check("hourMedition").exists().isString().withMessage("La hora de medición es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de get advancedData by id
const validateGetAdvancedDataById = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de delete advancedData by id
const validateDeleteAdvancedDataById = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Validador de get advanced data advanced (search)
const validateGetAdvancedDataAdvanced = [
    query("sondaName").optional().isString().withMessage("El nombre de la sonda debe ser texto"),
    query("startDate").optional().isDate().withMessage("La fecha de inicio debe ser una fecha válida (YYYY-MM-DD)"),
    query("endDate").optional().isDate().withMessage("La fecha de fin debe ser una fecha válida (YYYY-MM-DD)"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
// Validador de get advanced data stats (min, max, avg, median)
const validateGetAdvancedDataStats = [
    query("sondaName").optional().isString().withMessage("El nombre de la sonda debe ser texto"),
    query("startDate").exists().isDate().withMessage("La fecha de inicio es obligatoria (YYYY-MM-DD)"),
    query("endDate").exists().isDate().withMessage("La fecha de fin es obligatoria (YYYY-MM-DD)"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

//Exportando modulo
module.exports = {
    validateCreateAdvancedData,
    validateUpdateAdvancedData,
    validateGetAdvancedDataById,
    validateDeleteAdvancedDataById,
    validateGetAdvancedDataAdvanced,
    validateGetAdvancedDataStats
}

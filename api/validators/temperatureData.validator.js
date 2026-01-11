//Importando bibliotecas 
//Bibliotecas externas 
const { check, query } = require("express-validator");

//Bibliotecas propias 
const { validateResults } = require("../utilities/handleValidator.util");

//Codificacion de funciones 
// Validador de creacion de temperatureData
const validateCreatetemperatureData = [
    check("value").exists().isNumeric().withMessage("El valor de temperatura es obligatorio"),
    check("sondaName").exists().isString().withMessage("El nombre de la sonda es obligatorio"),
    check("dateMedition").exists().isDate().withMessage("La fecha de medición es obligatoria"),
    check("hourMedition").exists().isString().withMessage("La hora de medición es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de actualizacion de temperatureData
const validateUpdatetemperatureData = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    check("value").exists().isNumeric().withMessage("El valor de temperatura es obligatorio"),
    check("sondaName").exists().isString().withMessage("El nombre de la sonda es obligatorio"),
    check("dateMedition").exists().isDate().withMessage("La fecha de medición es obligatoria"),
    check("hourMedition").exists().isString().withMessage("La hora de medición es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de get temperatureData by id
const validateGettemperatureDataById = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de delete temperatureData by id
const validateDeletetemperatureDataById = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Validador de get advanced
const validateGettemperatureDataAdvanced = [
    query("sondaName").optional().isString().withMessage("El nombre de la sonda debe ser texto"),
    query("startDate").optional().isDate().withMessage("La fecha de inicio debe ser una fecha válida (YYYY-MM-DD)"),
    query("endDate").optional().isDate().withMessage("La fecha de fin debe ser una fecha válida (YYYY-MM-DD)"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Validador de get stats
const validateGettemperatureDataStats = [
    query("sondaName").optional().isString().withMessage("El nombre de la sonda debe ser texto"),
    query("startDate").exists().isDate().withMessage("La fecha de inicio es obligatoria (YYYY-MM-DD)"),
    query("endDate").exists().isDate().withMessage("La fecha de fin es obligatoria (YYYY-MM-DD)"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

//Exportando modulo
module.exports = {
    validateCreatetemperatureData,
    validateUpdatetemperatureData,
    validateGettemperatureDataById,
    validateDeletetemperatureDataById,
    validateGettemperatureDataAdvanced,
    validateGettemperatureDataStats
}

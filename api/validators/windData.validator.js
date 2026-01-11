//Importando bibliotecas 
//Bibliotecas externas 
const { check, query } = require("express-validator");

//Bibliotecas propias 
const { validateResults } = require("../utilities/handleValidator.util");

//Codificacion de funciones 
// Validador de creacion de windData
const validateCreateWindData = [
    check("windSpeed").exists().isNumeric().withMessage("La velocidad del viento es obligatoria"),
    check("windGustSpeed").exists().isNumeric().withMessage("La velocidad de ráfaga de viento es obligatoria"),
    check("windDirection").exists().isString().withMessage("La dirección del viento es obligatoria"),
    check("sondaName").exists().isString().withMessage("El nombre de la sonda es obligatorio"),
    check("dateMedition").exists().isDate().withMessage("La fecha de medición es obligatoria"),
    check("hourMedition").exists().isString().withMessage("La hora de medición es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de actualizacion de windData
const validateUpdateWindData = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    check("windSpeed").exists().isNumeric().withMessage("La velocidad del viento es obligatoria"),
    check("windGustSpeed").exists().isNumeric().withMessage("La velocidad de ráfaga de viento es obligatoria"),
    check("windDirection").exists().isString().withMessage("La dirección del viento es obligatoria"),
    check("sondaName").exists().isString().withMessage("El nombre de la sonda es obligatorio"),
    check("dateMedition").exists().isDate().withMessage("La fecha de medición es obligatoria"),
    check("hourMedition").exists().isString().withMessage("La hora de medición es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de get windData by id
const validateGetWindDataById = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de delete windData by id
const validateDeleteWindDataById = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Validador de get advanced
const validateGetWindDataAdvanced = [
    query("sondaName").optional().isString().withMessage("El nombre de la sonda debe ser texto"),
    query("startDate").optional().isDate().withMessage("La fecha de inicio debe ser una fecha válida (YYYY-MM-DD)"),
    query("endDate").optional().isDate().withMessage("La fecha de fin debe ser una fecha válida (YYYY-MM-DD)"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Validador de get stats
const validateGetWindDataStats = [
    query("sondaName").optional().isString().withMessage("El nombre de la sonda debe ser texto"),
    query("startDate").exists().isDate().withMessage("La fecha de inicio es obligatoria (YYYY-MM-DD)"),
    query("endDate").exists().isDate().withMessage("La fecha de fin es obligatoria (YYYY-MM-DD)"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

//Exportando modulo
module.exports = {
    validateCreateWindData,
    validateUpdateWindData,
    validateGetWindDataById,
    validateDeleteWindDataById,
    validateGetWindDataAdvanced,
    validateGetWindDataStats
}

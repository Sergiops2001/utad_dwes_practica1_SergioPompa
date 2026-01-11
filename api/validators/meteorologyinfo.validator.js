//Importando bibliotecas 
//Bibliotecas externas 
const { check, query } = require("express-validator");

//Bibliotecas propias 
const { validateResults } = require("../utilities/handleValidator.util");

//Codificacion de funciones 
// Validador de creacion de meteorologyinfo
const validateCreateMeteorologyInfo = [
    check("temperature").exists().isNumeric().withMessage("La temperatura es obligatoria"),
    check("windChill").exists().isNumeric().withMessage("La sensación térmica es obligatoria"),
    check("cloudCover").exists().isString().withMessage("La cobertura nubosa es obligatoria"),
    check("sondaName").exists().isString().withMessage("El nombre de la sonda es obligatorio"),
    check("dateMedition").exists().isDate().withMessage("La fecha de medición es obligatoria"),
    check("hourMedition").exists().isString().withMessage("La hora de medición es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de actualizacion de meteorologyinfo
const validateUpdateMeteorologyInfo = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    check("temperature").exists().isNumeric().withMessage("La temperatura es obligatoria"),
    check("windChill").exists().isNumeric().withMessage("La sensación térmica es obligatoria"),
    check("cloudCover").exists().isString().withMessage("La cobertura nubosa es obligatoria"),
    check("sondaName").exists().isString().withMessage("El nombre de la sonda es obligatorio"),
    check("dateMedition").exists().isDate().withMessage("La fecha de medición es obligatoria"),
    check("hourMedition").exists().isString().withMessage("La hora de medición es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de get meteorologyinfo by id
const validateGetMeteorologyInfoById = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de delete meteorologyinfo by id
const validateDeleteMeteorologyInfoById = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Validador de get advanced
const validateGetMeteorologyInfoAdvanced = [
    query("sondaName").optional().isString().withMessage("El nombre de la sonda debe ser texto"),
    query("startDate").optional().isDate().withMessage("La fecha de inicio debe ser una fecha válida (YYYY-MM-DD)"),
    query("endDate").optional().isDate().withMessage("La fecha de fin debe ser una fecha válida (YYYY-MM-DD)"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Validador de get stats
const validateGetMeteorologyInfoStats = [
    query("sondaName").optional().isString().withMessage("El nombre de la sonda debe ser texto"),
    query("startDate").exists().isDate().withMessage("La fecha de inicio es obligatoria (YYYY-MM-DD)"),
    query("endDate").exists().isDate().withMessage("La fecha de fin es obligatoria (YYYY-MM-DD)"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

//Exportando modulo
module.exports = {
    validateCreateMeteorologyInfo,
    validateUpdateMeteorologyInfo,
    validateGetMeteorologyInfoById,
    validateDeleteMeteorologyInfoById,
    validateGetMeteorologyInfoAdvanced,
    validateGetMeteorologyInfoStats
}

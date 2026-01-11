//Importando bibliotecas 
//Bibliotecas externas 
const { check, query } = require("express-validator");

//Bibliotecas propias 
const { validateResults } = require("../utilities/handleValidator.util");

//Codificacion de funciones 
// Validador de creacion de precipitationData
const validateCreatePrecipitationData = [
    check("precipitationType").exists().isString().withMessage("El tipo de precipitación es obligatorio"),
    check("precipitationProbability").exists().isNumeric().withMessage("La probabilidad de precipitación es obligatoria"),
    check("acumulatedPrecipitation").exists().isNumeric().withMessage("La precipitación acumulada es obligatoria"),
    check("sondaName").exists().isString().withMessage("El nombre de la sonda es obligatorio"),
    check("dateMedition").exists().isDate().withMessage("La fecha de medición es obligatoria"),
    check("hourMedition").exists().isString().withMessage("La hora de medición es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de actualizacion de precipitationData
const validateUpdatePrecipitationData = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    check("precipitationType").exists().isString().withMessage("El tipo de precipitación es obligatorio"),
    check("precipitationProbability").exists().isNumeric().withMessage("La probabilidad de precipitación es obligatoria"),
    check("acumulatedPrecipitation").exists().isNumeric().withMessage("La precipitación acumulada es obligatoria"),
    check("sondaName").exists().isString().withMessage("El nombre de la sonda es obligatorio"),
    check("dateMedition").exists().isDate().withMessage("La fecha de medición es obligatoria"),
    check("hourMedition").exists().isString().withMessage("La hora de medición es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de get precipitationData by id
const validateGetPrecipitationDataById = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de delete precipitationData by id
const validateDeletePrecipitationDataById = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Validador de get advanced
const validateGetPrecipitationDataAdvanced = [
    query("sondaName").optional().isString().withMessage("El nombre de la sonda debe ser texto"),
    query("startDate").optional().isDate().withMessage("La fecha de inicio debe ser una fecha válida (YYYY-MM-DD)"),
    query("endDate").optional().isDate().withMessage("La fecha de fin debe ser una fecha válida (YYYY-MM-DD)"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Validador de get stats
const validateGetPrecipitationDataStats = [
    query("sondaName").optional().isString().withMessage("El nombre de la sonda debe ser texto"),
    query("startDate").exists().isDate().withMessage("La fecha de inicio es obligatoria (YYYY-MM-DD)"),
    query("endDate").exists().isDate().withMessage("La fecha de fin es obligatoria (YYYY-MM-DD)"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

//Exportando modulo
module.exports = {
    validateCreatePrecipitationData,
    validateUpdatePrecipitationData,
    validateGetPrecipitationDataById,
    validateDeletePrecipitationDataById,
    validateGetPrecipitationDataAdvanced,
    validateGetPrecipitationDataStats
}

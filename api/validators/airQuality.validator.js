//Importando bibliotecas 
//Bibliotecas externas 
const { check, query } = require("express-validator");

//Bibliotecas propias 
const { validateResults } = require("../utilities/handleValidator.util");

//Codificacion de funciones 
// Validador de creacion de airQuality
const validateCreateAirQuality = [
    check("airQualityIndex").exists().isNumeric().withMessage("El índice de calidad del aire es obligatorio"),
    check("ozoneAmount").exists().isNumeric().withMessage("La cantidad de ozono es obligatoria"),
    check("numberSmallParticles").exists().isNumeric().withMessage("El número de partículas pequeñas es obligatorio"),
    check("numberLargeParticles").exists().isNumeric().withMessage("El número de partículas grandes es obligatorio"),
    check("amountNitrogenDioxide").exists().isNumeric().withMessage("La cantidad de dióxido de nitrógeno es obligatoria"),
    check("amountCarbonMonoxide").exists().isNumeric().withMessage("La cantidad de monóxido de carbono es obligatoria"),
    check("amountSulfurDioxide").exists().isNumeric().withMessage("La cantidad de dióxido de azufre es obligatoria"),
    check("sondaName").exists().isString().withMessage("El nombre de la sonda es obligatorio"),
    check("dateMedition").exists().isDate().withMessage("La fecha de medición es obligatoria"),
    check("hourMedition").exists().isString().withMessage("La hora de medición es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de actualizacion de airQuality
const validateUpdateAirQuality = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    check("airQualityIndex").exists().isNumeric().withMessage("El índice de calidad del aire es obligatorio"),
    check("ozoneAmount").exists().isNumeric().withMessage("La cantidad de ozono es obligatoria"),
    check("numberSmallParticles").exists().isNumeric().withMessage("El número de partículas pequeñas es obligatorio"),
    check("numberLargeParticles").exists().isNumeric().withMessage("El número de partículas grandes es obligatorio"),
    check("amountNitrogenDioxide").exists().isNumeric().withMessage("La cantidad de dióxido de nitrógeno es obligatoria"),
    check("amountCarbonMonoxide").exists().isNumeric().withMessage("La cantidad de monóxido de carbono es obligatoria"),
    check("amountSulfurDioxide").exists().isNumeric().withMessage("La cantidad de dióxido de azufre es obligatoria"),
    check("sondaName").exists().isString().withMessage("El nombre de la sonda es obligatorio"),
    check("dateMedition").exists().isDate().withMessage("La fecha de medición es obligatoria"),
    check("hourMedition").exists().isString().withMessage("La hora de medición es obligatoria"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de get airQuality by id
const validateGetAirQualityById = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Validador de delete airQuality by id
const validateDeleteAirQualityById = [
    check("id").exists().isMongoId().withMessage("El id es obligatorio"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Validador de get advanced
const validateGetAirQualityAdvanced = [
    query("sondaName").optional().isString().withMessage("El nombre de la sonda debe ser texto"),
    query("startDate").optional().isDate().withMessage("La fecha de inicio debe ser una fecha válida (YYYY-MM-DD)"),
    query("endDate").optional().isDate().withMessage("La fecha de fin debe ser una fecha válida (YYYY-MM-DD)"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Validador de get stats
const validateGetAirQualityStats = [
    query("sondaName").optional().isString().withMessage("El nombre de la sonda debe ser texto"),
    query("startDate").exists().isDate().withMessage("La fecha de inicio es obligatoria (YYYY-MM-DD)"),
    query("endDate").exists().isDate().withMessage("La fecha de fin es obligatoria (YYYY-MM-DD)"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

//Exportando modulo
module.exports = {
    validateCreateAirQuality,
    validateUpdateAirQuality,
    validateGetAirQualityById,
    validateDeleteAirQualityById,
    validateGetAirQualityAdvanced,
    validateGetAirQualityStats
}

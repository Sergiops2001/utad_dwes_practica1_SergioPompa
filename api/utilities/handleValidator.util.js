// Importado de bibliotecas 
//Bibliotecas externas
const { validationResult } = require("express-validator");
const { appLogger } = require("../config/winstonLogger.config");

//Bibliotecas propias
const { handleHTTPError } = require("./handleResponse.util");

//Codificacion de funciones 
const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    }
    catch (err) {
        appLogger.error("Validation Error:", err.array());
        const errors = err.array().map(e => e.msg).join('; ');
        handleHTTPError(res, `Valores no válidos: ${errors}`, 400);
    }
}
//Exportando modulo
module.exports = { validateResults };

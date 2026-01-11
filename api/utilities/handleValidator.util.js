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
        handleHTTPError(res, "No se ha podido validar correctamente los datos de entrada");
    }
}
//Exportando modulo
module.exports = { validateResults };

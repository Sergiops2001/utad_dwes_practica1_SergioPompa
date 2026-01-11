/*
    Título: Handle Response Utility
    Nombre: Sergio Pompa
    Descripción: Utilidades para manejar respuestas HTTP
*/

/* Códigos de estado HTTP */
const INTERNAL_SERVER_ERROR = 500;
const SUCCESS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const UNAUTHORIZED = 401;

/* Codificación de Funciones */

/**
 * Maneja respuestas HTTP exitosas
 * @param {Object} res - Objeto de respuesta de Express
 * @param {String} message - Mensaje de éxito
 * @param {Object} data - Datos a enviar
 * @param {Number} code - Código de estado HTTP (por defecto 200)
 */
const handleHTTPResponse = (res, message, data = null, code = SUCCESS) => {
    res.status(code).json({
        success: true,
        message: message,
        data: data
    });
};

/**
 * Maneja errores HTTP
 * @param {Object} res - Objeto de respuesta de Express
 * @param {String} message - Mensaje de error
 * @param {Number} code - Código de estado HTTP (por defecto 500)
 */
const handleHTTPError = (res, message, code = INTERNAL_SERVER_ERROR) => {
    res.status(code).json({
        success: false,
        error: message
    });
};

/* Exportado de Módulo */
module.exports = {
    handleHTTPError,
    handleHTTPResponse,
    INTERNAL_SERVER_ERROR,
    SUCCESS,
    CREATED,
    BAD_REQUEST,
    NOT_FOUND,
    UNAUTHORIZED
};

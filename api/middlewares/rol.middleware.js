const { handleHTTPError, FORBIDDEN, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require("../utilities/handleResponse.util");
const { appLogger } = require("../config/winstonLogger.config");

//Codificacion de funciones
const checkRol = (roles) => (req, res, next) => {
    try {
        //Obtenemos el rol del usuario
        const { user } = req;
        const userRol = user.role;
        //Comprobamos que el rol del usuario se encuentre entre los permitidos 
        const checkValueRol = roles.includes(userRol);
        if (!checkValueRol) {
            handleHTTPError(res, "NOT_ALLOWED", FORBIDDEN);
            return;
        }
        next();
    } catch (error) {
        //Mostramos el error
        appLogger.error(`[rol.middleware | checkRol] ERROR: ${error}`);
        handleHTTPError(res, "ERROR_PERMISSION", INTERNAL_SERVER_ERROR);
    }
}

//Exportado modulo
module.exports = { checkRol };

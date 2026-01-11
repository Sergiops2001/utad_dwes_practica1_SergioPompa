//Importado de bibliotecas
//Bibliotecas propias
const { handleHTTPError, UNAUTHORIZED } = require("../utilities/handleResponse.util");
const { verifyToken } = require("../utilities/handleJWT.util");
const usersModel = require("../models/user.model");
const { jwtLogger } = require("../config/winstonLogger.config");


//Codificacion de funciones
const authMiddleware = async (req, res, next) => {
    try {
        //Comprobamos que nos hayan introducido el token
        if (!req.headers.authorization) {
            handleHTTPError(res, "NOT_TOKEN", UNAUTHORIZED);
            return;
        }
        //Recibimos como valor del token Bearer <TOKEN>, nos quedamos con el token 
        const token = req.headers.authorization.split(' ').pop();

        //Obtenemos el Payload del token
        const tokenData = verifyToken(token);
        if (!tokenData) {
            handleHTTPError(res, "NOT_PAYLOAD_DATA", UNAUTHORIZED);
            return;
        }
        //Obtenemos el usuario y lo pasamos a los siguientes pasos 
        const query = {
            _id: tokenData.id
        }
        const user = await usersModel.findOne(query);
        req.user = user;
        next();
    } catch (error) {
        //Mostramos error
        jwtLogger.error(`[user.controller | authMiddleware] ERROR: ${error}`);
        handleHTTPError(res, "NOT_SESSION", UNAUTHORIZED);
    }
}

//Exportado modulo
//Exportado modulo
module.exports = { authMiddleware };
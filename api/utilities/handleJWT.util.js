//Importado de bibliotecas 
//Bibliotecas externas
const jwt = require("jsonwebtoken");
const { jwtLogger } = require("../config/winstonLogger.config");

//Definicion de constantes 
const JWT_SECRET = process.env.JWT_SECRET;
const NORMAL_TOKENS_EXPIRATION = "2h";

//Codificacion de funciones 
const tokenSign = (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
        },
        JWT_SECRET,
        {
            expiresIn: NORMAL_TOKENS_EXPIRATION
        }
    );
    return sign;
}

const verifyToken = (JWTToken) => {
    try {
        return jwt.verify(JWTToken, JWT_SECRET);
    } catch (err) {
        jwtLogger.error(`[handleJWT.util | verifyToken] ERROR: ${err}`);
    }
}

//Exportado de módulo
module.exports = {
    tokenSign,
    verifyToken
}
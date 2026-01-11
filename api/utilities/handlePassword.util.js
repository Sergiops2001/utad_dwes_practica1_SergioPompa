//Imprtado de bibliotecas 
//Bibliotecas externas
const bcryptjs = require("bcryptjs");

//Definicion de constantes 
const SALT_ROUNDS = 10;

//Codificacion de funciones 
const hashPassword = async (password) => {

    const hash = await bcryptjs.hash(password, SALT_ROUNDS);
    return hash;
}

//Comparacion de contraseña con hash
const comparePassword = async (password, hash) => {
    const result = await bcryptjs.compare(password, hash);
    return result;
}

//Exportado de modulo
module.exports = {
    hashPassword,
    comparePassword
}




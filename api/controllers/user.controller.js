/*
    Título: User Controller
    Nombre:Sergio Pompa
    Descripción: Creamos el controlador para la ruta de users
*/

/* Importado de Bibliotecas */
const userModel = require("../models/user.model");
const { matchedData } = require("express-validator");
const { handleHTTPError, handleHTTPResponse, INTERNAL_SERVER_ERROR } = require("../utilities/handleResponse.util");
const { hashPassword, comparePassword } = require("../utilities/handlePassword.util");
const { tokenSign } = require("../utilities/handleJWT.util");
const { appLogger } = require("../config/winstonLogger.config");

/* Codificación de Funciones */
//Registro de usuario
//Registro de usuario
const registerUser = async (req, res) => {
    try {
        //Nos quedamos con el body de la peticion 
        const body = matchedData(req);
        //Gneramos la contraseña hasheada
        const password = await hashPassword(body.password);
        //Creamos el objeto para insertar en la base de datos
        const bodyInsert = { ...body, password };
        //Creamos el usuario
        const dataUser = await userModel.create(bodyInsert);
        //Eliminamos el atributo password de la respuesta para no mandarla
        dataUser.set("password", undefined, { strict: false });
        //Mandamos el token de sesion junto a la informacion del usuario
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        //Enviamos la respuesta
        handleHTTPResponse(res, "User signed up successfully", data);
    }
    catch (err) {
        appLogger.error(`[user.controller | registerUser] ERROR: ${err}`);
        handleHTTPError(res, "ERROR_REGISTER_USER", INTERNAL_SERVER_ERROR);
    }
}
//Login de usuario
const loginUser = async (req, res) => {
    try {
        //Nos quedamos con el body de la peticion 
        req = matchedData(req);
        //Buscamos el usuario con el email introducido
        const user = await userModel.findOne({ email: req.email }).select("password name rol email");
        //Comprobamos que el usuario existe
        if (!user || user.deleted) {
            handleHTTPError(res, "USER_NOT_EXISTS", 404);
            return;
        }
        //Comprobamos contraseña
        const check = await comparePassword(req.password, user.password);
        if (!check) {
            handleHTTPError(res, "INVALID_PASSWORD", INTERNAL_SERVER_ERROR);
            return;
        }
        //Devolvemos el usuario quitando la contraseña
        user.set("password", undefined, { strict: false });
        const data = {
            token: await tokenSign(user),
            user
        }
        handleHTTPResponse(res, "Authentication successful", data);
    } catch (error) {
        appLogger.error(`[user.controller | loginUser] ERROR: ${error}`);
        handleHTTPError(res, "ERROR_LOGIN_USER", INTERNAL_SERVER_ERROR);
    }
}
//Obtención de todos los elementos, GET ALL
const getUsers = async (req, res) => {
    try {
        //Obtenemos los usuarios de la base de datos 
        const data = await userModel.find({ deleted: false });
        handleHTTPResponse(res, "Se han obtenido correctamente los datos de entrada", data);
    }
    catch (err) {
        appLogger.error(`[user.controller | getUsers] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos de entrada", INTERNAL_SERVER_ERROR);
    }
}

//Obtención de elemento por ID, GET BY ID
const getUser = async (req, res) => {
    try {
        //Obtenemos el ID de los parámetros validados
        const { id } = matchedData(req);
        const data = await userModel.findById(id);

        // Si no existe o está borrado lógicamente
        if (!data || data.deleted) {
            handleHTTPError(res, "USER_NOT_FOUND", 404);
            return;
        }

        handleHTTPResponse(res, "Se han obtenido correctamente los datos de entrada", data);
    }
    catch (err) {
        appLogger.error(`[user.controller | getUser] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos de entrada", INTERNAL_SERVER_ERROR);
    }
}

//Creación de elemento , CREATE
const createUser = async (req, res) => {
    try {
        //Obtenemos los datos del body validado
        const body = matchedData(req);
        //Introducimos el nuevo usuario en la base de datos
        const data = await userModel.create(body);
        handleHTTPResponse(res, "Se han creado correctamente los datos de entrada", data);
    }
    catch (err) {
        appLogger.error(`[user.controller | createUser] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido crear correctamente los datos de entrada", INTERNAL_SERVER_ERROR);
    }
}

//Modificación de elemento , UPDATE
const updateUser = async (req, res) => {
    try {
        //Obtebemos los datos del usuario a modificar validados
        const { id, ...body } = matchedData(req);

        //Tratamos de realizar la actualización en la base de datos
        const data = await userModel.findByIdAndUpdate(id, body, { new: true });

        handleHTTPResponse(res, "Se han actualizado correctamente los datos de entrada", data);
    }
    catch (err) {
        appLogger.error(`[user.controller | updateUser] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido actualizar correctamente los datos de entrada", INTERNAL_SERVER_ERROR);
    }
}

//Borrado de elemento, DELETE
const deleteUser = async (req, res) => {
    try {
        //Obtenemos los datos del usuario a borrar validados
        //Obtenemos los datos del usuario a borrar validados
        const { id } = matchedData(req);
        //Tratamos de realizar el borrado lógico en la base de datos
        const data = await userModel.findByIdAndUpdate(id, { deleted: true }, { new: true });
        handleHTTPResponse(res, "Se han borrado (lógicamente) correctamente los datos de entrada", data);
    }
    catch (err) {
        appLogger.error(`[user.controller | deleteUser] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido borrar correctamente los datos de entrada", INTERNAL_SERVER_ERROR);
    }
}

/* Exportado de Módulo */
module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    registerUser
}

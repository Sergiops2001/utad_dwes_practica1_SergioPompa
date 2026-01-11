/*
    Título: Sonda Controller
    Nombre:Sergio Pompa
    Descripción: Creamos el controlador para la ruta de sonda
*/

/* Importado de Bibliotecas */
const sondaModel = require("../models/sonda.model");
const { matchedData } = require("express-validator");
const { handleHTTPResponse, handleHTTPError, INTERNAL_SERVER_ERROR } = require("../utilities/handleResponse.util");
const { appLogger } = require("../config/winstonLogger.config");

/* Codificación de Funciones */
//Obtención de todos los elementos, GET ALL
const getSondas = async (req, res) => {
    try {
        //Obtenemos los usuarios de la base de datos 
        const data = await sondaModel.find({ deleted: false });
        handleHTTPResponse(res, "Se han obtenido correctamente las sondas", data);
    }
    catch (err) {
        appLogger.error(`[sonda.controller | getSondas] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente las sondas", INTERNAL_SERVER_ERROR);
    }
}

//Obtención de elemento por ID, GET BY ID
const getSonda = async (req, res) => {
    try {
        //Obtenemos el ID de los parámetros validados
        const { id } = matchedData(req);
        const data = await sondaModel.findById(id);
        handleHTTPResponse(res, "Se han obtenido correctamente las sondas", data);
    }
    catch (err) {
        appLogger.error(`[sonda.controller | getSonda] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente las sondas", INTERNAL_SERVER_ERROR);
    }
}

//Creación de elemento , CREATE
const createSonda = async (req, res) => {
    try {
        //Obtenemos los datos del body validados
        const body = matchedData(req);
        //Introducimos el nuevo usuario en la base de datos
        const data = await sondaModel.create(body);
        handleHTTPResponse(res, "Se han creado correctamente las sondas", data);
    }
    catch (err) {
        appLogger.error(`[sonda.controller | createSonda] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido crear correctamente las sondas", INTERNAL_SERVER_ERROR);
    }
}

//Modificación de elemento , UPDATE
const updateSonda = async (req, res) => {
    try {
        //Obtebemos los datos del usuario a modificar validados
        const { id, ...body } = matchedData(req);
        //Tratamos de realizar la actualización en la base de datos
        const data = await sondaModel.findByIdAndUpdate(id, body, { new: true });
        handleHTTPResponse(res, "Se han actualizado correctamente las sondas", data);
    }
    catch (err) {
        appLogger.error(`[sonda.controller | updateSonda] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido actualizar correctamente las sondas", INTERNAL_SERVER_ERROR);
    }
}

//Borrado de elemento, DELETE
const deleteSonda = async (req, res) => {
    try {
        //Obtenemos los daros del usuario a borrar validados
        const { id } = matchedData(req);
        //Tratamos de realizar el borrado en la base de datos
        const data = await sondaModel.findByIdAndUpdate({ _id: id }, { deleted: true }, { new: true });
        handleHTTPResponse(res, "Se han borrado correctamente las sondas", data);
    }
    catch (err) {
        appLogger.error(`[sonda.controller | deleteSonda] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido borrar correctamente las sondas", INTERNAL_SERVER_ERROR);
    }
}
//Obtener sondas por localizacion 
const getSondasByLocation = async (req, res) => {
    try {
        //Obtenemos los datos validados
        const { location } = matchedData(req);
        //Tratamos de realizar la actualización en la base de datos, filtrar las borradas
        const data = await sondaModel.find({ location, deleted: false });
        handleHTTPResponse(res, "Se han obtenido correctamente las sondas", data);
    }
    catch (err) {
        appLogger.error(`[sonda.controller | getSondasByLocation] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente las sondas", INTERNAL_SERVER_ERROR);
    }
}

/* Exportado de Módulo */
module.exports = {
    getSondas,
    getSonda,
    createSonda,
    updateSonda,
    deleteSonda,
    getSondasByLocation
}

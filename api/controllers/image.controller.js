/*
    Título: Image Controller
    Nombre:Sergio Pompa
    Descripción: Creamos el controlador para la ruta de image
*/

/* Importado de Bibliotecas */
const imageModel = require("../models/image.model");
const { matchedData } = require("express-validator");
const { handleHTTPResponse, handleHTTPError, INTERNAL_SERVER_ERROR } = require("../utilities/handleResponse.util");
const { appLogger } = require("../config/winstonLogger.config");

/* Codificación de Funciones */
//Obtención de todos los elementos, GET ALL
const getImages = async (req, res) => {
    try {
        //Obtenemos los usuarios de la base de datos 
        const data = await imageModel.find({ deleted: false });
        handleHTTPResponse(res, "Se han obtenido correctamente las imágenes", data);
    }
    catch (err) {
        appLogger.error(`[image.controller | getImages] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente las imágenes", INTERNAL_SERVER_ERROR);
    }
}

//Obtención de elemento por ID, GET BY ID
const getImage = async (req, res) => {
    try {
        //Obtenemos el ID de los parámetros validados
        const { id } = matchedData(req);
        const data = await imageModel.findById(id);
        handleHTTPResponse(res, "Se han obtenido correctamente las imágenes", data);
    }
    catch (err) {
        appLogger.error(`[image.controller | getImage] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente las imágenes", INTERNAL_SERVER_ERROR);
    }
}

//Creación de elemento , CREATE
const createImage = async (req, res) => {
    try {
        //Obtenemos los datos del body validado
        const body = matchedData(req);

        const data = await imageModel.create(body);
        handleHTTPResponse(res, "Se han creado correctamente las imágenes", data);
    }
    catch (err) {
        appLogger.error(`[image.controller | createImage] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido crear correctamente las imágenes", INTERNAL_SERVER_ERROR);
    }
}

//Modificación de elemento , UPDATE
const updateImage = async (req, res) => {
    try {
        //Obtebemos los datos del usuario a modificar validados
        const { id, ...body } = matchedData(req);
        //Tratamos de realizar la actualización en la base de datos
        const data = await imageModel.findByIdAndUpdate(id, body, { new: true });
        handleHTTPResponse(res, "Se han actualizado correctamente las imágenes", data);
    }
    catch (err) {
        appLogger.error(`[image.controller | updateImage] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido actualizar correctamente las imágenes", INTERNAL_SERVER_ERROR);
    }
}

//Borrado de elemento, DELETE
const deleteImage = async (req, res) => {
    try {
        //Obtenemos los daros del usuario a borrar validados
        const { id } = matchedData(req);
        //Tratamos de realizar el borrado en la base de datos
        const data = await imageModel.deleteOne({ _id: id }, { deleted: true }, { new: true });
        handleHTTPResponse(res, "Se han borrado correctamente las imágenes", data);
    }
    catch (err) {
        appLogger.error(`[image.controller | deleteImage] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido borrar correctamente las imágenes", INTERNAL_SERVER_ERROR);
    }
}
// Busqueda avanzada 
const getImagesAdvanced = async (req, res) => {
    try {
        //Obtenemos los datos del query validado
        const { location, startDate, endDate } = matchedData(req);

        appLogger.error("DEBUG - Query Params:", req.query);
        appLogger.error("DEBUG - Matched Data:", { location, startDate, endDate });

        //Filtro base: no borrados
        const query = { deleted: false };

        //Filtro opcional de localizacion
        if (location) {
            query.location = location;
        }

        //Filtro opcional de fechas
        if (startDate && endDate) {
            const end = new Date(endDate);
            end.setUTCHours(23, 59, 59, 999);

            query.date = {
                $gte: new Date(startDate),
                $lte: end
            };
        }

        appLogger.error("DEBUG - Final Query:", JSON.stringify(query));

        const data = await imageModel.find(query);
        handleHTTPResponse(res, "Se han obtenido correctamente las imágenes", data);
    }
    catch (err) {
        appLogger.error(`[image.controller | getImagesAdvanced] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente las imágenes", INTERNAL_SERVER_ERROR);
    }
}

/* Exportado de Módulo */
module.exports = {
    getImages,
    getImage,
    createImage,
    updateImage,
    deleteImage,
    getImagesAdvanced
}

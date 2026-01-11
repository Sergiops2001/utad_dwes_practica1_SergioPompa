const meteorologyModel = require("../models/meteorologyinfo.models");
const { matchedData } = require("express-validator");
const { handleHTTPResponse, handleHTTPError, INTERNAL_SERVER_ERROR } = require("../utilities/handleResponse.util");
const { appLogger } = require("../config/winstonLogger.config");

const getAllMeteorology = async (req, res) => {
    try {
        const data = await meteorologyModel.find({ deleted: false });
        handleHTTPResponse(res, "Se han obtenido correctamente los datos meteorológicos", data);
    } catch (err) {
        appLogger.error(`[meteorologyinfoController | getAll] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos meteorológicos", INTERNAL_SERVER_ERROR);
    }
}

const getMeteorologyById = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await meteorologyModel.findOne({ _id: id, deleted: false });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato meteorológico", 404);
            return;
        }
        handleHTTPResponse(res, "Se han obtenido correctamente los datos meteorológicos", data);
    } catch (err) {
        appLogger.error(`[meteorologyinfoController | getById] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos meteorológicos", INTERNAL_SERVER_ERROR);
    }
}

const createMeteorology = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await meteorologyModel.create(body);
        handleHTTPResponse(res, "Se han creado correctamente los datos meteorológicos", data);
    } catch (err) {
        appLogger.error(`[meteorologyinfoController | create] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido crear correctamente los datos meteorológicos", INTERNAL_SERVER_ERROR);
    }
}

const updateMeteorology = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await meteorologyModel.findOneAndUpdate({ _id: id, deleted: false }, body, { new: true });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato meteorológico", 404);
            return;
        }
        handleHTTPResponse(res, "Se han actualizado correctamente los datos meteorológicos", data);
    } catch (err) {
        appLogger.error(`[meteorologyinfoController | update] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido actualizar correctamente los datos meteorológicos", INTERNAL_SERVER_ERROR);
    }
}

const deleteMeteorology = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await meteorologyModel.findOneAndUpdate({ _id: id, deleted: false }, { deleted: true }, { new: true });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato meteorológico", 404);
            return;
        }
        handleHTTPResponse(res, "Se han borrado correctamente los datos meteorológicos", data);
    } catch (err) {
        appLogger.error(`[meteorologyinfoController | delete] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido borrar correctamente los datos meteorológicos", INTERNAL_SERVER_ERROR);
    }
}

const getMeteorologyAdvanced = async (req, res) => {
    try {
        const { sondaName, startDate, endDate } = matchedData(req);
        let query = { deleted: false };

        if (sondaName) {
            query.sondaName = sondaName;
        }

        if (startDate || endDate) {
            query.dateMedition = {};
            if (startDate) {
                query.dateMedition.$gte = new Date(startDate);
            }
            if (endDate) {
                const end = new Date(endDate);
                query.dateMedition.$lte = end;
            }
        }

        const data = await meteorologyModel.find(query);
        handleHTTPResponse(res, "Se han obtenido correctamente los datos meteorológicos filtrados", data);
    } catch (err) {
        appLogger.error(`[meteorologyinfoController | getAdvanced] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos meteorológicos filtrados", INTERNAL_SERVER_ERROR);
    }
}

// Stats Helpers
const buildStatsQuery = (req) => {
    const { sondaName, startDate, endDate } = matchedData(req);
    const query = {
        deleted: false,
        dateMedition: { $gte: new Date(startDate), $lte: new Date(endDate) }
    };
    if (sondaName) query.sondaName = sondaName;
    return query;
};

const getMeteorologyMin = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await meteorologyModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    minTemperature: { $min: "$temperature" },
                    minWindChill: { $min: "$windChill" }
                }
            }
        ]);
        handleHTTPResponse(res, "Mínimos obtenidos correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[meteorologyinfoController | getMin] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo mínimos", INTERNAL_SERVER_ERROR);
    }
}

const getMeteorologyMax = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await meteorologyModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    maxTemperature: { $max: "$temperature" },
                    maxWindChill: { $max: "$windChill" }
                }
            }
        ]);
        handleHTTPResponse(res, "Máximos obtenidos correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[meteorologyinfoController | getMax] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo máximos", INTERNAL_SERVER_ERROR);
    }
}

const getMeteorologyAvg = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await meteorologyModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    avgTemperature: { $avg: "$temperature" },
                    avgWindChill: { $avg: "$windChill" }
                }
            }
        ]);
        handleHTTPResponse(res, "Medias obtenidas correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[meteorologyinfoController | getAvg] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo medias", INTERNAL_SERVER_ERROR);
    }
}

const calculateMedian = (arr) => {
    if (arr.length === 0) return 0;
    arr.sort((a, b) => a - b);
    const half = Math.floor(arr.length / 2);
    if (arr.length % 2) return arr[half];
    return (arr[half - 1] + arr[half]) / 2.0;
};

const getMeteorologyMedian = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await meteorologyModel.find(query).select("temperature windChill -_id").lean();

        if (!data || data.length === 0) {
            return handleHTTPResponse(res, "Medianas calculadas (sin datos)", {});
        }

        const medians = {
            medianTemperature: calculateMedian(data.map(d => d.temperature)),
            medianWindChill: calculateMedian(data.map(d => d.windChill))
        };

        handleHTTPResponse(res, "Medianas calculadas correctamente", medians);
    } catch (err) {
        appLogger.error(`[meteorologyinfoController | getMedian] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo medianas", INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    getAllMeteorology,
    getMeteorologyById,
    createMeteorology,
    updateMeteorology,
    deleteMeteorology,
    getMeteorologyAdvanced,
    getMeteorologyMin,
    getMeteorologyMax,
    getMeteorologyAvg,
    getMeteorologyMedian
};
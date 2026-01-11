const windModel = require("../models/windData.models");
const { matchedData } = require("express-validator");
const { handleHTTPResponse, handleHTTPError, INTERNAL_SERVER_ERROR } = require("../utilities/handleResponse.util");
const { appLogger } = require("../config/winstonLogger.config");

const getAllWind = async (req, res) => {
    try {
        const data = await windModel.find({ deleted: false });
        handleHTTPResponse(res, "Se han obtenido correctamente los datos de viento", data);
    } catch (err) {
        appLogger.error(`[windDataController | getAll] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos de viento", INTERNAL_SERVER_ERROR);
    }
}

const getWindById = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await windModel.findOne({ _id: id, deleted: false });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato de viento", 404);
            return;
        }
        handleHTTPResponse(res, "Se han obtenido correctamente los datos de viento", data);
    } catch (err) {
        appLogger.error(`[windDataController | getById] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos de viento", INTERNAL_SERVER_ERROR);
    }
}

const createWind = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await windModel.create(body);
        handleHTTPResponse(res, "Se han creado correctamente los datos de viento", data);
    } catch (err) {
        appLogger.error(`[windDataController | create] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido crear correctamente los datos de viento", INTERNAL_SERVER_ERROR);
    }
}

const updateWind = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await windModel.findOneAndUpdate({ _id: id, deleted: false }, body, { new: true });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato de viento", 404);
            return;
        }
        handleHTTPResponse(res, "Se han actualizado correctamente los datos de viento", data);
    } catch (err) {
        appLogger.error(`[windDataController | update] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido actualizar correctamente los datos de viento", INTERNAL_SERVER_ERROR);
    }
}

const deleteWind = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await windModel.findOneAndUpdate({ _id: id, deleted: false }, { deleted: true }, { new: true });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato de viento", 404);
            return;
        }
        handleHTTPResponse(res, "Se han borrado correctamente los datos de viento", data);
    } catch (err) {
        appLogger.error(`[windDataController | delete] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido borrar correctamente los datos de viento", INTERNAL_SERVER_ERROR);
    }
}

const getWindAdvanced = async (req, res) => {
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

        const data = await windModel.find(query);
        handleHTTPResponse(res, "Se han obtenido correctamente los datos de viento filtrados", data);
    } catch (err) {
        appLogger.error(`[windDataController | getAdvanced] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos de viento filtrados", INTERNAL_SERVER_ERROR);
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

const getWindMin = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await windModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    minWindSpeed: { $min: "$windSpeed" },
                    minWindGustSpeed: { $min: "$windGustSpeed" }
                }
            }
        ]);
        handleHTTPResponse(res, "Mínimos obtenidos correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[windDataController | getMin] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo mínimos", INTERNAL_SERVER_ERROR);
    }
}

const getWindMax = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await windModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    maxWindSpeed: { $max: "$windSpeed" },
                    maxWindGustSpeed: { $max: "$windGustSpeed" }
                }
            }
        ]);
        handleHTTPResponse(res, "Máximos obtenidos correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[windDataController | getMax] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo máximos", INTERNAL_SERVER_ERROR);
    }
}

const getWindAvg = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await windModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    avgWindSpeed: { $avg: "$windSpeed" },
                    avgWindGustSpeed: { $avg: "$windGustSpeed" }
                }
            }
        ]);
        handleHTTPResponse(res, "Medias obtenidas correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[windDataController | getAvg] ERROR: ${err}`);
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

const getWindMedian = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await windModel.find(query).select("windSpeed windGustSpeed -_id").lean();

        if (!data || data.length === 0) {
            return handleHTTPResponse(res, "Medianas calculadas (sin datos)", {});
        }

        const medians = {
            medianWindSpeed: calculateMedian(data.map(d => d.windSpeed)),
            medianWindGustSpeed: calculateMedian(data.map(d => d.windGustSpeed))
        };

        handleHTTPResponse(res, "Medianas calculadas correctamente", medians);
    } catch (err) {
        appLogger.error(`[windDataController | getMedian] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo medianas", INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    getAllWind,
    getWindById,
    createWind,
    updateWind,
    deleteWind,
    getWindAdvanced,
    getWindMin,
    getWindMax,
    getWindAvg,
    getWindMedian
};
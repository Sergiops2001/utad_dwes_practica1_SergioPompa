const temperatureModel = require("../models/temperatureData.models");
const { matchedData } = require("express-validator");
const { handleHTTPResponse, handleHTTPError, INTERNAL_SERVER_ERROR } = require("../utilities/handleResponse.util");
const { appLogger } = require("../config/winstonLogger.config");

const getAlltemperatureData = async (req, res) => {
    try {
        const data = await temperatureModel.find({ deleted: false });
        handleHTTPResponse(res, "Se han obtenido correctamente los datos de temperatura", data);
    } catch (err) {
        appLogger.error(`[temperatureDataController | getAll] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos de temperatura", INTERNAL_SERVER_ERROR);
    }
}

const gettemperatureDataById = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await temperatureModel.findOne({ _id: id, deleted: false });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato de temperatura", 404);
            return;
        }
        handleHTTPResponse(res, "Se han obtenido correctamente los datos de temperatura", data);
    } catch (err) {
        appLogger.error(`[temperatureDataController | getById] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos de temperatura", INTERNAL_SERVER_ERROR);
    }
}

const createtemperatureData = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await temperatureModel.create(body);
        handleHTTPResponse(res, "Se han creado correctamente los datos de temperatura", data);
    } catch (err) {
        appLogger.error(`[temperatureDataController | create] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido crear correctamente los datos de temperatura", INTERNAL_SERVER_ERROR);
    }
}

const updatetemperatureData = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await temperatureModel.findOneAndUpdate({ _id: id, deleted: false }, body, { new: true });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato de temperatura", 404);
            return;
        }
        handleHTTPResponse(res, "Se han actualizado correctamente los datos de temperatura", data);
    } catch (err) {
        appLogger.error(`[temperatureDataController | update] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido actualizar correctamente los datos de temperatura", INTERNAL_SERVER_ERROR);
    }
}

const deletetemperatureData = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await temperatureModel.findOneAndUpdate({ _id: id, deleted: false }, { deleted: true }, { new: true });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato de temperatura", 404);
            return;
        }
        handleHTTPResponse(res, "Se han borrado correctamente los datos de temperatura", data);
    } catch (err) {
        appLogger.error(`[temperatureDataController | delete] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido borrar correctamente los datos de temperatura", INTERNAL_SERVER_ERROR);
    }
}

const gettemperatureDataAdvanced = async (req, res) => {
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

        const data = await temperatureModel.find(query);
        handleHTTPResponse(res, "Se han obtenido correctamente los datos de temperatura filtrados", data);
    } catch (err) {
        appLogger.error(`[temperatureDataController | getAdvanced] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos de temperatura filtrados", INTERNAL_SERVER_ERROR);
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

const gettemperatureDataMin = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await temperatureModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    minValue: { $min: "$value" }
                }
            }
        ]);
        handleHTTPResponse(res, "Mínimos obtenidos correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[temperatureDataController | getMin] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo mínimos", INTERNAL_SERVER_ERROR);
    }
}

const gettemperatureDataMax = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await temperatureModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    maxValue: { $max: "$value" }
                }
            }
        ]);
        handleHTTPResponse(res, "Máximos obtenidos correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[temperatureDataController | getMax] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo máximos", INTERNAL_SERVER_ERROR);
    }
}

const gettemperatureDataAvg = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await temperatureModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    avgValue: { $avg: "$value" }
                }
            }
        ]);
        handleHTTPResponse(res, "Medias obtenidas correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[temperatureDataController | getAvg] ERROR: ${err}`);
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

const gettemperatureDataMedian = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await temperatureModel.find(query).select("value -_id").lean();

        if (!data || data.length === 0) {
            return handleHTTPResponse(res, "Medianas calculadas (sin datos)", {});
        }

        const medians = {
            medianValue: calculateMedian(data.map(d => d.value))
        };

        handleHTTPResponse(res, "Medianas calculadas correctamente", medians);
    } catch (err) {
        appLogger.error(`[temperatureDataController | getMedian] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo medianas", INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    getAlltemperatureData,
    gettemperatureDataById,
    createtemperatureData,
    updatetemperatureData,
    deletetemperatureData,
    gettemperatureDataAdvanced,
    gettemperatureDataMin,
    gettemperatureDataMax,
    gettemperatureDataAvg,
    gettemperatureDataMedian
};

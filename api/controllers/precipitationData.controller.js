const precipitationModel = require("../models/precipitationData.models");
const { matchedData } = require("express-validator");
const { handleHTTPResponse, handleHTTPError, INTERNAL_SERVER_ERROR } = require("../utilities/handleResponse.util");
const { appLogger } = require("../config/winstonLogger.config");

const getAllPrecipitation = async (req, res) => {
    try {
        const data = await precipitationModel.find({ deleted: false });
        handleHTTPResponse(res, "Se han obtenido correctamente los datos de precipitación", data);
    } catch (err) {
        appLogger.error(`[precipitationDataController | getAll] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos de precipitación", INTERNAL_SERVER_ERROR);
    }
}

const getPrecipitationById = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await precipitationModel.findOne({ _id: id, deleted: false });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato de precipitación", 404);
            return;
        }
        handleHTTPResponse(res, "Se han obtenido correctamente los datos de precipitación", data);
    } catch (err) {
        appLogger.error(`[precipitationDataController | getById] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos de precipitación", INTERNAL_SERVER_ERROR);
    }
}

const createPrecipitation = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await precipitationModel.create(body);
        handleHTTPResponse(res, "Se han creado correctamente los datos de precipitación", data);
    } catch (err) {
        appLogger.error(`[precipitationDataController | create] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido crear correctamente los datos de precipitación", INTERNAL_SERVER_ERROR);
    }
}

const updatePrecipitation = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await precipitationModel.findOneAndUpdate({ _id: id, deleted: false }, body, { new: true });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato de precipitación", 404);
            return;
        }
        handleHTTPResponse(res, "Se han actualizado correctamente los datos de precipitación", data);
    } catch (err) {
        appLogger.error(`[precipitationDataController | update] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido actualizar correctamente los datos de precipitación", INTERNAL_SERVER_ERROR);
    }
}

const deletePrecipitation = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await precipitationModel.findOneAndUpdate({ _id: id, deleted: false }, { deleted: true }, { new: true });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato de precipitación", 404);
            return;
        }
        handleHTTPResponse(res, "Se han borrado correctamente los datos de precipitación", data);
    } catch (err) {
        appLogger.error(`[precipitationDataController | delete] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido borrar correctamente los datos de precipitación", INTERNAL_SERVER_ERROR);
    }
}

const getPrecipitationAdvanced = async (req, res) => {
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

        const data = await precipitationModel.find(query);
        handleHTTPResponse(res, "Se han obtenido correctamente los datos de precipitación filtrados", data);
    } catch (err) {
        appLogger.error(`[precipitationDataController | getAdvanced] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos de precipitación filtrados", INTERNAL_SERVER_ERROR);
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

const getPrecipitationMin = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await precipitationModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    minPrecipitationProbability: { $min: "$precipitationProbability" },
                    minAcumulatedPrecipitation: { $min: "$acumulatedPrecipitation" }
                }
            }
        ]);
        handleHTTPResponse(res, "Mínimos obtenidos correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[precipitationDataController | getMin] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo mínimos", INTERNAL_SERVER_ERROR);
    }
}

const getPrecipitationMax = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await precipitationModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    maxPrecipitationProbability: { $max: "$precipitationProbability" },
                    maxAcumulatedPrecipitation: { $max: "$acumulatedPrecipitation" }
                }
            }
        ]);
        handleHTTPResponse(res, "Máximos obtenidos correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[precipitationDataController | getMax] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo máximos", INTERNAL_SERVER_ERROR);
    }
}

const getPrecipitationAvg = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await precipitationModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    avgPrecipitationProbability: { $avg: "$precipitationProbability" },
                    avgAcumulatedPrecipitation: { $avg: "$acumulatedPrecipitation" }
                }
            }
        ]);
        handleHTTPResponse(res, "Medias obtenidas correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[precipitationDataController | getAvg] ERROR: ${err}`);
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

const getPrecipitationMedian = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await precipitationModel.find(query).select("precipitationProbability acumulatedPrecipitation -_id").lean();

        if (!data || data.length === 0) {
            return handleHTTPResponse(res, "Medianas calculadas (sin datos)", {});
        }

        const medians = {
            medianPrecipitationProbability: calculateMedian(data.map(d => d.precipitationProbability)),
            medianAcumulatedPrecipitation: calculateMedian(data.map(d => d.acumulatedPrecipitation))
        };

        handleHTTPResponse(res, "Medianas calculadas correctamente", medians);
    } catch (err) {
        appLogger.error(`[precipitationDataController | getMedian] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo medianas", INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    getAllPrecipitation,
    getPrecipitationById,
    createPrecipitation,
    updatePrecipitation,
    deletePrecipitation,
    getPrecipitationAdvanced,
    getPrecipitationMin,
    getPrecipitationMax,
    getPrecipitationAvg,
    getPrecipitationMedian
};
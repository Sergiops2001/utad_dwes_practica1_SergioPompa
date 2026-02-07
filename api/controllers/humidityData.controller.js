const humidityModel = require("../models/humidityData.models");
const sondaModel = require("../models/sonda.model");
const { matchedData } = require("express-validator");
const { handleHTTPResponse, handleHTTPError, INTERNAL_SERVER_ERROR } = require("../utilities/handleResponse.util");
const { appLogger } = require("../config/winstonLogger.config");

// Importación de utilidades
const { emitirNotificacion } = require("../../ws/events");
const { getFieldStats } = require("../utilities/stats.util");

/**
 * Obtiene los targets de notificación (sonda y su localización)
 */
const getNotificationTargets = async (sondaName) => {
    const sonda = await sondaModel.findOne({ name: sondaName, deleted: false });
    const targets = [sondaName];
    if (sonda && sonda.location) {
        targets.push(sonda.location);
    }
    return targets;
};

/**
 * Obtiene estadísticas para múltiples campos
 */
const getHumidityStats = async (sondaName) => {
    const filter = { sondaName, deleted: false };
    return {
        airHumidity: await getFieldStats(humidityModel, 'airHumidity', filter),
        DewPoint: await getFieldStats(humidityModel, 'DewPoint', filter)
    };
};

const getAllHumidity = async (req, res) => {
    try {
        const data = await humidityModel.find({ deleted: false });
        handleHTTPResponse(res, "Se han obtenido correctamente los datos de humedad", data);
    } catch (err) {
        appLogger.error(`[humidityDataController | getAll] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos de humedad", INTERNAL_SERVER_ERROR);
    }
}

const getHumidityById = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await humidityModel.findOne({ _id: id, deleted: false });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato de humedad", 404);
            return;
        }
        handleHTTPResponse(res, "Se han obtenido correctamente los datos de humedad", data);
    } catch (err) {
        appLogger.error(`[humidityDataController | getById] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos de humedad", INTERNAL_SERVER_ERROR);
    }
}

const createHumidity = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await humidityModel.create(body);

        // Obtener estadísticas y targets
        const stats = await getHumidityStats(data.sondaName);
        const targets = await getNotificationTargets(data.sondaName);

        // Emitir notificación por WebSocket
        emitirNotificacion(
            'crear',
            {
                humidityData: data,
                stats: stats,
                mensaje: 'Nuevo dato de humedad creado'
            },
            targets
        );

        handleHTTPResponse(res, "Se han creado correctamente los datos de humedad", data);
    } catch (err) {
        appLogger.error(`[humidityDataController | create] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido crear correctamente los datos de humedad", INTERNAL_SERVER_ERROR);
    }
}

const updateHumidity = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await humidityModel.findOneAndUpdate({ _id: id, deleted: false }, body, { new: true });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato de humedad", 404);
            return;
        }

        // Obtener estadísticas y targets
        const stats = await getHumidityStats(data.sondaName);
        const targets = await getNotificationTargets(data.sondaName);

        // Emitir notificación por WebSocket
        emitirNotificacion(
            'actualizar',
            {
                humidityData: data,
                stats: stats,
                mensaje: 'Dato de humedad actualizado'
            },
            targets
        );

        handleHTTPResponse(res, "Se han actualizado correctamente los datos de humedad", data);
    } catch (err) {
        appLogger.error(`[humidityDataController | update] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido actualizar correctamente los datos de humedad", INTERNAL_SERVER_ERROR);
    }
}

const deleteHumidity = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await humidityModel.findOneAndUpdate({ _id: id, deleted: false }, { deleted: true }, { new: true });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato de humedad", 404);
            return;
        }

        // Obtener estadísticas y targets
        const stats = await getHumidityStats(data.sondaName);
        const targets = await getNotificationTargets(data.sondaName);

        // Emitir notificación por WebSocket
        emitirNotificacion(
            'eliminar',
            {
                id: data._id,
                sondaName: data.sondaName,
                stats: stats,
                mensaje: 'Dato de humedad eliminado'
            },
            targets
        );

        handleHTTPResponse(res, "Se han borrado correctamente los datos de humedad", data);
    } catch (err) {
        appLogger.error(`[humidityDataController | delete] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido borrar correctamente los datos de humedad", INTERNAL_SERVER_ERROR);
    }
}

const getHumidityAdvanced = async (req, res) => {
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

        const data = await humidityModel.find(query);
        handleHTTPResponse(res, "Se han obtenido correctamente los datos de humedad filtrados", data);
    } catch (err) {
        appLogger.error(`[humidityDataController | getAdvanced] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos de humedad filtrados", INTERNAL_SERVER_ERROR);
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

const getHumidityMin = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await humidityModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    minAirHumidity: { $min: "$airHumidity" },
                    minDewPoint: { $min: "$DewPoint" }
                }
            }
        ]);
        handleHTTPResponse(res, "Mínimos obtenidos correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[humidityDataController | getMin] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo mínimos", INTERNAL_SERVER_ERROR);
    }
}

const getHumidityMax = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await humidityModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    maxAirHumidity: { $max: "$airHumidity" },
                    maxDewPoint: { $max: "$DewPoint" }
                }
            }
        ]);
        handleHTTPResponse(res, "Máximos obtenidos correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[humidityDataController | getMax] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo máximos", INTERNAL_SERVER_ERROR);
    }
}

const getHumidityAvg = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await humidityModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    avgAirHumidity: { $avg: "$airHumidity" },
                    avgDewPoint: { $avg: "$DewPoint" }
                }
            }
        ]);
        handleHTTPResponse(res, "Medias obtenidas correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[humidityDataController | getAvg] ERROR: ${err}`);
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

const getHumidityMedian = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await humidityModel.find(query).select("airHumidity DewPoint -_id").lean();

        if (!data || data.length === 0) {
            return handleHTTPResponse(res, "Medianas calculadas (sin datos)", {});
        }

        const medians = {
            medianAirHumidity: calculateMedian(data.map(d => d.airHumidity)),
            medianDewPoint: calculateMedian(data.map(d => d.DewPoint))
        };

        handleHTTPResponse(res, "Medianas calculadas correctamente", medians);
    } catch (err) {
        appLogger.error(`[humidityDataController | getMedian] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo medianas", INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    getAllHumidity,
    getHumidityById,
    createHumidity,
    updateHumidity,
    deleteHumidity,
    getHumidityAdvanced,
    getHumidityMin,
    getHumidityMax,
    getHumidityAvg,
    getHumidityMedian
};
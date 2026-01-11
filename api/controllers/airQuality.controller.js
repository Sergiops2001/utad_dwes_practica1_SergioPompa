const airQualityModel = require("../models/airQuality.models");
const { matchedData } = require("express-validator");
const { handleHTTPResponse, handleHTTPError, INTERNAL_SERVER_ERROR } = require("../utilities/handleResponse.util");
const { appLogger } = require("../config/winstonLogger.config");

const getAllAirQuality = async (req, res) => {
    try {
        const data = await airQualityModel.find({ deleted: false });
        handleHTTPResponse(res, "Se han obtenido correctamente los datos de calidad del aire", data);
    } catch (err) {
        appLogger.error(`[airQualityController | getAll] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos de calidad del aire", INTERNAL_SERVER_ERROR);
    }
}

const getAirQualityById = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await airQualityModel.findOne({ _id: id, deleted: false });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato de calidad del aire", 404);
            return;
        }
        handleHTTPResponse(res, "Se han obtenido correctamente los datos de calidad del aire", data);
    } catch (err) {
        appLogger.error(`[airQualityController | getById] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos de calidad del aire", INTERNAL_SERVER_ERROR);
    }
}

const createAirQuality = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await airQualityModel.create(body);
        handleHTTPResponse(res, "Se han creado correctamente los datos de calidad del aire", data);
    } catch (err) {
        appLogger.error(`[airQualityController | create] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido crear correctamente los datos de calidad del aire", INTERNAL_SERVER_ERROR);
    }
}

const updateAirQuality = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await airQualityModel.findOneAndUpdate({ _id: id, deleted: false }, body, { new: true });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato de calidad del aire", 404);
            return;
        }
        handleHTTPResponse(res, "Se han actualizado correctamente los datos de calidad del aire", data);
    } catch (err) {
        appLogger.error(`[airQualityController | update] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido actualizar correctamente los datos de calidad del aire", INTERNAL_SERVER_ERROR);
    }
}

const deleteAirQuality = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await airQualityModel.findOneAndUpdate({ _id: id, deleted: false }, { deleted: true }, { new: true });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato de calidad del aire", 404);
            return;
        }
        handleHTTPResponse(res, "Se han borrado correctamente los datos de calidad del aire", data);
    } catch (err) {
        appLogger.error(`[airQualityController | delete] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido borrar correctamente los datos de calidad del aire", INTERNAL_SERVER_ERROR);
    }
}

const getAirQualityAdvanced = async (req, res) => {
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

        const data = await airQualityModel.find(query);
        handleHTTPResponse(res, "Se han obtenido correctamente los datos de calidad del aire filtrados", data);
    } catch (err) {
        appLogger.error(`[airQualityController | getAdvanced] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos de calidad del aire filtrados", INTERNAL_SERVER_ERROR);
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

const getAirQualityMin = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await airQualityModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    minAirQualityIndex: { $min: "$airQualityIndex" },
                    minOzoneAmount: { $min: "$ozoneAmount" },
                    minNumberSmallParticles: { $min: "$numberSmallParticles" },
                    minNumberLargeParticles: { $min: "$numberLargeParticles" },
                    minAmountNitrogenDioxide: { $min: "$amountNitrogenDioxide" },
                    minAmountCarbonMonoxide: { $min: "$amountCarbonMonoxide" },
                    minAmountSulfurDioxide: { $min: "$amountSulfurDioxide" }
                }
            }
        ]);
        handleHTTPResponse(res, "Mínimos obtenidos correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[airQualityController | getMin] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo mínimos", INTERNAL_SERVER_ERROR);
    }
}

const getAirQualityMax = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await airQualityModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    maxAirQualityIndex: { $max: "$airQualityIndex" },
                    maxOzoneAmount: { $max: "$ozoneAmount" },
                    maxNumberSmallParticles: { $max: "$numberSmallParticles" },
                    maxNumberLargeParticles: { $max: "$numberLargeParticles" },
                    maxAmountNitrogenDioxide: { $max: "$amountNitrogenDioxide" },
                    maxAmountCarbonMonoxide: { $max: "$amountCarbonMonoxide" },
                    maxAmountSulfurDioxide: { $max: "$amountSulfurDioxide" }
                }
            }
        ]);
        handleHTTPResponse(res, "Máximos obtenidos correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[airQualityController | getMax] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo máximos", INTERNAL_SERVER_ERROR);
    }
}

const getAirQualityAvg = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await airQualityModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    avgAirQualityIndex: { $avg: "$airQualityIndex" },
                    avgOzoneAmount: { $avg: "$ozoneAmount" },
                    avgNumberSmallParticles: { $avg: "$numberSmallParticles" },
                    avgNumberLargeParticles: { $avg: "$numberLargeParticles" },
                    avgAmountNitrogenDioxide: { $avg: "$amountNitrogenDioxide" },
                    avgAmountCarbonMonoxide: { $avg: "$amountCarbonMonoxide" },
                    avgAmountSulfurDioxide: { $avg: "$amountSulfurDioxide" }
                }
            }
        ]);
        handleHTTPResponse(res, "Medias obtenidas correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[airQualityController | getAvg] ERROR: ${err}`);
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

const getAirQualityMedian = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await airQualityModel.find(query).select("airQualityIndex ozoneAmount numberSmallParticles numberLargeParticles amountNitrogenDioxide amountCarbonMonoxide amountSulfurDioxide -_id").lean();

        if (!data || data.length === 0) {
            return handleHTTPResponse(res, "Medianas calculadas (sin datos)", {});
        }

        const medians = {
            medianAirQualityIndex: calculateMedian(data.map(d => d.airQualityIndex)),
            medianOzoneAmount: calculateMedian(data.map(d => d.ozoneAmount)),
            medianNumberSmallParticles: calculateMedian(data.map(d => d.numberSmallParticles)),
            medianNumberLargeParticles: calculateMedian(data.map(d => d.numberLargeParticles)),
            medianAmountNitrogenDioxide: calculateMedian(data.map(d => d.amountNitrogenDioxide)),
            medianAmountCarbonMonoxide: calculateMedian(data.map(d => d.amountCarbonMonoxide)),
            medianAmountSulfurDioxide: calculateMedian(data.map(d => d.amountSulfurDioxide))
        };

        handleHTTPResponse(res, "Medianas calculadas correctamente", medians);
    } catch (err) {
        appLogger.error(`[airQualityController | getMedian] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo medianas", INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    getAllAirQuality,
    getAirQualityById,
    createAirQuality,
    updateAirQuality,
    deleteAirQuality,
    getAirQualityAdvanced,
    getAirQualityMin,
    getAirQualityMax,
    getAirQualityAvg,
    getAirQualityMedian
};
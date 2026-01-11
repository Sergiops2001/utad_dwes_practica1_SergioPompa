const advancedDataModel = require("../models/advancedData.models");
const { matchedData } = require("express-validator");
const { handleHTTPResponse, handleHTTPError, INTERNAL_SERVER_ERROR } = require("../utilities/handleResponse.util");
const { appLogger } = require("../config/winstonLogger.config");

const getAllAdvancedData = async (req, res) => {
    try {
        const data = await advancedDataModel.find({ deleted: false });
        handleHTTPResponse(res, "Se han obtenido correctamente los datos avanzados", data);
    } catch (err) {
        appLogger.error(`[advancedDataController | getAll] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos avanzados", INTERNAL_SERVER_ERROR);
    }
}

const getAdvancedDataById = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await advancedDataModel.findOne({ _id: id, deleted: false });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato avanzado", 404);
            return;
        }
        handleHTTPResponse(res, "Se han obtenido correctamente los datos avanzados", data);
    } catch (err) {
        appLogger.error(`[advancedDataController | getById] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos avanzados", INTERNAL_SERVER_ERROR);
    }
}

const createAdvancedData = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await advancedDataModel.create(body);
        handleHTTPResponse(res, "Se han creado correctamente los datos avanzados", data);
    } catch (err) {
        appLogger.error(`[advancedDataController | create] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido crear correctamente los datos avanzados", INTERNAL_SERVER_ERROR);
    }
}

const updateAdvancedData = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await advancedDataModel.findOneAndUpdate({ _id: id, deleted: false }, body, { new: true });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato avanzado", 404);
            return;
        }
        handleHTTPResponse(res, "Se han actualizado correctamente los datos avanzados", data);
    } catch (err) {
        appLogger.error(`[advancedDataController | update] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido actualizar correctamente los datos avanzados", INTERNAL_SERVER_ERROR);
    }
}

const deleteAdvancedData = async (req, res) => {
    try {
        const { id } = matchedData(req);
        // Logical deletion
        const data = await advancedDataModel.findOneAndUpdate({ _id: id, deleted: false }, { deleted: true }, { new: true });
        if (!data) {
            handleHTTPError(res, "No se encontro el dato avanzado", 404);
            return;
        }
        handleHTTPResponse(res, "Se han borrado correctamente los datos avanzados", data);
    } catch (err) {
        appLogger.error(`[advancedDataController | delete] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido borrar correctamente los datos avanzados", INTERNAL_SERVER_ERROR);
    }
}

const getAdvancedDataAdvanced = async (req, res) => {
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

        const data = await advancedDataModel.find(query);
        handleHTTPResponse(res, "Se han obtenido correctamente los datos avanzados filtrados", data);
    } catch (err) {
        appLogger.error(`[advancedDataController | getAdvanced] ERROR: ${err}`);
        handleHTTPError(res, "No se ha podido obtener correctamente los datos avanzados filtrados", INTERNAL_SERVER_ERROR);
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

const getAdvancedDataMin = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        // Find documents and allow picking just the fields we aggregate on for speed if index exists, 
        // but here standard sort is easiest.
        // Actually for min/max/avg we use aggregation.
        const data = await advancedDataModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    minAirPressure: { $min: "$airPressure" },
                    minUvIndex: { $min: "$uvIndex" },
                    minPollenIndex: { $min: "$pollenIndex" }
                }
            }
        ]);
        handleHTTPResponse(res, "Mínimos obtenidos correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[advancedDataController | getMin] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo mínimos", INTERNAL_SERVER_ERROR);
    }
}

const getAdvancedDataMax = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await advancedDataModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    maxAirPressure: { $max: "$airPressure" },
                    maxUvIndex: { $max: "$uvIndex" },
                    maxPollenIndex: { $max: "$pollenIndex" }
                }
            }
        ]);
        handleHTTPResponse(res, "Máximos obtenidos correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[advancedDataController | getMax] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo máximos", INTERNAL_SERVER_ERROR);
    }
}

const getAdvancedDataAvg = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        const data = await advancedDataModel.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    avgAirPressure: { $avg: "$airPressure" },
                    avgUvIndex: { $avg: "$uvIndex" },
                    avgPollenIndex: { $avg: "$pollenIndex" }
                }
            }
        ]);

        // Rounding optionally? Let's leave raw for now or standard JS round
        handleHTTPResponse(res, "Medias obtenidas correctamente", data[0] || {});
    } catch (err) {
        appLogger.error(`[advancedDataController | getAvg] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo medias", INTERNAL_SERVER_ERROR);
    }
}

// Median Calculation (JS)
const calculateMedian = (arr) => {
    if (arr.length === 0) return 0;
    arr.sort((a, b) => a - b);
    const half = Math.floor(arr.length / 2);
    if (arr.length % 2) return arr[half];
    return (arr[half - 1] + arr[half]) / 2.0;
};

const getAdvancedDataMedian = async (req, res) => {
    try {
        const query = buildStatsQuery(req);
        // Fetch all numbers to calculate median in JS
        const data = await advancedDataModel.find(query).select("airPressure uvIndex pollenIndex -_id").lean();

        if (!data || data.length === 0) {
            return handleHTTPResponse(res, "Medianas calculadas (sin datos)", {});
        }

        const airPressures = data.map(d => d.airPressure);
        const uvIndexes = data.map(d => d.uvIndex);
        const pollenIndexes = data.map(d => d.pollenIndex);

        const medians = {
            medianAirPressure: calculateMedian(airPressures),
            medianUvIndex: calculateMedian(uvIndexes),
            medianPollenIndex: calculateMedian(pollenIndexes)
        };

        handleHTTPResponse(res, "Medianas calculadas correctamente", medians);
    } catch (err) {
        appLogger.error(`[advancedDataController | getMedian] ERROR: ${err}`);
        handleHTTPError(res, "Error obteniendo medianas", INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    getAllAdvancedData,
    getAdvancedDataById,
    createAdvancedData,
    updateAdvancedData,
    deleteAdvancedData,
    getAdvancedDataAdvanced,
    getAdvancedDataMin,
    getAdvancedDataMax,
    getAdvancedDataAvg,
    getAdvancedDataMedian
};
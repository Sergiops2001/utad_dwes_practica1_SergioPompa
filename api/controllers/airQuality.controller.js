const airQualityModel = require("../models/airQuality.models");

const getAllAirQuality = async (req, res) => {
    try {
        const data = await airQualityModel.find();
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[airQualityController | getAll] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const getAirQualityById = async (req, res) => {
    try {
        const data = await airQualityModel.findById(req.params.id);
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[airQualityController | getById] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const createAirQuality = async (req, res) => {
    try {
        const data = await airQualityModel.create(req.body);
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[airQualityController | create] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const updateAirQuality = async (req, res) => {
    try {
        const data = await airQualityModel.findByIdAndUpdate(req.params.id, req.body,{ new: true });
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[airQualityController | update] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const deleteAirQuality = async (req, res) => {
    try {
        const data = await airQualityModel.deleteOne({ _id: req.params.id });
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[airQualityController | delete] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

module.exports = {
    getAllAirQuality,
    getAirQualityById,
    createAirQuality,
    updateAirQuality,
    deleteAirQuality
};
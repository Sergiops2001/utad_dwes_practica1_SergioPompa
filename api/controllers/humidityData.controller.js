const humidityModel = require("../models/humidityData.models");

const getAllHumidity = async (req, res) => {
    try {
        const data = await humidityModel.find();
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[humidityController | getAll] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const getHumidityById = async (req, res) => {
    try {
        const data = await humidityModel.findById(req.params.id);
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[humidityController | getById] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const createHumidity = async (req, res) => {
    try {
        const data = await humidityModel.create(req.body);
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[humidityController | create] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const updateHumidity = async (req, res) => {
    try {
        const data = await humidityModel.findByIdAndUpdate(req.params.id, req.body,{ new: true });
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[humidityController | update] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const deleteHumidity = async (req, res) => {
    try {
        const data = await humidityModel.deleteOne({ _id: req.params.id });
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[humidityController | delete] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

module.exports = {
    getAllHumidity,
    getHumidityById,
    createHumidity,
    updateHumidity,
    deleteHumidity
};
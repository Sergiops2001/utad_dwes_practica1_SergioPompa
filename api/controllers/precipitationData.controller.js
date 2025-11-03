const precipitationModel = require("../models/precipitationData.models");

const getAllPrecipitation = async (req, res) => {
    try {
        const data = await precipitationModel.find();
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[precipitationDataController | getAll] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const getPrecipitationById = async (req, res) => {
    try {
        const data = await precipitationModel.findById(req.params.id);
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[precipitationDataController | getById] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const createPrecipitation = async (req, res) => {
    try {
        const data = await precipitationModel.create(req.body);
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[precipitationDataController | create] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const updatePrecipitation = async (req, res) => {
    try {
        const data = await precipitationModel.findByIdAndUpdate(req.params.id, req.body);
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[precipitationDataController | update] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const deletePrecipitation = async (req, res) => {
    try {
        const data = await precipitationModel.deleteOne({ _id: req.params.id });
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[precipitationDataController | delete] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

module.exports = {
    getAllPrecipitation,
    getPrecipitationById,
    createPrecipitation,
    updatePrecipitation,
    deletePrecipitation
};
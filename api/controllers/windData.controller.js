const windModel = require("../models/windData.models");

const getAllWind = async (req, res) => {
    try {
        const data = await windModel.find();
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[windDataController | getAll] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const getWindById = async (req, res) => {
    try {
        const data = await windModel.findById(req.params.id);
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[windDataController | getById] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const createWind = async (req, res) => {
    try {
        const data = await windModel.create(req.body);
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[windDataController | create] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const updateWind = async (req, res) => {
    try {
        const data = await windModel.findByIdAndUpdate(req.params.id, req.body,{ new: true });
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[windDataController | update] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const deleteWind = async (req, res) => {
    try {
        const data = await windModel.deleteOne({ _id: req.params.id });
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[windDataController | delete] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

module.exports = {
    getAllWind,
    getWindById,
    createWind,
    updateWind,
    deleteWind
};
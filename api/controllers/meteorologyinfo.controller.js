const meteorologyModel = require("../models/meteorologyinfo.models");

const getAllMeteorology = async (req, res) => {
    try {
        const data = await meteorologyModel.find();
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[meteorologyinfoController | getAll] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const getMeteorologyById = async (req, res) => {
    try {
        const data = await meteorologyModel.findById(req.params.id);
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[meteorologyinfoController | getById] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const createMeteorology = async (req, res) => {
    try {
        const data = await meteorologyModel.create(req.body);
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[meteorologyinfoController | create] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const updateMeteorology = async (req, res) => {
    try {
        const data = await meteorologyModel.findByIdAndUpdate(req.params.id, req.body,{ new: true });
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[meteorologyinfoController | update] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const deleteMeteorology = async (req, res) => {
    try {
        const data = await meteorologyModel.deleteOne({ _id: req.params.id });
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[meteorologyinfoController | delete] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

module.exports = {
    getAllMeteorology,
    getMeteorologyById,
    createMeteorology,
    updateMeteorology,
    deleteMeteorology
};
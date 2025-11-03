const advancedDataModel = require("../models/advancedData.models");

const getAllAdvancedData = async (req, res) => {
    try {
        const data = await advancedDataModel.find();
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[advancedDataController | getAll] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const getAdvancedDataById = async (req, res) => {
    try {
        const data = await advancedDataModel.findById(req.params.id);
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[advancedDataController | getById] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const createAdvancedData = async (req, res) => {
    try {
        const data = await advancedDataModel.create(req.body);
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[advancedDataController | create] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const updateAdvancedData = async (req, res) => {
    try {
        const data = await advancedDataModel.findByIdAndUpdate(req.params.id, req.body);
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[advancedDataController | update] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

const deleteAdvancedData = async (req, res) => {
    try {
        const data = await advancedDataModel.deleteOne({ _id: req.params.id });
        res.send({ error: false, data });
    } catch (err) {
        console.log(`[advancedDataController | delete] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

module.exports = {
    getAllAdvancedData,
    getAdvancedDataById,
    createAdvancedData,
    updateAdvancedData,
    deleteAdvancedData
};
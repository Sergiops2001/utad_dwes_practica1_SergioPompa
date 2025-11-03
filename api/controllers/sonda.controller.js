/*
    Título: Sonda Controller
    Nombre:Sergio Pompa
    Descripción: Creamos el controlador para la ruta de sonda
*/

/* Importado de Bibliotecas */
const sondaModel = require("../models/sonda.model");

/* Codificación de Funciones */
//Obtención de todos los elementos, GET ALL
const getSondas = async (req, res) => {
    try {
        //Obtenemos los usuarios de la base de datos 
        const data = await sondaModel.find();
        res.send({ error: false, data});
    }
    catch (err) {
        console.log(`[sonda.controller | getSondas] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

//Obtención de elemento por ID, GET BY ID
const getSonda = async (req, res) => {
    try {
        //Obtenemos el ID de los parámetros de la URL y buscamos el usuario en la base de datos
        const id = req.params.id;
        const data = await sondaModel.findById(id);
        res.send({ error: false, data });
    }
    catch (err) {
        console.log(`[sonda.controller | getSonda] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

//Creación de elemento , CREATE
const createSonda = async (req, res) => {
    try {
        //Obtenemos los datos del body 
        const body = req.body;
        //Introducimos el nuevo usuario en la base de datos y si ya está repetido el username o el email daría error
        const data = await sondaModel.create(body);
        res.send({ error: false, data });
    }
    catch (err) {
        console.log(`[sonda.controller | createSonda] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

//Modificación de elemento , UPDATE
const updateSonda = async (req, res) => {
    try{
        //Obtebemos los datos del usuario a modificar 
        const id = req.params.id;
        const body = req.body;
        //Tratamos de realizar la actualización en la base de datos
        const data = await sondaModel.findByIdAndUpdate(id,body);
        res.send({ error: false, data });
    }
    catch (err) {
        console.log(`[sonda.controller | updateSonda] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

//Borrado de elemento, DELETE
const deleteSonda = async (req, res) => {
    try {
        //Obtenemos los daros del usuario a borrar
        const id = req.params.id;
        //Tratamos de realizar el borrado en la base de datos
        const data = await sondaModel.deleteOne({_id: id});
        res.send({ error: false, data });
    }
    catch (err) {
        console.log(`[sonda.controller | deleteSonda] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

/* Exportado de Módulo */
module.exports = {
    getSondas,
    getSonda,
    createSonda,
    updateSonda,
    deleteSonda
}

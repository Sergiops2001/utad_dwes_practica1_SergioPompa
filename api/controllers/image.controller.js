/*
    Título: Image Controller
    Nombre:Sergio Pompa
    Descripción: Creamos el controlador para la ruta de image
*/

/* Importado de Bibliotecas */
const imageModel = require("../models/image.model");

/* Codificación de Funciones */
//Obtención de todos los elementos, GET ALL
const getImages = async (req, res) => {
    try {
        //Obtenemos los usuarios de la base de datos 
        const data = await imageModel.find();
        res.send({ error: false, data});
    }
    catch (err) {
        console.log(`[image.controller | getImages] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

//Obtención de elemento por ID, GET BY ID
const getImage = async (req, res) => {
    try {
        //Obtenemos el ID de los parámetros de la URL y buscamos el usuario en la base de datos
        const id = req.params.id;
        const data = await imageModel.findById(id);
        res.send({ error: false, data });
    }
    catch (err) {
        console.log(`[image.controller | getImage] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

//Creación de elemento , CREATE
const createImage = async (req, res) => {
    try {
        //Obtenemos los datos del body 
        const body = req.body;
        
        const data = await imageModel.create(body);
        res.send({ error: false, data });
    }
    catch (err) {
        console.log(`[image.controller | createImage] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

//Modificación de elemento , UPDATE
const updateImage = async (req, res) => {
    try{
        //Obtebemos los datos del usuario a modificar 
        const id = req.params.id;
        const body = req.body;
        //Tratamos de realizar la actualización en la base de datos
        const data = await imageModel.findByIdAndUpdate(id,body);
        res.send({ error: false, data });
    }
    catch (err) {
        console.log(`[image.controller | updateImage] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

//Borrado de elemento, DELETE
const deleteImage = async (req, res) => {
    try {
        //Obtenemos los daros del usuario a borrar
        const id = req.params.id;
        //Tratamos de realizar el borrado en la base de datos
        const data = await imageModel.deleteOne({_id: id});
        res.send({ error: false, data });
    }
    catch (err) {
        console.log(`[image.controller | deleteImage] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

/* Exportado de Módulo */
module.exports = {
    getImages,
    getImage,
    createImage,
    updateImage,
    deleteImage
}

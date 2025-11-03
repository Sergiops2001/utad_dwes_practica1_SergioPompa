/*
    Título: User Controller
    Nombre:Sergio Pompa
    Descripción: Creamos el controlador para la ruta de users
*/

/* Importado de Bibliotecas */
const userModel = require("../models/user.model");

/* Codificación de Funciones */
//Obtención de todos los elementos, GET ALL
const getUsers = async (req, res) => {
    try {
        //Obtenemos los usuarios de la base de datos 
        const data = await userModel.find();
        res.send({ error: false, data});
    }
    catch (err) {
        console.log(`[user.controller | getUsers] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

//Obtención de elemento por ID, GET BY ID
const getUser = async (req, res) => {
    try {
        //Obtenemos el ID de los parámetros de la URL y buscamos el usuario en la base de datos
        const id = req.params.id;
        const data = await userModel.findById(id);
        res.send({ error: false, data });
    }
    catch (err) {
        console.log(`[user.controller | getUser] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

//Creación de elemento , CREATE
const createUser = async (req, res) => {
    try {
        //Obtenemos los datos del body 
        const body = req.body;
        //Introducimos el nuevo usuario en la base de datos y si ya está repetido el username o el email daría error
        const data = await userModel.create(body);
        res.send({ error: false, data });
    }
    catch (err) {
        console.log(`[user.controller | createUser] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

//Modificación de elemento , UPDATE
const updateUser = async (req, res) => {
    try{
        //Obtebemos los datos del usuario a modificar 
        const id = req.params.id;
        const body = req.body;
        //Tratamos de realizar la actualización en la base de datos
        const data = await userModel.findByIdAndUpdate(id,body, { new: true });
        res.send({ error: false, data });
    }
    catch (err) {
        console.log(`[user.controller | updateUser] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

//Borrado de elemento, DELETE
const deleteUser = async (req, res) => {
    try {
        //Obtenemos los daros del usuario a borrar
        const id = req.params.id;
        //Tratamos de realizar el borrado en la base de datos
        const data = await userModel.deleteOne({_id: id});
        res.send({ error: false, data });
    }
    catch (err) {
        console.log(`[user.controller | deleteUser] ERROR: ${err}`);
        res.status(500).send({ error: true, message: "Internal server error" });
    }
}

/* Exportado de Módulo */
module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}

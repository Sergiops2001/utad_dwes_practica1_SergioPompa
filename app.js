

/*
    Título: App
    Nombre: Héctor Paredes Benavides
    Descripción: Fichero de arranque del backend
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Bibliotecas propias
const connectToMongoDB = require("./api/config/mongodb.config");

/* Declaraciones Globales */
const PORT = process.env.PORT || 3000;

/* Ejecución Principal */
// Inicializamos el servidor web
const app = express();

// Le instalamos las políticas
app.use(cors());
app.use(express.json());

// Cargamos las rutas
app.use("/api/v1", require("./api/routes"));

// Inicializamos el servidor web
app.listen(PORT, async () => {

    // Inicializamos la conexión con la base de datos
    await connectToMongoDB();

    console.log(`Servidor escuchando en el puerto ${PORT}`);

});
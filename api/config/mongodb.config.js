/*
    Título: MongoDB Config
    Nombre: Sergio Pompa Sierra 
    Descripción: Creamos un módulo para gestionar la conectividad con la base de datos en MongoDB
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");
// Bibliotecas propias
const { appLogger } = require("./winstonLogger.config");

/* Declaraciones Constantes */
const DB_URI = process.env.MONGODB_URI;

/* Codificación de Funciones */
const connectToMongoDB = () => {
  appLogger.info(DB_URI);



  // Inicializamos la conexión

  appLogger.info("[MongoDB Controller] Inicializando la conexión con la base de datos...");

  mongoose.set("strictQuery", false);



  try {

    mongoose.connect(DB_URI);

    appLogger.info("[MongoDB Controller] Conexión con la base de datos inicializada con éxito.");

  }

  catch (err) {

    appLogger.error("[MongoDB Controller] No se ha podido establecer conexión con la base de datos, error:\n" + err);

  }



}
/* Exportado de Módulo */
module.exports = connectToMongoDB;



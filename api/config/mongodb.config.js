/*
    Título: MongoDB Config
    Nombre: Sergio Pompa Sierra 
    Descripción: Creamos un módulo para gestionar la conectividad con la base de datos en MongoDB
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require ("mongoose");

/* Declaraciones Constantes */
const DB_URI = process.env.MONGODB_URI;

/* Codificación de Funciones */
const connectToMongoDB = () => {
    console.log(DB_URI);



  // Inicializamos la conexión

  console.log("[MongoDB Controller] Inicializando la conexión con la base de datos...");

  mongoose.set("strictQuery", false);



  try{



    mongoose.connect(DB_URI, {

      useNewUrlParser: true,

      useUnifiedTopology: true

    });



    console.log("[MongoDB Controller] Conexión con la base de datos inicializada con éxito.");



  }

  catch(err){

    console.log("[MongoDB Controller] No se ha podido establecer conexión con la base de datos, error:\n" + err);

  }



}
    /* Exportado de Módulo */
    module.exports = connectToMongoDB;


    
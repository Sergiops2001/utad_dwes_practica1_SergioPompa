/*
    Título: App
    Nombre: Sergio Pompa Sierra
    Descripción: Fichero de arranque del backend
*/

/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morganBody = require("morgan-body");
const { IncomingWebhook } = require("@slack/webhook");
const { INTERNAL_SERVER_ERROR } = require("./api/utilities/handleResponse.util");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./api/docs/swagger.docs");

// Bibliotecas propias
const connectToMongoDB = require("./api/config/mongodb.config");
const { appLogger } = require("./api/config/winstonLogger.config");

/* Declaraciones Globales */
const PORT = process.env.PORT || 3000;
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;
//Webhook
let webhook = null;
if (SLACK_WEBHOOK) {
  webhook = new IncomingWebhook(SLACK_WEBHOOK);
}
//Logger Stream
const loggerStream = {
  write: (message) => {
    if (webhook) {
      webhook.send({
        text: message
      });
    }
  }
};

/* Ejecución Principal */
// Inicializamos el servidor web
const app = express();

// Le instalamos las políticas
app.use(cors());
app.use(express.json());

//Inicializamos el logger a slack (ANTES de las rutas)
morganBody(app, {
  noColors: true,
  skip: function (req, res) { return res.statusCode < INTERNAL_SERVER_ERROR },
  stream: loggerStream
});

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Cargamos las rutas (DESPUÉS de morgan-body)
app.use("/api/v1", require("./api/routes"));

// Inicializamos el servidor web
app.listen(PORT, async () => {

  // Inicializamos la conexión con la base de datos
  await connectToMongoDB();

  appLogger.info(`Servidor escuchando en el puerto ${PORT}`);

});
// exportamos el app (para poder usarlo en el test)
module.exports = app;

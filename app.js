/*
    Título: App
    Nombre: Sergio Pompa Sierra
    Descripción: Fichero de arranque del backend con soporte HTTPS
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

// Importar módulos para HTTPS
const https = require("https");
const fs = require("fs");
const path = require("path");

//web socket 
const WebSocket = require("ws");

// Bibliotecas propias
const connectToMongoDB = require("./api/config/mongodb.config");
const { appLogger } = require("./api/config/winstonLogger.config");
const { configurarEventosWebSocket } = require("./ws/events");

/* Declaraciones Globales */
const PORT = process.env.PORT || 3000;
const WS_PORT = process.env.WS_PORT || 8080;
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;

//Variable para activar/desactivar HTTPS
const USE_HTTPS = process.env.USE_HTTPS === 'true';

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

// Le instalamos el middleware para servir archivos estáticos
app.use(express.static('public'));

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

// Inicializamos el servidor web si no estamos en entorno de test
if (process.env.NODE_ENV !== 'test') {
  // Inicializamos la conexión con la base de datos
  connectToMongoDB().then(() => {
    // Crear servidor HTTP o HTTPS según configuración
    let server;

    if (USE_HTTPS) {
      // Configuración de certificados SSL
      const options = {
        key: fs.readFileSync(path.join(__dirname, "cert", "localhost-key.pem")),
        cert: fs.readFileSync(path.join(__dirname, "cert", "localhost.pem"))
      };

      // Crear servidor HTTPS
      server = https.createServer(options, app);
      appLogger.info(` Servidor HTTPS escuchando en el puerto ${PORT}`);
      appLogger.info(` Accede a: https://localhost:${PORT}`);
    } else {
      // Crear servidor HTTP normal
      server = app.listen(PORT);
      appLogger.info(` Servidor HTTP escuchando en el puerto ${PORT}`);
      appLogger.info(` Accede a: http://localhost:${PORT}`);
    }

    // Iniciar el servidor
    if (USE_HTTPS) {
      server.listen(PORT);
    }
  });

  // Creacion servidor WS en puerto separado
  const wss = new WebSocket.Server({ port: WS_PORT });

  // evento de inicializacion web socket 
  wss.on("connection", (ws) => {
    console.log(" Cliente WebSocket conectado");
    console.log(` Total de clientes conectados: ${wss.clients.size}`);
  });

  // eventos de web socket events.js
  configurarEventosWebSocket(wss);

  // Logger web socket
  appLogger.info(` Servidor WebSocket escuchando en el puerto ${WS_PORT}`);

} else {
  // En test, conectamos a la BD para que las rutas funcionen
  connectToMongoDB();
}

// exportamos el app (para poder usarlo en el test)
module.exports = app;
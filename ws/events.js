/*
    Título: WebSocket Events
    Nombre: Sergio Pompa Sierra
    Descripción: Manejo de eventos WebSocket
*/

// Map para guardar las suscripciones: { localizacion: Set de websockets }
const suscripciones = new Map();

/**
 * Configurar todos los eventos del WebSocket Server
 * @param {WebSocket.Server} wss - Servidor WebSocket
 */
function configurarEventosWebSocket(wss) {

  wss.on("connection", (ws) => {

    // Por defecto, el cliente está suscrito a 'global' (todas las localizaciones)
    ws.localizacion = 'global';
    agregarSuscripcion('global', ws);

    // EVENTO: Recibir mensaje del cliente
    ws.on("message", (data) => {
      try {
        // Convertir el mensaje a JSON
        const mensaje = JSON.parse(data);

        // Manejar el tipo de mensaje
        switch (mensaje.tipo) {
          case 'suscribirse':
            manejarSuscripcion(ws, mensaje.localizacion);
            break;

          default:
            console.log(`📩 Mensaje recibido: ${data}`);
        }

      } catch (error) {
        console.log(`📩 Mensaje de texto recibido: ${data}`);
      }
    });

    // EVENTO: Cliente desconectado
    ws.on("close", () => {
      console.log("❌ Cliente desconectado");
      eliminarSuscripcion(ws.localizacion, ws);
    });

    // EVENTO: Error
    ws.on("error", (error) => {
      console.error("⚠️ Error en WebSocket:", error.message);
    });

  });

}

/**
 * Manejar suscripción a una localización
 */
function manejarSuscripcion(ws, localizacion) {
  // Eliminar de la localización anterior
  eliminarSuscripcion(ws.localizacion, ws);

  // Añadir a la nueva localización
  const nuevaLocalizacion = localizacion || 'global';
  ws.localizacion = nuevaLocalizacion;
  agregarSuscripcion(nuevaLocalizacion, ws);

  // Confirmar al cliente
  ws.send(JSON.stringify({
    tipo: 'confirmacion',
    mensaje: `Suscrito a ${nuevaLocalizacion}`,
    localizacion: nuevaLocalizacion
  }));

  console.log(`📍 Cliente suscrito a: ${nuevaLocalizacion}`);
}

/**
 * Agregar cliente a una suscripción
 */
function agregarSuscripcion(localizacion, ws) {
  if (!suscripciones.has(localizacion)) {
    suscripciones.set(localizacion, new Set());
  }
  suscripciones.get(localizacion).add(ws);
}

/**
 * Eliminar cliente de una suscripción
 */
function eliminarSuscripcion(localizacion, ws) {
  if (suscripciones.has(localizacion)) {
    suscripciones.get(localizacion).delete(ws);

    // Si no quedan clientes, eliminar la localización
    if (suscripciones.get(localizacion).size === 0) {
      suscripciones.delete(localizacion);
    }
  }
}

/**
 * Emitir notificación a los suscritos de una o varias localizaciones
 * @param {String} tipo - Tipo de operación (crear, actualizar, eliminar)
 * @param {Object} datos - Datos de la notificación
 * @param {String|Array<String>} targets - Localización(es) o nombre(s) de sonda a notificar
 */
function emitirNotificacion(tipo, datos, targets = null) {
  const notificacion = JSON.stringify({
    tipo,
    datos,
    timestamp: new Date().toISOString(),
    targets: Array.isArray(targets) ? targets : [targets]
  });

  const sentTo = new Set(); // Para evitar duplicados

  const distritubirA = (target) => {
    if (target && suscripciones.has(target)) {
      suscripciones.get(target).forEach(cliente => {
        if (cliente.readyState === 1 && !sentTo.has(cliente)) {
          cliente.send(notificacion);
          sentTo.add(cliente);
        }
      });
    }
  };

  // Enviar a los targets especificados
  if (targets) {
    if (Array.isArray(targets)) {
      targets.forEach(t => distritubirA(t));
    } else {
      distritubirA(targets);
    }
  }

  // SIEMPRE enviar a 'global'
  distritubirA('global');

  console.log(`📢 Notificación [${tipo}] enviada a ${sentTo.size} clientes. Targets: ${targets || 'global'}`);
}

module.exports = {
  configurarEventosWebSocket,
  emitirNotificacion
};
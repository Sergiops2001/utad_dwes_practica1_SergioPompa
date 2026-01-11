//Configuración de Winston
// Importado de bibliotecas
const { createLogger, format, transports } = require("winston");
const { MESSAGE } = require("triple-beam");
const { combine, timestamp, label, printf } = format;

//Formatos
const generalFormat = format((info) => {
    const { level, message, timestamp } = info;
    info[MESSAGE] = `LOG(${timestamp}) ${level}: ${message}`;
    return info;
});
//Loggers
//App
const appLogger = createLogger({
    format: combine(
        label({ label: "APP", message: true }),
        timestamp(),
        generalFormat()
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'logs/app.log',
            maxsize: 5242880,
            maxFiles: 5,
            level: 'silly'
        })
    ]
});
//JWT 
const jwtLogger = createLogger({
    format: combine(
        label({ label: "JWT", message: true }),
        timestamp(),
        generalFormat()
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'logs/jwt.log',
            maxsize: 5242880,
            maxFiles: 5,
            level: 'silly'
        })
    ]
});
//Exportado de módulo
module.exports = {
    appLogger,
    jwtLogger
};


/*
    Título: Test Routes
    Descripción: Rutas para probar logging y manejo de errores
*/

const express = require('express');
const router = express.Router();
const { appLogger } = require('../config/winstonLogger.config');
const {
    OK,
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR
} = require('../utilities/handleResponse.util');

// ✅ TEST 1: Respuesta exitosa (200)
router.get('/test/success', (req, res) => {
    appLogger.info('Test endpoint: Success llamado');
    return res.status(200).json({
        success: true,
        message: 'Todo funciona correctamente',
        timestamp: new Date()
    });
});

// ⚠️ TEST 2: Error del cliente (400)
router.get('/test/client-error', (req, res) => {
    appLogger.warn('Test endpoint: Client error llamado');
    return res.status(BAD_REQUEST).json({
        success: false,
        message: 'Esto es un error 400 - NO debería ir a Slack',
        timestamp: new Date()
    });
});

// 🔥 TEST 3: Error del servidor (500)
router.get('/test/server-error', (req, res) => {
    appLogger.error('Test endpoint: Server error llamado');
    return res.status(INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Esto es un error 500 - SÍ debería ir a Slack',
        timestamp: new Date()
    });
});

// 💣 TEST 4: Error no capturado (Exception)
router.get('/test/exception', (req, res) => {
    appLogger.error('Test endpoint: Exception a punto de ocurrir');

    // Esto causará un error real
    const objeto = null;
    objeto.propiedad; // Error: Cannot read property of null
});

// 📊 TEST 5: Diferentes niveles de log
router.get('/test/logs', (req, res) => {
    appLogger.debug('🐛 Debug: Esto es debug level');
    appLogger.info('ℹ️ Info: Esto es info level');
    appLogger.warn('⚠️ Warn: Esto es warn level');
    appLogger.error('❌ Error: Esto es error level');

    return res.status(200).json({
        success: true,
        message: 'Logs enviados - revisa logs/app.log',
        timestamp: new Date()
    });
});

module.exports = router;
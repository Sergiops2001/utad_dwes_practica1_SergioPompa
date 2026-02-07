/*
    Título: Stats Utility
    Nombre: Antigravity
    Descripción: Utilidad para calcular estadísticas (min, max, media, mediana) de campos en MongoDB
*/

/**
 * Calcula la mediana de un array de números
 * @param {Array<Number>} arr 
 * @returns {Number}
 */
const calculateMedian = (arr) => {
    if (!arr || arr.length === 0) return 0;
    const sorted = [...arr].sort((a, b) => a - b);
    const half = Math.floor(sorted.length / 2);
    if (sorted.length % 2) return sorted[half];
    return (sorted[half - 1] + sorted[half]) / 2.0;
};

/**
 * Obtiene estadísticas generales para un campo específico en una colección
 * @param {mongoose.Model} model - Modelo de Mongoose
 * @param {String} field - Nombre del campo numérico
 * @param {Object} filter - Filtro opcional para la consulta
 * @returns {Object} { min, max, avg, median }
 */
const getFieldStats = async (model, field, filter = { deleted: false }) => {
    try {
        // Obtenemos min, max y avg usando agregación
        const aggregation = await model.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: null,
                    min: { $min: `$${field}` },
                    max: { $max: `$${field}` },
                    avg: { $avg: `$${field}` }
                }
            }
        ]);

        const stats = aggregation[0] || { min: 0, max: 0, avg: 0 };

        // Obtenemos todos los valores para calcular la mediana
        const data = await model.find(filter).select(`${field} -_id`).lean();
        const values = data.map(d => d[field]).filter(v => typeof v === 'number');

        stats.median = calculateMedian(values);

        // Redondeamos para limpieza visual
        stats.avg = parseFloat((stats.avg || 0).toFixed(2));
        stats.median = parseFloat((stats.median || 0).toFixed(2));

        return stats;
    } catch (err) {
        console.error(`Error calculating stats for ${field}:`, err);
        return { min: 0, max: 0, avg: 0, median: 0 };
    }
};

module.exports = {
    getFieldStats,
    calculateMedian
};

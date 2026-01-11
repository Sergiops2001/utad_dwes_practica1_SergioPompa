/**
 * Utility para abstraer las operaciones de BD (Mongo vs SQL)
 */
const DB_ENGINE = process.env.DB_ENGINE || "nosql"; // 'nosql' (Mongoose) o 'mysql' (Sequelize)

/**
 * Obtener todos los registros (Apply Soft Delete si aplica)
 * @param {Object} model - Modelo de Mongoose o Sequelize
 * @param {Object} query - Filtros opcionales (ej: { deleted: false })
 */
const getItems = async (model, query = { deleted: false }) => {
    if (DB_ENGINE === "mysql") {
        // Sequelize: findAll({ where: query })
        return await model.findAll({ where: query });
    } else {
        // Mongoose: find(query)
        return await model.find(query);
    }
};

/**
 * Obtener un registro por ID
 * @param {Object} model - Modelo
 * @param {String|Number} id - ID del registro
 */
const getItem = async (model, id) => {
    if (DB_ENGINE === "mysql") {
        // Sequelize: findOne({ where: { id: id } }) -> Agregamos deleted:false por seguridad
        return await model.findOne({ where: { id, deleted: false } });
    } else {
        // Mongoose: findOne({ _id: id, deleted: false })
        return await model.findOne({ _id: id, deleted: false });
    }
};

/**
 * Crear un registro
 * @param {Object} model - Modelo
 * @param {Object} data - Datos a insertar
 */
const createItem = async (model, data) => {
    if (DB_ENGINE === "mysql") {
        // Sequelize: create(data) -> Equivale al insert
        return await model.create(data);
    } else {
        // Mongoose: create(data)
        return await model.create(data);
    }
};

/**
 * Actualizar un registro por ID
 * @param {Object} model - Modelo
 * @param {String|Number} id - ID
 * @param {Object} data - Datos a actualizar
 */
const updateItem = async (model, id, data) => {
    if (DB_ENGINE === "mysql") {
        // Sequelize: update(data, { where: { id: id } })
        // Ojo: update devuelve [numRowsAffected], no el objeto.
        // Solemos hacer update y luego buscarlo, o usar returning: true (postgres).
        // Para consistencia con Mongoose (que suele devolver el objeto nuevo con {new:true}):
        await model.update(data, { where: { id } });
        return await model.findOne({ where: { id } });
    } else {
        // Mongoose: findOneAndUpdate({ _id: id }, data, { new: true })
        // Asumimos que queremos devolver el objeto actualizado
        return await model.findOneAndUpdate({ _id: id }, data, { new: true });
    }
};

/**
 * Eliminar (lógicamente) un registro por ID
 * @param {Object} model - Modelo
 * @param {String|Number} id - ID
 */
const deleteItem = async (model, id) => {
    // Como implementamos soft delete (deleted: true), es básicamente un update.
    // Si fuera borrado físico: destroy vs findOneAndDelete
    const softDeleteData = { deleted: true };

    if (DB_ENGINE === "mysql") {
        await model.update(softDeleteData, { where: { id } });
        return await model.findOne({ where: { id } });
    } else {
        return await model.findOneAndUpdate({ _id: id }, softDeleteData, { new: true });
    }
};

/**
 * Búsqueda Avanzada (Personalizada)
 * @param {Object} model 
 * @param {Object} queryObj - Objeto con filtros
 * Nota: Esto es más complejo de abstraer automáticamente porque la sintaxis de rango ($gte vs Op.gte) cambia.
 * Se suele requerir construir la query antes de llamar a esto, o pasar parámetros simples.
 */
const getItemsAdvanced = async (model, sequelizeFilters, mongooseFilters) => {
    if (DB_ENGINE === "mysql") {
        return await model.findAll({ where: sequelizeFilters });
    } else {
        return await model.find(mongooseFilters);
    }
};

module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
    getItemsAdvanced
};

const DaoObject = require('../../dao/DaoObject');
module.exports = class Registro {
  registroDao = null;

  constructor ( registroDao = null) {
    if (!(registroDao instanceof DaoObject)) {
     throw new Error('An Instance of DAO Object is Required');
    }
    this.registroDao = registroDao;
  }
  async init(){
    await this.registroDao.init();
    await this.registroDao.setup();
  }
  async getVersion () {
    return {
      entity: 'Registros',
      version: '1.0.0',
      description: 'CRUD de Registros'
    };
  }

  async addRegistros({
    category,
    type,
    description,
    date,
    amount,
    estado
  }) {
    const result = await this.registroDao.insertOne(
      {
        category,
        type,
        description,
        date,
        amount,
        estado
      }
    );
    return {
        category,
        type,
        description,
        date,
        amount,
        estado,
      id: result.lastID
    };
  };

  async getRegistros() {
    return this.registroDao.getAll();
  }

  async getRegistroById({ codigo }) {
    return this.registroDao.getById({ codigo });
  }

  async updateRegistro({ codigo, 
    category, 
    type, 
    description, 
    date,
    amount,
    estado,
    codigo }) {
    const result = await this.registroDao.updateOne({
        codigo, 
        category, 
        type, 
        description, 
        date, 
        amount,
        estado});
    return { 
        category, 
        type, 
        description, 
        date, 
        amount,
        estado,
        codigo,
        modified: result.changes};
}
// Registro no deberia de borrarse
async deleteRegistroById({ codigo }) {
    const registroToDelete = this.registroDao.getById({ codigo });
    const result = await this.registroDao.deleteOne({ codigo });
    return {
        ...registroToDelete,
        deleted: result.changes
    };
}
}
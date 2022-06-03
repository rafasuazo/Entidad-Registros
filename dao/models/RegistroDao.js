const { db } = require('../Connection');
const DaoObject = require('../DaoObject');
module.exports = class CategoryDao extends DaoObject{
    constructor(db = null){
        console.log('CategoryDao db: ', db);
        super(db);
    }
    async setup(){
        if (process.env.SQLITE_SETUP) {
          const createStatement = 'CREATE TABLE IF NOT EXISTS registros (id INTEGER PRIMARY KEY AUTOINCREMENT, category TEXT, type INCOME, description TEXT, date TEXT, amount DECIMAL(2), status TEXT);';
          await this.run(createStatement);
        }
      }

      getAll(){
        return this.all(
          'SELECT * from registros;', []
        );
      }

      getById( {codigo} ){
        const sqlstr= 'SELECT * from registros where id=?;';
        const sqlParamArr = [codigo];
        return this.get(sqlstr, sqlParamArr);
      }
    
      insertOne({registro, estado}) {
        const sqlstr = 'INSERT INTO registros (category, type, description, date, amount, status) values (?, ?, ?, ?, ?, ?);';
        const sqlParamArr = [registro, estado];
        return this.run(sqlstr, sqlParamArr);
      }
    
      updateOne({codigo, registro, estado}){
        const sqlstr= 'UPDATE registros set category = ?, status = ? where id = ?;';
        const sqlParamArr = [registro, codigo, estado];
        return this.run(sqlstr, sqlParamArr);
      }
    
      deleteOne({ codigo }) {
        const sqlstr = 'DELETE FROM registros where id = ?;';
        const sqlParamArr = [codigo];
        return this.run(sqlstr, sqlParamArr);
      }
}
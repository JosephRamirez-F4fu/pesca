import { Sequelize,Dialect } from 'sequelize';
class Config{
    public static readonly DB = {
        HOST: 'localhost',
        PORT: 5432,
        USER: 'postgre',
        PASSWORD:'postgrepass',
        DB: 'pesca',   
        dialect : 'postgres' as Dialect,
    }
}


const db = new Sequelize(
    Config.DB.DB,
    Config.DB.USER,
    Config.DB.PASSWORD,
    {
        host: Config.DB.HOST,
        port: Config.DB.PORT,
        dialect: Config.DB.dialect,
        logging: false,
    }
);

export default db;
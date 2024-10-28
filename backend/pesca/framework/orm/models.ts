import {Model, DataTypes} from 'sequelize';
import db from '../config/db';

class FlotaModel extends Model {
    public id!: number;
    public nombre!: string;
    public titular!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

FlotaModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },
    titular: {
        type: new DataTypes.STRING(128),
        allowNull: false
    }
}, {
    tableName: 'flota',
    sequelize: db
});


export default FlotaModel;
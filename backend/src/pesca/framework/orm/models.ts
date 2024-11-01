import { Model, DataTypes } from "sequelize";
import db from "../config/db";

export class FlotaModel extends Model {
  public id!: number;
  public nombre!: string;
  public titular!: string;
  public capacidad!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

FlotaModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    titular: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    capacidad: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
  },
  {
    tableName: "flota",
    sequelize: db,
  }
);

export class ViajeModel extends Model {
  public id!: number;
  public petroleo_cargado!: number;
  public petroleo_consumido!: number;
  public petroleo_restante!: number;
  public flota_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ViajeModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    petroleo_cargado: {
      type: new DataTypes.FLOAT(),
      allowNull: false,
    },
    petroleo_consumido: {
      type: new DataTypes.FLOAT(),
      allowNull: false,
    },
    petroleo_restante: {
      type: new DataTypes.FLOAT(),
      allowNull: false,
    },
    flota_id: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
  },
  {
    tableName: "viaje",
    sequelize: db,
  }
);

export class PescaModel extends Model {
  public id!: number;
  public id_viaje!: number;
  public pescado_tipo!: string;
  public pescado_cajas!: number;
  public pescado_precio!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PescaModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_viaje: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    pescado_tipo: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    pescado_cajas: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    pescado_precio: {
      type: new DataTypes.FLOAT(),
      allowNull: false,
    },
  },
  {
    tableName: "pesca",
    sequelize: db,
  }
);

export class GastosViajeModel extends Model {
  public id!: number;
  public id_viaje!: number;
  public concepto!: string;
  public importe!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GastosViajeModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_viaje: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    concepto: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    importe: {
      type: new DataTypes.FLOAT(),
      allowNull: false,
    },
  },
  {
    tableName: "gastos_viaje",
    sequelize: db,
  }
);

FlotaModel.hasMany(ViajeModel, {
  foreignKey: "flota_id",
  as: "viajes",
});
ViajeModel.belongsTo(FlotaModel, {
  foreignKey: "flota_id",
  as: "flota",
});

ViajeModel.hasMany(PescaModel, {
  foreignKey: "id_viaje",
  as: "pescas",
});
PescaModel.belongsTo(ViajeModel, {
  foreignKey: "id_viaje",
  as: "viaje",
});
ViajeModel.hasMany(GastosViajeModel, {
  foreignKey: "id_viaje",
  as: "gastos",
});
GastosViajeModel.belongsTo(ViajeModel, {
  foreignKey: "id_viaje",
  as: "viaje",
});


db.sync({ force: true }).then(() => console.log("Database synchronized"));

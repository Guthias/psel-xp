import {
  Model, INTEGER, STRING,
} from 'sequelize';

import db from '.';

class Stocks extends Model {
  id!: number;

  symbol!: string;

  name!: string;
}

Stocks.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  symbol: {
    allowNull: false,
    unique: true,
    type: STRING,
  },
  name: {
    allowNull: false,
    unique: true,
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'stocks',
  timestamps: false,
});

export default Stocks;

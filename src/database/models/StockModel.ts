import {
  Model, STRING,
} from 'sequelize';

import db from '.';

class Stocks extends Model {
  id!: string;

  name!: string;
}

Stocks.init({
  id: {
    allowNull: false,
    primaryKey: true,
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

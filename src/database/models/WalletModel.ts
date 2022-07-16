import {
  Model, INTEGER,
} from 'sequelize';

import db from '.';
import Stocks from './StockModel';
import Users from './UserModel';

class Wallet extends Model {
  quantity!: number;
}

Wallet.init({
  quantity: {
    type: INTEGER,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize: db,
  modelName: 'wallet',
  timestamps: false,
});

Users.belongsToMany(Stocks, { through: Wallet });
Stocks.belongsToMany(Users, { through: Wallet });

export default Wallet;

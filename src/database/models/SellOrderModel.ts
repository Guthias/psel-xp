import {
  Model, INTEGER, DECIMAL,
} from 'sequelize';

import db from '.';
import Stocks from './StockModel';
import Users from './UserModel';

class SellOrder extends Model {
  id!: number;

  userId!: number;

  stockId!: number;

  quantity!: number;

  price!: number;
}

SellOrder.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  quantity: {
    type: INTEGER,
  },
  price: {
    type: DECIMAL(10, 2),
  },
}, {
  sequelize: db,
  modelName: 'sellOrder',
  timestamps: false,
});

SellOrder.belongsTo(Users);
SellOrder.belongsTo(Stocks);

export default SellOrder;

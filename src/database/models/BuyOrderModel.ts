import {
  Model, INTEGER, DECIMAL,
} from 'sequelize';

import db from '.';
import Stocks from './StockModel';
import Users from './UserModel';

class BuyOrder extends Model {
  id!: number;

  userId!: number;

  stockId!: number;

  quantity!: number;

  price!: number;
}

BuyOrder.init({
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
  modelName: 'buyOrder',
  timestamps: false,
});

BuyOrder.belongsTo(Users);
BuyOrder.belongsTo(Stocks);

export default BuyOrder;

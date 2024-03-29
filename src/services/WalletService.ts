import { QueryTypes } from 'sequelize';
import sequelize from '../database/models';
import BuyOrder from '../database/models/BuyOrderModel';
import SellOrder from '../database/models/SellOrderModel';
import { IWalletRawOrder } from '../interfaces/IOrder';
import { IUserStocks } from '../interfaces/StocksInterface';

const getAll = async (userId:number) => {
  const walletStocks = await sequelize.query(`
    SELECT 
      w.stockId as id,
      w.quantity as quantity,
      MAX(bo.price) as marketPrice
    FROM wallets as w
      INNER JOIN buyorders as bo ON w.stockId = bo.stockId
    WHERE w.userId = ?
    GROUP BY w.stockId;`, {
    replacements: [userId],
    type: QueryTypes.SELECT,
  }) as unknown as IUserStocks[];

  return walletStocks.map((stock) => ({ ...stock, marketPrice: Number(stock.marketPrice) }));
};

const getBuyOrders = async (userId:number) => {
  const buyOrders = await BuyOrder.findAll({
    attributes: [
      ['id', 'orderId'],
      'stockId',
      'quantity',
      'price',
    ],
    where: { userId },
    raw: true,
  }) as unknown as IWalletRawOrder[];

  return buyOrders.map((order) => ({
    orderId: order.orderId,
    stockId: order.stockId,
    quantity: order.quantity,
    price: Number(order.price),
  })).sort((a, b) => a.stockId.localeCompare(b.stockId));
};

const getSellOrders = async (userId:number) => {
  const sellOrders = await SellOrder.findAll({
    attributes: [
      ['id', 'orderId'],
      'stockId',
      'quantity',
      'price',
    ],
    where: { userId },
    raw: true,
  }) as unknown as IWalletRawOrder[];

  return sellOrders.map((order) => ({
    orderId: order.orderId,
    stockId: order.stockId,
    quantity: order.quantity,
    price: Number(order.price),
  })).sort((a, b) => a.stockId.localeCompare(b.stockId));
};

export default { getAll, getBuyOrders, getSellOrders };

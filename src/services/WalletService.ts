import { QueryTypes } from 'sequelize';
import sequelize from '../database/models';
import { IUserStocks } from '../interfaces/StocksInterface';

const getAll = async (userId:number) => {
  const walletStocks = await sequelize.query(`
    SELECT 
      w.stockId as id,
      w.quantity as quantity,
      MAX(bo.price) as marketPrice
    FROM corretora.wallets as w
      INNER JOIN corretora.buyorders as bo ON w.stockId = bo.stockId
    WHERE w.userId = ?
    GROUP BY w.stockId;`, {
    replacements: [userId],
    type: QueryTypes.SELECT,
  }) as unknown as IUserStocks[];

  return walletStocks.map((stock) => ({ ...stock, marketPrice: Number(stock.marketPrice) }));
};

export default { getAll };

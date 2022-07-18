import BuyOrder from '../database/models/BuyOrderModel';
import SellOrder from '../database/models/SellOrderModel';
import Stocks from '../database/models/StockModel';
import IRawStocks from '../interfaces/StocksInterface';
import { ErrorsList } from '../middlewares/ErrorsMiddleware';

const formatStock = ({
  id, name, buyOrders, sellOrders,
}: IRawStocks) => {
  const numberBuyOrders = buyOrders.map(({ price }) => Number(price));
  const numberSellOrders = sellOrders.map(({ price }) => Number(price));

  return {
    id,
    name,
    minBuyOrder: Math.min(...numberBuyOrders),
    maxBuyOrder: Math.max(...numberBuyOrders),
    minSellOrder: Math.min(...numberSellOrders),
    maxSellOrder: Math.max(...numberSellOrders),
  };
};

const getAllStocks = async () => {
  const rawStockList = await Stocks.findAll({
    include: [{
      model: BuyOrder,
      attributes: ['price'],
    }, {
      model: SellOrder,
      attributes: ['price'],
    }],
  }) as unknown as IRawStocks[];

  const stockList = rawStockList.map(formatStock);

  return stockList;
};

const getStockById = async (id: string) => {
  const rawStock = await Stocks.findOne({
    where: { id },
    include: [{
      model: BuyOrder,
      attributes: ['price'],
    }, {
      model: SellOrder,
      attributes: ['price'],
    }],
  }) as unknown as IRawStocks;

  if (!rawStock) throw ErrorsList.stockNotFound;

  return formatStock(rawStock);
};

export default { getAllStocks, getStockById };

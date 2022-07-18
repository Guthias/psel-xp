import BuyOrder from '../database/models/BuyOrderModel';
import SellOrder from '../database/models/SellOrderModel';
import Stocks from '../database/models/StockModel';

const getAllStocks = async () => {
  const stockList = await Stocks.findAll({
    include: [{
      model: BuyOrder,
      attributes: ['price'],
    }, {
      model: SellOrder,
      attributes: ['price'],
    }],
  });

  return stockList;
};

export default { getAllStocks };

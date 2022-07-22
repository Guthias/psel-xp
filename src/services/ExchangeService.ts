import SellOrder from '../database/models/SellOrderModel';
import BuyOrder from '../database/models/BuyOrderModel';
import Sequelize from '../database/models';
import User from '../database/models/UserModel';
import { ErrorsList } from '../middlewares/ErrorsMiddleware';
import { IUserBalance } from '../interfaces/UserInterface';
import IOrder from '../interfaces/IOrder';

const makeExchanges = async (stockId: string, price: number) => {
  const highestBuyOrder = await BuyOrder.findOne({ where: { stockId, price } });
  highestBuyOrder as unknown as IOrder;

  const lowestSellOrder = await SellOrder.findOne({ where: { stockId, price } });
  lowestSellOrder as unknown as IOrder;

  if (!highestBuyOrder || !lowestSellOrder) return;

  const t = await Sequelize.transaction();
  try {
    if (highestBuyOrder.quantity > lowestSellOrder.quantity) {
      // Adiciona ou cria ação na carteira
      // Adiciona saldo no vendedor
      // Remove ordem de compra
      // Subtrai quantidade na ordem de venda
    } else if (highestBuyOrder.quantity === lowestSellOrder.quantity) {
      // Adiciona ou cria ação na carteira
      // Adiciona saldo no vendedor
      // Remove ordem de compra
      // Remove ordem de venda
    } else {
      // Adiciona ou cria ação na carteira
      // Adiciona saldo no vendedor
      // Subtrai quantidade na ordem de compra
      // Remove ordem de venda
      makeExchanges(stockId, price);
    }
  } catch (e) {
    t.rollback();
  }
};

const verifyFounds = async (userId: number, stockPrice: number, quantity: number) => {
  const { balance: userBalance } = await User.findOne({
    attributes: ['balance'],
    where: { id: userId },
  }) as unknown as IUserBalance;

  const balance = Number(userBalance);

  if (balance < (stockPrice * quantity)) throw ErrorsList.insuficientFounds;
};

const createBuyOrder = async (userId: number, stockId: string, price: number, quantity: number) => {
  const t = await Sequelize.transaction();

  await verifyFounds(userId, price, quantity);
  try {
    // Remove saldo do usuario para incrementar quando alguem vender a ação
    await User.decrement(
      { balance: price * quantity },
      { where: { id: userId }, transaction: t },
    );

    const createdBuyOrder = await BuyOrder.create(
      {
        userId, stockId, price, quantity,
      },
      { transaction: t },
    );
    t.commit();
    return createdBuyOrder;
  } catch (e) {
    t.rollback();
    throw e;
  }
};

const buyStocks = async (userId: number, stockId: string, quantity: number) => {
  const marketPrice = await SellOrder.min('price', { where: { stockId } }) as number;

  const createdBuyOrder = await createBuyOrder(userId, stockId, marketPrice, quantity);

  await makeExchanges(stockId, quantity);

  return { marketPrice, createdBuyOrder };
};

export default { buyStocks };

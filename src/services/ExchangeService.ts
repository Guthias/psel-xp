import SellOrder from '../database/models/SellOrderModel';
import BuyOrder from '../database/models/BuyOrderModel';
import Sequelize from '../database/models';
import User from '../database/models/UserModel';
import { ErrorsList } from '../middlewares/ErrorsMiddleware';
import { IUserBalance } from '../interfaces/UserInterface';
import IOrder from '../interfaces/IOrder';
import Wallet from '../database/models/WalletModel';

const updateBuyOrder = async (
  { stockId, userId, quantity }: IOrder,
  boughtQuantity: number,
) => {
  const t = await Sequelize.transaction();
  try {
    await BuyOrder.decrement(
      { quantity: boughtQuantity },
      { where: { stockId, userId }, transaction: t },
    );
    const { quantity: buyOrderQuantity } = BuyOrder.findOne(
      { attributes: ['quantity'], where: { stockId, userId }, transaction: t },
    ) as unknown as IOrder;

    if (buyOrderQuantity === 0) {
      await BuyOrder.destroy({ where: { stockId, userId }, transaction: t });
    }

    const buyerHasStock = await Wallet.findOne({ where: { stockId, userId } });

    if (buyerHasStock) {
      await Wallet.increment(
        { quantity: boughtQuantity },
        { where: { stockId, userId }, transaction: t },
      );
    } else {
      await Wallet.create({ stockId, userId, quantity }, { transaction: t });
    }
    await t.commit();
  } catch (e) {
    await t.rollback();
    throw e;
  }
};

const makeExchanges = async (stockId: string, price: number) => {
  const highestBuyOrder = await BuyOrder.findOne({ where: { stockId, price } });
  highestBuyOrder as unknown as IOrder;

  const lowestSellOrder = await SellOrder.findOne({ where: { stockId, price } });
  lowestSellOrder as unknown as IOrder;

  // console.log('-------------');
  // console.log(highestBuyOrder, lowestSellOrder);
  // console.log('-------------');
  if (!highestBuyOrder || !lowestSellOrder) return;

  console.log('hb', highestBuyOrder.quantity);
  console.log('ls', lowestSellOrder.quantity);

  if (highestBuyOrder.quantity < lowestSellOrder.quantity) {
    await updateBuyOrder(highestBuyOrder, highestBuyOrder.quantity);
    // Adiciona saldo no vendedor
    // Subtrai quantidade na ordem de venda
    return;
  } if (highestBuyOrder.quantity === lowestSellOrder.quantity) {
    // Adiciona ou cria ação na carteira
    // Remove ordem de compra

    // Adiciona saldo no vendedor
    // Remove ordem de venda
  } else {
    // Adiciona ou cria ação na carteira
    // Subtrai quantidade na ordem de compra

    // Adiciona saldo no vendedor
    // Remove ordem de venda
    console.log('caiu no else');
    // makeExchanges(stockId, price);
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

  await makeExchanges(stockId, marketPrice);

  return { marketPrice, createdBuyOrder };
};

export default { buyStocks };

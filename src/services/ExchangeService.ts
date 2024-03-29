import { Transaction } from 'sequelize';
import SellOrder from '../database/models/SellOrderModel';
import BuyOrder from '../database/models/BuyOrderModel';
import Sequelize from '../database/models';
import User from '../database/models/UserModel';
import { ErrorsList } from '../middlewares/ErrorsMiddleware';
import { IUserBalance } from '../interfaces/UserInterface';
import IOrder from '../interfaces/IOrder';
import Wallet from '../database/models/WalletModel';
import Stocks from '../database/models/StockModel';

const addBalanceOnSeller = async (
  sellerId: number,
  stockPrice: number,
  quantity:number,
  transaction: Transaction,
) => {
  await User.increment(
    { balance: stockPrice * quantity },
    { where: { id: sellerId }, transaction },
  );
};

const updateSellOrder = async (
  { id }: IOrder,
  boughtQuantity: number,
  transaction: Transaction,
) => {
  await SellOrder.decrement(
    { quantity: boughtQuantity },
    { where: { id }, transaction },
  );
  const { quantity: SellOrderQuantity } = await SellOrder.findOne(
    { attributes: ['quantity'], where: { id }, transaction },
  ) as unknown as IOrder;

  if (SellOrderQuantity === 0) {
    await SellOrder.destroy({ where: { id }, transaction });
  }
};

const addStockOnWallet = async (
  { stockId, userId }: IOrder,
  boughtQuantity: number,
  transaction: Transaction,
) => {
  const buyerHasStock = await Wallet.findOne({ where: { stockId, userId } });

  if (buyerHasStock) {
    await Wallet.increment(
      { quantity: boughtQuantity },
      { where: { stockId, userId }, transaction },
    );
  } else {
    await Wallet.create({ stockId, userId, quantity: boughtQuantity }, { transaction });
  }
};

const updateBuyOrder = async ({ id }: IOrder, boughtQuantity: number, transaction: Transaction) => {
  await BuyOrder.decrement(
    { quantity: boughtQuantity },
    { where: { id }, transaction },
  );
  const { quantity: buyOrderQuantity } = await BuyOrder.findOne(
    { attributes: ['quantity'], where: { id }, transaction },
  ) as unknown as IOrder;

  if (buyOrderQuantity === 0) {
    await BuyOrder.destroy({ where: { id }, transaction });
  }
};

const makeExchanges = async (stockId: string, price: number) => {
  const highestBuyOrder = await BuyOrder.findOne({ where: { stockId, price } });
  highestBuyOrder as unknown as IOrder;

  const lowestSellOrder = await SellOrder.findOne({ where: { stockId, price } });
  lowestSellOrder as unknown as IOrder;

  if (!highestBuyOrder || !lowestSellOrder) return;

  const t = await Sequelize.transaction();

  const boughtQuantity = highestBuyOrder.quantity <= lowestSellOrder.quantity
    ? highestBuyOrder.quantity
    : lowestSellOrder.quantity;

  try {
    await updateBuyOrder(highestBuyOrder, boughtQuantity, t);
    await addStockOnWallet(highestBuyOrder, boughtQuantity, t);
    await addBalanceOnSeller(
      lowestSellOrder.userId,
      lowestSellOrder.price,
      boughtQuantity,
      t,
    );
    await updateSellOrder(lowestSellOrder, boughtQuantity, t);
    await t.commit();
  } catch (e) {
    await t.rollback();
    throw e;
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
    await t.commit();
    return createdBuyOrder;
  } catch (e) {
    await t.rollback();
    throw e;
  }
};

const buyStocks = async (
  userId: number,
  stockId: string,
  quantity: number,
  price: number|undefined,
) => {
  const hasStock = await Stocks.findOne({ where: { id: stockId } });

  if (!hasStock) throw ErrorsList.stockNotFound;

  const buyPrice = price || await SellOrder.min('price', { where: { stockId } }) as number;

  const createdBuyOrder = await createBuyOrder(userId, stockId, buyPrice, quantity);

  await makeExchanges(stockId, buyPrice);

  const investedValue = quantity * buyPrice;

  return {
    orderId: createdBuyOrder.id,
    stockId,
    investedValue: Number(investedValue.toFixed(2)),
    orderPrice: buyPrice,
    quantity,
  };
};

const createSellOrder = async (
  userId: number,
  stockId: string,
  price: number,
  quantity: number,
) => {
  const userStocks = await Wallet.findOne({
    where: { userId, stockId },
  });

  if (!userStocks || userStocks.quantity - quantity < 0) throw ErrorsList.notEnoughStocks;

  const t = await Sequelize.transaction();

  try {
    await Wallet.decrement(
      { quantity },
      { where: { userId, stockId }, transaction: t },
    );

    const createdSellOrder = await SellOrder.create(
      {
        userId, stockId, price, quantity,
      },
      { transaction: t },
    ) as IOrder;
    await t.commit();
    return createdSellOrder;
  } catch (e) {
    await t.rollback();
    throw e;
  }
};

const sellStocks = async (
  userId: number,
  stockId: string,
  quantity: number,
  price: number|undefined,
) => {
  const hasStock = await Stocks.findOne({ where: { id: stockId } });

  if (!hasStock) throw ErrorsList.stockNotFound;

  const sellPrice = price || await BuyOrder.max('price', { where: { stockId } }) as number;

  const createdSellOrder = await createSellOrder(userId, stockId, sellPrice, quantity);

  await makeExchanges(stockId, sellPrice);

  return {
    orderId: createdSellOrder.id,
    stockId,
    sellPrice,
    quantity,
  };
};

export default { buyStocks, sellStocks };

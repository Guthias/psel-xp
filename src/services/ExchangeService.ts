import SellOrder from '../database/models/SellOrderModel';
import BuyOrder from '../database/models/BuyOrderModel';
import Sequelize from '../database/models';
import User from '../database/models/UserModel';
// import { ErrorsList } from '../middlewares/ErrorsMiddleware';
// import { IUserBalance } from '../interfaces/UserInterface';

const createBuyOrder = async (userId: number, stockId: string, price: number, quantity: number) => {
  const t = await Sequelize.transaction();

  try {
    // await verifyFounds(userId, price, quantity);
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

    return createdBuyOrder;
  } catch (e) {
    t.rollback();
    throw e;
  }
};

const buyStocks = async (userId: number, stockId: string, quantity: number) => {
  const marketPrice = await SellOrder.min('price', { where: { stockId } }) as number;
  // Criar ordem de compra com o valor maximo
  const createdBuyOrder = await createBuyOrder(userId, stockId, marketPrice, quantity);
  // Chamar função para verificar as ordens de compra e venda e fazer a transação
  return { marketPrice, createdBuyOrder };
};

export default { buyStocks };

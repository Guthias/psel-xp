import SellOrder from '../database/models/SellOrderModel';
import User from '../database/models/UserModel';
import { IUserBalance } from '../interfaces/UserInterface';
import { ErrorsList } from '../middlewares/ErrorsMiddleware';

const verifyFounds = async (userId: number, stockPrice: number, quantity: number) => {
  const { balance: userBalance } = await User.findOne({
    attributes: ['balance'],
    where: { id: userId },
  }) as unknown as IUserBalance;

  const balance = Number(userBalance);

  if (balance < (stockPrice * quantity)) throw ErrorsList.insuficientFounds;
};

const buyStocks = async (userId: number, stockId: string, quantity: number) => {
  const marketPrice = await SellOrder.min('price', { where: { stockId } }) as number;
  // Verificar o saldo do usuario e retornar um erro caso não seja o suficiente
  await verifyFounds(userId, marketPrice, quantity);
  // Criar ordem de compra com o valor maximo

  // Chamar função para verificar as ordens de compra e venda e fazer a transação

  return marketPrice;
};

export default { buyStocks };

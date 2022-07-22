import SellOrder from '../database/models/SellOrderModel';
// import User from '../database/models/UserModel';
// import { IUserBalance } from '../interfaces/UserInterface';
// import { ErrorsList } from '../middlewares/ErrorsMiddleware';

const buyStocks = async (userId: number, stockId: string, quantity: number) => {
  const marketPrice = await SellOrder.min('price', { where: { stockId } }) as number;
  // Criar ordem de compra com o valor maximo

  // Chamar função para verificar as ordens de compra e venda e fazer a transação

  return marketPrice;
};

export default { buyStocks };

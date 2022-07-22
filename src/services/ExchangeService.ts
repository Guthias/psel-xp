import SellOrder from '../database/models/SellOrderModel';

const buyStocks = async (userId: number, stockId: string, quantity: number) => {
  const marketPrice = await SellOrder.min('price', { where: { stockId } });
  // Verificar o saldo do usuario e retornar um erro caso não seja o suficiente

  // Criar ordem de compra com o valor maximo

  // Chamar função para verificar as ordens de compra e venda e fazer a transação

  return marketPrice;
};

export default { buyStocks };

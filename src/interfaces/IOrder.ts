interface IOrder {
  id: number,
  userId: number,
  stockId: string,
  quantity: number,
  price: number,
}

export interface IWalletRawOrder {
  orderId: number,
  stockId: string,
  quantity: number,
  price: string,
}

export default IOrder;

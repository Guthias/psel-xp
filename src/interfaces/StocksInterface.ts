export interface IRawStocks {
  id: string,
  name: string,
  buyOrders: [{ price: string}],
  sellOrders: [{ price: string}],
}

export interface IUserStocks {
  id: string,
  quantity: number,
  marketPrice: number,
}

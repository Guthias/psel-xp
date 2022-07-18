interface IRawStocks {
  id: string,
  name: string,
  buyOrders: [{ price: string}],
  sellOrders: [{ price: string}],
}

export default IRawStocks;

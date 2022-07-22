interface ISellOrder {
  id: number,
  userId: number,
  stockId: string,
  quantity: number,
  price: number,
}

export default ISellOrder;

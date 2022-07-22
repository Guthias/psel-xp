export interface IUser {
  id: number,
  email: string,
  name: string,
  password?: string,
  balance: number
}

export interface IUserBalance {
  balance: string,
}

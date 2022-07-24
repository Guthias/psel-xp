import request from 'supertest';
import app from '../../app';
import SellOrder from '../../database/models/SellOrderModel';
import Stocks from '../../database/models/StockModel';
import Users from '../../database/models/UserModel';
import Wallet from '../../database/models/WalletModel';
import IOrder from '../../interfaces/IOrder';
import { IUser } from '../../interfaces/UserInterface';
import resetDatabase from './assets/resetDatabase';

describe('/exchange' , () => {
  describe('<POST /buy>', () => {
    let token: any;

    beforeAll(async () => {
      const response = await request(app).post('/login').send({
        email: 'ada@teste.com',
        password: '12345678'
      });
  
      token = response.body.token;
    });

    describe('It\'s an authorized route', () => {
      it('Shouldn\'t be possible access without a token', async () => {
        const result = await request(app).post('/exchange/buy');
        
        expect(result.status).toBe(401);
        expect(result.body.message).toBe('Token not found');
      })

      it('Shouldn\'t be possible access with an invalid token', async () => {
        const result = await request(app).post('/exchange/buy')
          .set({ Authorization: 'tokenInvalido' });
        
        expect(result.status).toBe(401);
        expect(result.body.message).toBe('Invalid or expired Token');
      })
    });

    describe('When invalid request body', () => {
      it('Should have an error 400 when missing stockId', async () => {
        const result = await request(app).post('/exchange/buy')
          .set({ Authorization: token })
          .send({
            quantity: 50,
          });
        
        expect(result.status).toBe(400);
        expect(result.body.message).toBe('\"stockId\" is required');
      })

      it('Should have an error 400 when missing quantity', async () => {
        const result = await request(app).post('/exchange/buy')
          .set({ Authorization: token })
          .send({
            stockId: 'XPBR31',
          });
        
        expect(result.status).toBe(400);
        expect(result.body.message).toBe('\"quantity\" is required');
      })
    });

    describe('When valid request body', () => {
      describe('Verify fail requests', () => {
        it('Should return an error if user don\'t have enough founds for buy stocks', async () => {
          const result = await request(app).post('/exchange/buy')
            .set({Authorization: token})
            .send({
              stockId: 'XPBR31',
              quantity: 500,
            });
          
          expect(result.status).toBe(402);
          expect(result.body.message).toBe('Insuficient Founds');
        })

        it('Should have an error with status 404 when stock don\'t be found', async () => {
          const result = await request(app).post('/exchange/buy')
            .set({Authorization: token})
            .send({
              stockId: 'AAAAA',
              quantity: 10,
            });
          
          expect(result.status).toBe(404);
          expect(result.body.message).toBe('Stock not found');
        });
      })

      describe('Verify Successefull requests format', () => {  
        it('Should have status 201 when buy order be successful created', async () => {
          const result = await request(app).post('/exchange/buy')
            .set({Authorization: token})
            .send({
              stockId: 'XPBR31',
              quantity: 10,
            });
          
          expect(result.status).toBe(201);
        });

        it('Should return buy Order details on correct format', async () => {
          const result = await request(app).post('/exchange/buy')
            .set({Authorization: token})
            .send({
              stockId: 'XPBR31',
              quantity: 10,
            });
          
            expect(result.body.orderId).toBeDefined();
            expect(result.body.stockId).toBeDefined();
            expect(result.body.investedValue).toBeDefined();
            expect(result.body.orderPrice).toBeDefined();
            expect(result.body.quantity).toBeDefined();
        });
      })

      describe('Verify if exchanges is made correctly', () => {  
        describe('When bougth quantity be smaller than sell order', () => {
          let buyOrderId:any;

          beforeAll(async () => {
            resetDatabase();

            const { body:createdBuyOrder} = await request(app).post('/exchange/buy')
              .set({ Authorization: token })
              .send({
                stockId: 'XPBR31',
                quantity: 10,
              });
            
              buyOrderId = createdBuyOrder.orderId
          }, 60000);

          it('Should decrease correctly user balance', async () => {
            const { balance } = await Users
              .findOne({ attributes: ['balance'], where: { id: 2 } }) as IUser;

            expect(Number(balance)).toEqual(7019.2);
          });

          it('Should delete the buy order', async () => {
            const buyOrder = await Users.findOne({ where: { id: buyOrderId }});

            expect(buyOrder).toBeNull();
          });

          it('Should add stocks on buyer wallet', async () => {
            const { quantity } = await Wallet.findOne({ where: {
              stockId: 'XPBR31',
              userId: 2,
            }}) as unknown as { quantity: number}

            expect(quantity).toBe(35)
          });

          it('Should decrease quantity from sell order', async () => {
            const { quantity } = await SellOrder.findOne({ where: { id: 6 }}) as IOrder;

            expect(quantity).toBe(10);
          });

          it('Should increase seller balance correctly', async () => {
            const { balance } = await Users
              .findOne({ attributes: ['balance'], where: { id: 4 } }) as IUser;

            expect(Number(balance)).toEqual(7980.8);
          });
        })

        describe.only('When bougth quantity be the same on than sell order', () => {
          let buyOrderId:any;

          beforeAll(async () => {
            resetDatabase();

            const { body:createdBuyOrder} = await request(app).post('/exchange/buy')
              .set({ Authorization: token })
              .send({
                stockId: 'XPBR31',
                quantity: 20,
              });
            
              buyOrderId = createdBuyOrder.orderId
          }, 60000);

          it('Should decrease correctly user balance', async () => {
            const { balance } = await Users
              .findOne({ attributes: ['balance'], where: { id: 2 } }) as IUser;

            expect(Number(balance)).toEqual(6038.4);
          });

          it('Should delete the buy order', async () => {
            const buyOrder = await Users.findOne({ where: { id: buyOrderId }});

            expect(buyOrder).toBeNull();
          });

          it('Should add stocks on buyer wallet', async () => {
            const { quantity } = await Wallet.findOne({ where: {
              stockId: 'XPBR31',
              userId: 2,
            }}) as unknown as { quantity: number}

            expect(quantity).toBe(45)
          });

          it('Should delete the sell order', async () => {
            const sellOrder = await SellOrder.findOne({ where: { id: 6 }}) as IOrder;

            expect(sellOrder).toBeNull();
          });

          it('Should increase seller balance correctly', async () => {
            const { balance } = await Users
              .findOne({ attributes: ['balance'], where: { id: 4 } }) as IUser;

            expect(Number(balance)).toEqual(8961.6);
          });
        })
      })
    });
  });
});
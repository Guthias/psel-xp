import request from 'supertest';
import app from '../../app';

describe('/exchange', () => {
  describe('<POST /sell>', () => {
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
        const result = await request(app).post('/exchange/sell');

        expect(result.status).toBe(401);
        expect(result.body.message).toBe('Token not found');
      })

      it('Shouldn\'t be possible access with an invalid token', async () => {
        const result = await request(app).post('/exchange/sell')
          .set({ Authorization: 'tokenInvalido' });

        expect(result.status).toBe(401);
        expect(result.body.message).toBe('Invalid or expired Token');
      })
    });

    describe('When invalid request body', () => {
      it('Should have an error 400 when missing stockId', async () => {
        const result = await request(app).post('/exchange/sell')
          .set({ Authorization: token })
          .send({
            quantity: 50,
          });

        expect(result.status).toBe(400);
        expect(result.body.message).toBe('\"stockId\" is required');
      })

      it('Should have an error 400 when missing quantity', async () => {
        const result = await request(app).post('/exchange/sell')
          .set({ Authorization: token })
          .send({
            stockId: 'XPBR31',
          });

        expect(result.status).toBe(400);
        expect(result.body.message).toBe('\"quantity\" is required');
      })
    })

    describe('When valid request body', () => {
      describe('Verify fail requests', () => {
        it('Should return an error if user don\'t have enough stocks which he\'s trying to sell', async () => {
          const result = await request(app).post('/exchange/sell')
            .set({ Authorization: token })
            .send({
              stockId: 'XPBR31',
              quantity: 50,
            });

          expect(result.status).toBe(409);
          expect(result.body.message).toBe('You don\'t have enough stocks');
        })

        it('Should have an error user try to sell a stock which he don\'t have', async () => {
          const result = await request(app).post('/exchange/sell')
            .set({ Authorization: token })
            .send({
              stockId: 'ABEV3',
              quantity: 10,
            });

          expect(result.status).toBe(409);
          expect(result.body.message).toBe('You don\'t have enough stocks');
        });

        it('Should have an error with status 404 when stock don\'t be found', async () => {
          const result = await request(app).post('/exchange/sell')
            .set({ Authorization: token })
            .send({
              stockId: 'AAAAA',
              quantity: 10,
            });

          expect(result.status).toBe(404);
          expect(result.body.message).toBe('Stock not found');
        });
      })

      describe('Verify Successful requests format', () => {  
        it('Should have status 201 when sell order be successful created', async () => {
          const result = await request(app).post('/exchange/sell')
            .set({Authorization: token})
            .send({
              stockId: 'ELET3',
              quantity: 20,
            });
          
          expect(result.status).toBe(201);
        });

        it('Should return buy Order details on correct format', async () => {
          const result = await request(app).post('/exchange/sell')
            .set({Authorization: token})
            .send({
              stockId: 'ELET3',
              quantity: 10,
            });
          
            expect(result.body.orderId).toBeDefined();
            expect(result.body.stockId).toBeDefined();
            expect(result.body.sellPrice).toBeDefined();
            expect(result.body.quantity).toBeDefined();
        });

        it('Should be possible create a sell order with custom price', async () => {
          const result = await request(app).post('/exchange/sell')
            .set({Authorization: token})
            .send({
              stockId: 'ELET3',
              quantity: 10,
              price: 44.22
            });
          
            expect(result.body.sellPrice).toBe(44.22);
        });
      })
    })
  });
});
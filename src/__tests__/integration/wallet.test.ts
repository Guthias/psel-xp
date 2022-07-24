import app from '../../app';
import request from 'supertest';
import resetDatabase from './assets/resetDatabase';

describe('/wallet', () => {
  beforeAll(() => {
    resetDatabase();
  }, 60000);

  describe('<GET />', () => {
    let token: any;

    beforeAll(async () => {
      const response = await request(app).post('/login').send({
        email: 'linus@teste.com',
        password: '12345678'
      });

      token = response.body.token;
    });

    describe('It\'s an authorized route', () => {
      it('Shouldn\'t be possible access without a token', async () => {
        const result = await request(app).get('/wallet');

        expect(result.status).toBe(401);
        expect(result.body.message).toBe('Token not found');
      })

      it('Shouldn\'t be possible access with an invalid token', async () => {
        const result = await request(app).get('/wallet')
          .set({ Authorization: 'tokenInvalido' });

        expect(result.status).toBe(401);
        expect(result.body.message).toBe('Invalid or expired Token');
      })
    });

    describe('When have an user token', () => {
      it('Should return an array with all user stocks', async () => {
        const result = await request(app).get('/wallet/')
          .set({ Authorization: token })

        expect(Array.isArray(result.body)).toBe(true);
        expect(result.body.length).toBe(2);
      });

      it('Should have id, quantity and marketPrice from stocks', async () => {
        const result = await request(app).get('/wallet/')
          .set({ Authorization: token })

        const stock = result.body[0];

        expect(Object.keys(stock)).toEqual(['id', 'quantity', 'marketPrice']);
      });

      it('Should have correct data from stocks', async () => {
        const result = await request(app).get('/wallet/')
          .set({ Authorization: token })

        const stock = result.body.find(({ id }: { id: string }) => id === 'XPBR31');

        expect(Object.values(stock)).toEqual(['XPBR31', 50, 98.05]);
      });
    })
  });

  describe('<GET /buy>', () => {
    describe('It\'s an authorized route', () => {
      it('Shouldn\'t be possible access without a token', async () => {
        const result = await request(app).get('/wallet/buy');

        expect(result.status).toBe(401);
        expect(result.body.message).toBe('Token not found');
      })

      it('Shouldn\'t be possible access with an invalid token', async () => {
        const result = await request(app).get('/wallet/buy')
          .set({ Authorization: 'tokenInvalido' });

        expect(result.status).toBe(401);
        expect(result.body.message).toBe('Invalid or expired Token');
      })
    });

    describe('When be successful', () => {
      let token: any;

      beforeAll(async () => {
        const response = await request(app).post('/login').send({
          email: 'ada@teste.com',
          password: '12345678'
        });

        token = response.body.token;
      });

      it('Should have status code 200', async () => {
        const result = await request(app).get('/wallet/buy')
          .set({ Authorization: token });

        expect(result.status).toBe(200);
      })

      it('Should return a list with all active buy orders', async () => {
        const result = await request(app).get('/wallet/buy')
          .set({ Authorization: token });

        expect(result.body.length).toBe(2);
      })

      it('Should contain orderId, stockId, quantity and price from orders', async () => {
        const result = await request(app).get('/wallet/buy')
          .set({ Authorization: token });

        const returnedProperties = Object.keys(result.body[0])
        expect(returnedProperties).toContain('orderId');
        expect(returnedProperties).toContain('stockId');
        expect(returnedProperties).toContain('quantity');
        expect(returnedProperties).toContain('price');
      })

      it('Should return orders ordered alphabetically by stockId', async () => {
        const result = await request(app).get('/wallet/buy')
          .set({ Authorization: token });

        const stocksOrder = result.body.map(({ stockId }: { stockId: string }) => stockId);

        expect(stocksOrder[0]).toBe('ELET3');
        expect(stocksOrder[1]).toBe('XPBR31');
      })
    })
  })

  describe('<GET /sell>', () => {
    describe('It\'s an authorized route', () => {
      it('Shouldn\'t be possible access without a token', async () => {
        const result = await request(app).get('/wallet/sell');

        expect(result.status).toBe(401);
        expect(result.body.message).toBe('Token not found');
      })

      it('Shouldn\'t be possible access with an invalid token', async () => {
        const result = await request(app).get('/wallet/sell')
          .set({ Authorization: 'tokenInvalido' });

        expect(result.status).toBe(401);
        expect(result.body.message).toBe('Invalid or expired Token');
      })
    });

    describe('When be successful', () => {
      let token: any;

      beforeAll(async () => {
        const response = await request(app).post('/login').send({
          email: 'admin@xpinc.com',
          password: '12345678'
        });

        token = response.body.token;
      });

      it('Should have status code 200', async () => {
        const result = await request(app).get('/wallet/sell')
          .set({ Authorization: token });

        expect(result.status).toBe(200);
      })

      it('Should return a list with all active sell orders', async () => {
        const result = await request(app).get('/wallet/sell')
          .set({ Authorization: token });

        expect(result.body.length).toBe(5);
      })

      it('Should contain orderId, stockId, quantity and price from orders', async () => {
        const result = await request(app).get('/wallet/sell')
          .set({ Authorization: token });

        const returnedProperties = Object.keys(result.body[0])
        expect(returnedProperties).toContain('orderId');
        expect(returnedProperties).toContain('stockId');
        expect(returnedProperties).toContain('quantity');
        expect(returnedProperties).toContain('price');
      })

      it('Should return orders ordered alphabetically by stockId', async () => {
        const result = await request(app).get('/wallet/sell')
          .set({ Authorization: token });

        const stocksOrder = result.body.map(({ stockId }: { stockId: string }) => stockId);

        expect(stocksOrder[0]).toBe('ABEV3');
        expect(stocksOrder[1]).toBe('AZUL4');
        expect(stocksOrder[2]).toBe('ELET3');
        expect(stocksOrder[3]).toBe('MGLU3');
        expect(stocksOrder[4]).toBe('XPBR31');
      })
    })
  })
})
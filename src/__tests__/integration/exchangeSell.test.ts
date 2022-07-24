import request from 'supertest';
import app from '../../app';

describe('/exchange' , () => {
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
  });
});
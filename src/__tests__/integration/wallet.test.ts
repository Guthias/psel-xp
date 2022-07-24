import app from '../../app';
import request from 'supertest';

describe('/wallet', () => {
  let token: any;
  
  beforeAll(async () => {
    const response = await request(app).post('/login').send({
      email: 'linus@teste.com',
      password: '12345678'
    });

    token = response.body.token;
  });

  describe('<GET />', () => {
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

          const stock = result.body.find(({ id }: {id:string}) => id === 'XPBR31');

          expect(Object.values(stock)).toEqual(['XPBR31', 50, 98.05]);
      });
    })
  });
})
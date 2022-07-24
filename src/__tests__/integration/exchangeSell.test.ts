import request from 'supertest';
import app from '../../app';

describe('/exchange' , () => {
  describe('<POST /sell>', () => {
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
  });
});
import request from 'supertest';
import app from '../../app';

describe('/account', () => {
  let token: any;

  beforeAll(async () => {
    const response = await request(app).post('/login').send({
      email: 'ada@teste.com',
      password: '12345678'
    });

    token = response.body.token;
  });

  describe('<GET />', () => {
    it('Should have status code 200 when be sucesseful', async () => {
      const result = await request(app).get('/account').set({ Authorization: token });

      expect(result.status).toBe(200);
    })

    it('Should contain data from user', async () => {
      const result = await request(app).get('/account').set({ Authorization: token });

      expect(result.body.id).toBe(2);
      expect(result.body.name).toBe("Ada Lovelace");
      expect(result.body.email).toBe("ada@teste.com");
      expect(result.body.balance).toBe(8000);
    })

    it('Shouldn\'t have password field', async () => {
      const result = await request(app).get('/account').set({ Authorization: token });

      expect(result.body)
      expect(result.body.password).toBeUndefined();
    })
  })

  describe('<POST /deposit>', () => {
    describe('When incorrect fields', () => {
      it('Shouldn\'t be possible call without value', async () => {
        
      })

      it('Should have a number bigger than 1', async () => {
        
      })
    })

    describe('When correct request body', () => {
      it('Should have status code 200 when be successeful', async () => {
        
      })
  
      it('Should contain only new balance info', async () => {
        
      })
  
      it('Should return new balance with new balance value', async () => {
        
      })
    })
  })

  describe('<POST /withdraw>', () => {
    describe('When incorrect fields', () => {
      it('Shouldn\'t be possible call without value', async () => {
        
      })

      it('Shouldn\'t be possible call without value be number bigger than 1', async () => {
        
      })
    })

    describe('When correct request body', () => {
      it('Should have status code 200 when be successeful', async () => {
        
      })
  
      it('Should contain only new balance info', async () => {
        
      })
  
      it('Should return new balance with new balance value', async () => {
        
      })
    })
  })
});
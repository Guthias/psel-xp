import request from 'supertest';
import app from '../../app';
import Users from '../../database/models/UserModel';
import { IUser } from '../../interfaces/UserInterface';
import resetDatabase from './assets/resetDatabase';

describe('/account', () => {
  let token: any;

  beforeAll(async () => {
    resetDatabase();
    const response = await request(app).post('/login').send({
      email: 'ada@teste.com',
      password: '12345678'
    });

    token = response.body.token;
  }, 60000);

  describe('<GET />', () => {
    it('Shouldn\'t be possible call without a valid token', async () => {
      const result = await request(app).get('/account').set({ Authorization: 'notValidToken' });

      expect(result.status).toBe(401);
      expect(result.body).toEqual({ message: "Invalid or expired Token"});
    })

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
    it('Shouldn\'t be possible call without a valid token', async () => {
      const result = await request(app).post('/account/deposit')
        .set({ Authorization: 'notValidToken' })
        .send({
          value: 200,
        }
      );

      expect(result.status).toBe(401);
      expect(result.body).toEqual({ message: "Invalid or expired Token"});
    })

    describe('When incorrect fields', () => {
      it('Shouldn\'t be possible call without value', async () => {
        const result = await request(app).post('/account/deposit')
          .set({ Authorization: token })
          .send({});

        expect(result.status).toBe(400);
        expect(result.body).toEqual({ message: '\"value\" is required'});
      })

      it('Should have a number bigger than 1', async () => {
        const result = await request(app).post('/account/deposit')
        .set({ Authorization: token })
        .send({
          value: 0,
        });

        expect(result.status).toBe(400);
        expect(result.body).toEqual({ message: '\"value\" must be greater than or equal to 1'});
      })
    })
      
    describe('When correct request body', () => {
      it('Should have status code 200 when be successeful', async () => {
        const result = await request(app).post('/account/deposit')
        .set({ Authorization: token })
        .send({
          value: 100,
        });
        
        expect(result.status).toBe(200);
      })

      it('Should contain only new balance info', async () => {
        const result = await request(app).post('/account/deposit')
        .set({ Authorization: token })
        .send({
          value: 100,
        });
        
        expect(Object.keys(result.body)).toEqual(['newBalance']);
      })
  
      it('Should return correct new balance value', async () => {
        const result = await request(app).post('/account/deposit')
        .set({ Authorization: token })
        .send({
          value: 100,
        });
        
        const { balance: currentBalance } = await Users
          .findOne({ attributes: ['balance'], where: { id: 2}}) as IUser;

        expect(result.body.newBalance).toBe(Number(currentBalance));
      })
    })
  })

  describe('<POST /withdraw>', () => {
    describe('When incorrect fields', () => {
      it('Shouldn\'t be possible call without value', async () => {
        const result = await request(app).post('/account/withdraw')
          .set({ Authorization: token })
          .send({});

        expect(result.status).toBe(400);
        expect(result.body).toEqual({ message: '\"value\" is required'});
      })

      it('Should have a number bigger than 1', async () => {
        const result = await request(app).post('/account/withdraw')
        .set({ Authorization: token })
        .send({
          value: 0,
        });

        expect(result.status).toBe(400);
        expect(result.body).toEqual({ message: '\"value\" must be greater than or equal to 1'});
      })
    })

    describe('When correct request body', () => {
      it('Should have status code 200 when be successeful', async () => {
        const result = await request(app).post('/account/withdraw')
        .set({ Authorization: token })
        .send({
          value: 100,
        });
        
        expect(result.status).toBe(200);
      })

      it('Should contain only new balance info', async () => {
        const result = await request(app).post('/account/withdraw')
        .set({ Authorization: token })
        .send({
          value: 100,
        });
        
        expect(Object.keys(result.body)).toEqual(['newBalance']);
      })
  
      it('Should return correct new balance value', async () => {
        const result = await request(app).post('/account/withdraw')
        .set({ Authorization: token })
        .send({
          value: 100,
        });
        
        const { balance: currentBalance } = await Users
          .findOne({ attributes: ['balance'], where: { id: 2}}) as IUser;

        expect(result.body.newBalance).toBe(Number(currentBalance));
      })

      it('Should return an error if the new balance be smaller than 0', async () => {
        const result = await request(app).post('/account/withdraw')
          .set({ Authorization: token })
          .send({
            value: 50000,
          });
        
        expect(result.status).toBe(402);
        expect(result.body).toEqual({ message: 'Insuficient Founds' });
      })
    })
  })
});
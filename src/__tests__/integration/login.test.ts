import request from 'supertest';
import app from '../../app';

describe('<POST /login>', () => {
  describe('When invalid fields', () => {
    it('Should return error 400 with a details message when missing e-mail field', async () => {
      const result = await request(app).post('/login').send({
        password: "12345678"
      });

      expect(result.status).toBe(400);
      expect(result.body).toEqual({ message: '\"email\" is required'});
    });

    it('Should return error 400 with a details message when email be on invalid format', async () => {
      const result = await request(app).post('/login').send({
        email: "teste@teste.com"
      });

      expect(result.status).toBe(400);
      expect(result.body).toEqual({ message: '\"password\" is required'});
    });

    it('Should return error 400 with a details message when missing password field', async () => {
      const result = await request(app).post('/login').send({
        email: "teste.com",
        password: "12345678"
      });

      expect(result.status).toBe(400);
      expect(result.body).toEqual({ message: '\"email\" must be a valid email'});
    });
  });

  describe('When valid fields', () => {
    it('Should return error 400 with a details message when credentials be incorrect', async () => {
      const result = await request(app).post('/login').send({
        email: "email@invalid.com",
        password: "wrongPassword"
      });

      expect(result.status).toBe(400);
      expect(result.body).toEqual({ message: 'Invalid Credentials'});
    });

    it('Should return a status 200 with a JWT token when is valid credentials', async () => {
      const result = await request(app).post('/login').send({
        email: "ada@teste.com",
        password: "12345678"
      });

      expect(result.status).toBe(200);
      expect(result.body.token).toBeDefined();
    });
  });
});

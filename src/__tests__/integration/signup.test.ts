import request from 'supertest';
import app from '../../app';

describe('<POST /signup>', () => {
  describe('When invalid fields', () => {
    it('Should return error 400 with a details message when missing e-mail field', async () => {
      const result = await request(app).post('/signup').send({
        name: "Geralt of Rivia",
        password: "senhaSegura"
      });

      expect(result.status).toBe(400);
      expect(result.body).toEqual({ message: '\"email\" is required' });
    });

    it('Should return error 400 with a details message when missing password field', async () => {
      const result = await request(app).post('/signup').send({
        name: "Geralt of Rivia",
        email: "geralt@test.com",
      });

      expect(result.status).toBe(400);
      expect(result.body).toEqual({ message: '\"password\" is required' });
    });

    it('Should return error 400 with a details message when missing name field', async () => {
      const result = await request(app).post('/signup').send({
        email: "geralt@test.com",
        password: "senhaSegura"
      });

      expect(result.status).toBe(400);
      expect(result.body).toEqual({ message: '\"name\" is required' });
    });

    it('Should return error 422 with a details message when email be on invalid format', async () => {
      const result = await request(app).post('/signup').send({
        name: "Geralt of Rivia",
        email: "test.com",
        password: "senhaSegura"
      });

      expect(result.status).toBe(422);
      expect(result.body).toEqual({ message: '\"email\" must be a valid email' });
    });

    it('Should return error 422 with a details message when name have less than 5 chars', async () => {
      const result = await request(app).post('/signup').send({
        name: "Ciri",
        email: "ciri@test.com",
        password: "senhaSegura"
      });

      expect(result.status).toBe(422);
      expect(result.body).toEqual({ message: '\"name\" length must be at least 5 characters long' });
    });

    it('Should return error 422 with a details message when password have less than 8 chars', async () => {
      const result = await request(app).post('/signup').send({
        name: "Geralt of rivia",
        email: "geralt@test.com",
        password: "1234567"
      });

      expect(result.status).toBe(422);
      expect(result.body).toEqual({ message: '\"password\" length must be at least 8 characters long' });
    });
  });

  describe('When valid fields', () => {

  });
});

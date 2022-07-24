import request from 'supertest';
import app from '../../app';
import resetDatabase from './assets/resetDatabase';

describe('/stocks', () => {
  beforeAll(() => {
    resetDatabase();
  });

  describe('<GET />', () => {
    it('Should show a list with all available stocks', async () => {
      const result = await request(app).get('/stocks/');
      expect(result.body.length).toBe(5);
    })

    it('Should return an array of objects with id, name and sell/buy order prices', async () => {
      const result = await request(app).get('/stocks/');

      result.body.forEach((stock: any) => {
        expect(stock).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          minBuyOrder: expect.any(Number),
          maxBuyOrder: expect.any(Number),
          minSellOrder: expect.any(Number),
          maxSellOrder: expect.any(Number)
        });
      })
    })

    it('Should contain correct data on stocks object', async () => {
      const result = await request(app).get('/stocks/');
      
      expect(result.body.at(-1)).toStrictEqual({
        id: 'XPBR31',
        name: 'XP Inc',
        minBuyOrder: 96.24,
        maxBuyOrder: 98.05,
        minSellOrder: 98.08,
        maxSellOrder: 98.35
      });
    })
  })

  describe('<GET /:id>', () => {
    it('Should show correct data from searched stock', async () => {
      const result = await request(app).get('/stocks/XPBR31');
      
      expect(result.body).toStrictEqual({
        id: 'XPBR31',
        name: 'XP Inc',
        minBuyOrder: 96.24,
        maxBuyOrder: 98.05,
        minSellOrder: 98.08,
        maxSellOrder: 98.35
      });
    })

    it('Should have a status 404 when stock don\'t exist', async () => {
      const result = await request(app).get('/stocks/AAAAA');
      
      expect(result.status).toBe(404);
      expect(result.body).toEqual({ message: 'Stock not found' });
    })
  })
})
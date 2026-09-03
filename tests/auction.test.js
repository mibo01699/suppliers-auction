// tests/auction.test.js
const request = require('supertest');
const app = require('../server');

describe('Auction API Tests', () => {
    test('GET /api/health should return status online', async () => {
        const response = await request(app).get('/api/health');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('online');
        expect(response.body.service).toBe('suppliers-auction');
    });

    test('GET /api/auctions should return array', async () => {
        const response = await request(app).get('/api/auctions');
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.auctions)).toBe(true);
    });

    test('POST /api/auctions/create should create auction', async () => {
        const response = await request(app)
            .post('/api/auctions/create')
            .send({ title: 'Test Auction', startingPrice: '1000' });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.auction.title).toBe('Test Auction');
    });

    test('POST /api/auctions/:id/bid should place bid', async () => {
        const response = await request(app)
            .post('/api/auctions/1/bid')
            .send({ amount: '1500', bidder: 'Test Bidder' });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.bid.amount).toBe('1500');
    });
});
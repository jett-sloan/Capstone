const request = require('supertest');
const app = require('../app'); // Adjust the path to your Express app

describe('Availability Check', () => {
  it('should return available slots for a given day', async () => {
    const response = await request(app)
      .get('/availability')
      .query({ day: '2024-07-19' })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('availableSlots');
    expect(Array.isArray(response.body.availableSlots)).toBe(true);
    expect(response.body.availableSlots).toContain('08:00'); // Example check
  });

  it('should return an error if day is not provided', async () => {
    const response = await request(app)
      .get('/availability')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toHaveProperty('error', 'Day is required');
  });
});

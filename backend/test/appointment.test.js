const request = require('supertest');
const app = require('../app'); // Adjust the path to your Express app
const db = require('../db'); // Adjust the path to your database connection

describe('Appointment Creation', () => {
  beforeAll(async () => {
    // Setup database connection and possibly clear tables
  });

  afterAll(async () => {
    // Close database connection
    await db.end();
  });

  it('should create a new appointment successfully', async () => {
    const appointmentData = {
      day: '2024-07-19',
      daytime: '10:00',
    };

    const response = await request(app)
      .post('/availability')
      .send(appointmentData)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('day', appointmentData.day);
    expect(response.body).toHaveProperty('daytime', appointmentData.daytime);
    expect(response.body).toHaveProperty('isBooked', true);

    // Additional checks to confirm the appointment was added in the database
  });

  it('should return an error if day or daytime is missing', async () => {
    const response = await request(app)
      .post('/availability')
      .send({ day: '2024-07-19' }) // Missing daytime
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toHaveProperty('error', 'Day and daytime are required');
  });
});

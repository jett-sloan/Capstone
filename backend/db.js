const { Client } = require('pg');

const client = new Client({
  user: 'app',
  host: 'indirectly-normal-sawfly-iad.a1.pgedge.io',
  database: 'cap_stone',
  password: 'E51Yx9i1bC4rRK1LUbZ678d5',
  ssl: { rejectUnauthorized: false } // Ensure SSL is correctly configured
});

client.connect()
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = client;

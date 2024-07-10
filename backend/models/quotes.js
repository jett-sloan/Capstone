const db = require('../db');

class Quote {
  constructor(id, numberOfWindows, quoteAmount, createdAt, address) {
    this.id = id;
    this.numberOfWindows = numberOfWindows;
    this.quoteAmount = quoteAmount;
    this.createdAt = createdAt;
    this.address = address;
  }

  /** Find all quotes */
  static async findAll() {
    const res = await db.query('SELECT id, number_of_windows, quote_amount, created_at, address FROM quotes');
    return res.rows.map(row => new Quote(row.id, row.number_of_windows, row.quote_amount, row.created_at, row.address));
  }

  /** Find a single quote by ID */
  static async findOne(id) {
    const res = await db.query('SELECT id, number_of_windows, quote_amount, created_at, address FROM quotes WHERE id = $1', [id]);
    const row = res.rows[0];
    if (!row) {
      throw new Error(`No quote found with ID ${id}`);
    }
    return new Quote(row.id, row.number_of_windows, row.quote_amount, row.created_at, row.address);
  }

  /** Create a new quote */
  static async create(numberOfWindows, quoteAmount, createdAt, address) {
    const res = await db.query(
      `INSERT INTO quotes 
      (number_of_windows, quote_amount, created_at, address)
      VALUES ($1, $2, $3, $4)
      RETURNING id, number_of_windows, quote_amount, created_at, address`,
      [numberOfWindows, quoteAmount, createdAt, address]
    );
    const row = res.rows[0];
    return new Quote(row.id, row.number_of_windows, row.quote_amount, row.created_at, row.address);
  }
}

module.exports = Quote;


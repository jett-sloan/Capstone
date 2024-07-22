const db = require('../db');


class User {
  constructor(userid, firstName, lastName, email, password) {
    this.userid = userid
    this.firstname = firstName;
    this.lastname = lastName;
    this.email = email;
    this.password = password;
  }

  /** Find all users */
  static async findAll() {
    const res = await db.query('SELECT * FROM users');
    return res.rows.map(row => new User(row.userid, row.firstname, row.lastname, row.email, row.password));
  }

  /** Find a single user by ID */
  static async findOne(email) {
    try {
      const res = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      const row = res.rows[0];
      console.log(email); // Make sure this is within the method scope

      if (!row) {
        throw new Error(`No user found with ${email}`);
      }
      // Adjust the property names to match your database columns
      return new User(row.userid, row.firstname, row.lastname, row.email, row.password);
    } catch (error) {
      console.error('Error in findOne method:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }
//  static async fetchOrderCountByEmail(email) {
//    const query = 'SELECT COUNT(*) AS order_count FROM orders WHERE email = $1';
//    const result = await db.query(query, [email]);
//    return result.rows.length > 0 ? result.rows[0].order_count : 0;
//  }


  /** Create a new user */
  static async create(firstName, lastName, email, password) {
    const res = await db.query(
      'INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING userid, firstname, lastname, email, password',
      [firstName, lastName, email, password]
    );
    const row = res.rows[0];
    return new User(row.userid, row.firstname, row.lastname, row.email, row.password);
  }

  /** Update a user's information */
  async update(firstName, lastName, email, password) {
    const res = await db.query(
      'UPDATE users SET firstname = $1, lastname = $2, email = $3, password = $4 WHERE id = $5 RETURNING id, firstname, lastname, email, password',
      [firstName, lastName, email, password, this.id]
    );
    const row = res.rows[0];
    this.firstName = row.first_name;
    this.lastName = row.last_name;
    this.email = row.email;
    this.password = row.password;
    return this;
  }

  /** Delete a user */
  async remove() {
    await db.query('DELETE FROM users WHERE id = $1', [this.id]);
  }
}

module.exports = User;
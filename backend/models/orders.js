const db = require('../db');
const moment = require('moment-timezone');

class Order {
  constructor(id, quoteId, day, time, createdAt, updatedAt,name,email,address) {
    this.id = id;
    this.quoteId = quoteId;
    this.day = day;
    this.time = time;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.name = name;
    this.email = email;
    this.address = address;
  }


  static formatDate(date) {
    return moment(date).tz('America/New_York').format('YYYY-MM-DD');
}

  /** Find all orders */
  static async findAll() {
    const res = await db.query('SELECT * FROM orders');
    return res.rows.map(row => new Order(
      row.order_id,
      row.user_id,
      row.day,
      row.time,
      row.created_at,
      row.updated_at
    ));
  }

  /** Find a single order by ID */
  static async findOne(id) {
    const res = await db.query('SELECT * FROM orders WHERE order_id = $1', [id]);
    const order = res.rows[0];
    if (!order) {
      throw new Error(`No order found with ID ${id}`);
    }
    return new Order(
      order.order_id,
      order.user_id,
      order.day,
      order.time,
      order.created_at,
      order.updated_at
    );
  }

  /** Create a new order */


  static async create(quoteId, day, time,name,email,address ) {
    const formattedDay = Order.formatDate(day);
    const res = await db.query(
      'INSERT INTO orders (quote_id, day, time,name,email,address) VALUES ($1, $2, $3,$4,$5,$6) RETURNING *',
      [quoteId, formattedDay, time,name,email,address]
    );
    
    const newOrder = res.rows[0];
    return new Order(
      newOrder.order_id,
      newOrder.quote_id,
      newOrder.day,
      newOrder.time,
      newOrder.created_at,
      newOrder.updated_at,
      newOrder.name,
      newOrder.email,
      newOrder.address
    );
  }

  /** Update an existing order */
  static async update(id, updates) {
    const { userId, day, time } = updates;
    const res = await db.query(
      'UPDATE orders SET user_id = $1, day = $2, time = $3, updated_at = CURRENT_TIMESTAMP WHERE order_id = $4 RETURNING *',
      [userId, day, time, id]
    );
    const updatedOrder = res.rows[0];
    if (!updatedOrder) {
      throw new Error(`No order found with ID ${id}`);
    }
    return new Order(
      updatedOrder.order_id,
      updatedOrder.user_id,
      updatedOrder.day,
      updatedOrder.time,
      updatedOrder.created_at,
      updatedOrder.updated_at
    );
  }

  /** Delete an order */
  static async delete(id) {
    const res = await db.query('DELETE FROM orders WHERE order_id = $1 RETURNING *', [id]);
    const deletedOrder = res.rows[0];
    if (!deletedOrder) {
      throw new Error(`No order found with ID ${id}`);
    }
    return new Order(
      deletedOrder.order_id,
      deletedOrder.user_id,
      deletedOrder.day,
      deletedOrder.time,
      deletedOrder.created_at,
      deletedOrder.updated_at
    );
  }
}

module.exports = Order;

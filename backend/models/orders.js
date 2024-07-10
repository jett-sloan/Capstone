const db = require('../db');

class Order {
  constructor(id, userId, day, time, createdAt, updatedAt) {
    this.id = id;
    this.userId = userId;
    this.day = day;
    this.time = time;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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
  static async create(userId, day, time) {
    const res = await db.query(
      'INSERT INTO orders (user_id, day, time) VALUES ($1, $2, $3) RETURNING *',
      [userId, day, time]
    );
    const newOrder = res.rows[0];
    return new Order(
      newOrder.order_id,
      newOrder.user_id,
      newOrder.day,
      newOrder.time,
      newOrder.created_at,
      newOrder.updated_at
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

const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define(
  "order",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    prod_id: {
      type: Sequelize.INTEGER,
    },
    total: {
      type: Sequelize.DOUBLE,
    },
    stripe_id: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Order;

const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define(
  "product",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.FLOAT,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Product;

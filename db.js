const Sequelize = require("sequelize");

module.exports = new Sequelize("mkd_test", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

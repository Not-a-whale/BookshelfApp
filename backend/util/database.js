const Sequelize = require("sequelize");

const sequelize = new Sequelize("bookshelf", "root", "Kornienko130", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

/* const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "bookshelf",
  password: "Kornienko130",
});

module.exports = pool.promise(); */

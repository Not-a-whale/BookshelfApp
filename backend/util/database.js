const Sequelize = require("sequelize");

const sequelize = new Sequelize("heroku_d2ece091677540c", "bec7006fa7d9b9", "4c6309ef", {
  dialect: "mysql",
  host: "eu-cdbr-west-03.cleardb.net"
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

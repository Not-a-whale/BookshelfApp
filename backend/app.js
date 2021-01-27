const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const itemsRoutes = require("./routes/items");
//const userRoutes = require("./routes/user");

const sequelize = require("./util/database");

/* db.execute("SELECT * FROM data")
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  }); */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/items", itemsRoutes);
//app.use("/api/user", postsRoutes);

module.exports = app;

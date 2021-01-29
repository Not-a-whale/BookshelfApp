const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const itemsRoutes = require("./routes/items");

const sequelize = require("./util/database");


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
  })
  .catch((err) => {
  });

app.use("/api/items", itemsRoutes);

module.exports = app;

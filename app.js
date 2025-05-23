const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/carrosdb");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(80, () => {
  console.log("Servidor rodando na porta 80");
});
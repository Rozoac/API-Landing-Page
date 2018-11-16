const express = require("express");
const app = express();

app.use(require("./contenedor"));
app.use(require("./arquitectonico"));
app.use(require("./uploads"));
app.use(require("./imagenes"));
app.use(require("./comercio"));

module.exports = app;

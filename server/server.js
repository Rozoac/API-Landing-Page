/*=================================================
                    REQUIRES
==================================================*/
require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const bodysito = require("body-parser");
const app = express();
/*=================================================
                    CORS
==================================================*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodysito.urlencoded({ extended: false }));

app.use(bodysito.json());

app.use(require("./routes/index"))
/*=================================================
                    BD
==================================================*/

mongoose.connect(process.env.URLDB,
  (err, res) => {
    if (err) throw err;
    console.log("BASE DE DATOS ONLINE");
  }
);
/*=================================================
                    SERVER
==================================================*/
app.listen(process.env.PORT, () => {
  console.log(`ESCUCHANDO EN EL PUERTO ${process.env.PORT}`);
});

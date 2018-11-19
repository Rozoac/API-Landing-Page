const express = require("express");
const md5 = require("md5");
const Comercio = require("../models/comercio");
Comercio;
const app = express();

/*=================================================
                DEVOLVER SIGNATURE
==================================================*/

app.post("/signature", (req, res) => {
  let body = req.body;

  if (!body.referenceCode || !body.amount){
    return res.status(400).json({
      ok: false,
      error: "Campos obligatorios"
    });
  }

  Comercio.find({}).exec((err, comercio) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    if(comercio[0].modo === "prueba"){
      merchantId = 508029;
      accountId = 512321;
      apiKey = '4Vj8eK4rloUd272L48hsrarnUA';
      signatureString = `${apiKey}~${merchantId}~${body.referenceCode}~${ body.amount }~${ comercio[0].currency}`;
      signature = md5(signatureString);
    }
    else{
    signatureString = `${comercio[0].apiKeyPayu}~${comercio[0].merchantId}~${body.referenceCode}~${body.amount}~${comercio[0].currency}`;
    signature = md5(signatureString);
    merchantId = comercio[0].merchantId;
    accountId = comercio[0].accountIdPayu;
    }
    res.json({
      ok: true,
      ejemplo: comercio,
      merchantId:  merchantId,
      accountId: accountId,
      currency: comercio[0].currency,
      signature
    });
  });
});
/*=================================================
                DEVOLVER SIGNATURE
==================================================*/

app.post("/payu", (req, res) => {
  let body = req.body;

  console.log(res);
});

/*=================================================
                    MOSTRAR COMERCIOS
==================================================*/
app.get("/comercio", (req, res) => {
  Comercio.find({}).exec((err, comercios) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      comercios
    });
  });
});
/*=================================================
                    EDITAR COMERCIO
==================================================*/
app.put("/comercio/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;

  Comercio.findByIdAndUpdate(id, body, { new: true }, (err, comercioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    } else {
      res.json({ ok: true, comercio: comercioDB });
    }
  });
});
/*=================================================
                    CREAR COMERCIO
==================================================*/
app.post("/comercio", (req, res) => {
  let body = req.body;
  let comercio = new Comercio({
    pais: body.pais,
    currency: body.currency,
    merchantId: body.merchantId,
    accountIdPayu: body.accountIdPayu,
    apiKeyPayu: body.apiKeyPayu
  });
  comercio.save((err, comercio) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      message: "Comercio agregado",
      comercio: comercio
    });
  });
});

module.exports = app;

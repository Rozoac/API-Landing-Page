const express = require('express');
const fileUpload = require('express-fileupload')
const app = express();
app.use(fileUpload());

app.put('/upload', (req, res) =>{
    if(!req.files) {
        return res.status(400).json({
            ok: false,
            message: 'No se cargaron las imagenes'
        });
    }

    let archivo = req.files.img;
    let nombreArchivo = archivo.name.split('.');
    let nombre = nombreArchivo[0];
    let extension = nombreArchivo[nombreArchivo.length -1];

    //EXTENSIONES
    let extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if (extencionesValidas.indexOf(extension) < 0 ){
        return res
          .status(400)
          .json({
            ok: false,
            err: {
              message:
                "Las extensiones permitidas son " +
                extencionesValidas.join(', ')
            }
          });
    }

    let nombresito = `${nombre}-${new Date().getMilliseconds()}.${extension}`;

    archivo.mv(`uploads/contenedores/${nombresito}`, err => {
      if (err) return res.status(500).json({ ok: false, err });

      res.json({ ok: true, message: "Archivo cargado op!" });
    });
})

module.exports = app;
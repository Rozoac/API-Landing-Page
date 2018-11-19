const express = require("express");
const Arquitectonico = require("../models/arquitectonico");
const fileUpload = require("express-fileupload");
const app = express();
app.use(fileUpload());


//Mostrar todos los proyectos
app.get("/arquitectonico", (req, res) =>{

  Arquitectonico.find({estado: true}).exec((err, arquitectonicos) =>{
  if (err){
    return res.status(400).json({
      ok:false,
      err
    })
  }
  Arquitectonico.count({}, (err, contador) =>{
    res.json({
      ok:true,
      arquitectonicos,
      total: contador
    });
  })
})

})
//Buscar por id

app.get("/arquitectonico/:id", (req, res, next) => {
  var id = req.params.id;

  Arquitectonico.findById(id)
    .exec((err, arquitectonico) => {
      if (err) {
        return res
          .status(500)
          .json({
            ok: false,
            mensaje: "Error cargando proyecto arquitectonico",
            error: err
          });
      }
      if (!arquitectonico) {
        return res
          .status(400)
          .json({
            ok: false,
            mensaje: "El proyecto arquitectonico con el id " + id + " no existe",
            errors: { message: "No existe un proyecto arquitectonico con ese ID" }
          });
      }
      res.status(200).json({ ok: true, arquitectonico: arquitectonico });
    });
});

// CREAR arquitectonico
app.post("/arquitectonico", (req, res) => {
  if (!req.files) {
    return res.status(400).json({
      ok: false,
      err: {
        mensaje: "Imagenes por cargar",
      }
    });
  }
  let body = req.body;
  let plano = req.files.plano;
  let img_1 = req.files.img_1;
  let img_2 = req.files.img_2;
  let img_3 = req.files.img_3;
  

  let nombreCortado1 = plano.name.split(".");
  let nombreCortado2 = img_1.name.split(".");
  let nombreCortado3 = img_2.name.split(".");
  let nombreCortado4 = img_3.name.split(".");
  let extension = nombreCortado1[nombreCortado1.length - 1];
  let extension2 = nombreCortado2[nombreCortado2.length - 1];
  let extension3 = nombreCortado3[nombreCortado3.length - 1];
  let extension4 = nombreCortado4[nombreCortado4.length - 1];
  let nombreArchivo = `plano-${new Date().getMilliseconds()}.${extension}`;
  let nombreArchivo2 = `img-${new Date().getMilliseconds()}.${extension2}`;
  let nombreArchivo3 = `img_2-${new Date().getMilliseconds()}.${extension3}`;
  let nombreArchivo4 = `img_3-${new Date().getMilliseconds()}.${extension4}`;
  

  // let arquitectonico = new Arquitectonico(req.body);

  for (var key in req.files) {
    thisFile = req.files[key];
    console.log(req.files[key].name);
    // thisFile.mv('public/images/' + req.files[key].name, function(err) {
   
    
};
   });


//   arquitectonico.save((err, arquitectonico) => {
//     if (err) {
//       return res.status(400).json({
//         ok: false,
//         err
//       });
//     }

// }


// ACTUALIZAR CONTENEDOR

app.put("/contenedor/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;

  Contenedor.findByIdAndUpdate(id, body, {new: true}, (err, contenedorDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    } else {
      res.json({ ok: true, contenedor: contenedorDB });
    }
  });
});


//BORRAR UN CONTENEDOR

app.delete('/contenedor/:id',(req, res)=>{
  let id = req.params.id;
  let estado = {
    estado: false
  }

  Contenedor.findByIdAndUpdate(id, estado, {new: true}, (err, contenedorDB)=>{
    if(err){
      return res.status(400).json({
        ok:false,
        err
      });
    }

    if (!contenedorDB) {
      return res
        .status(401)
        .json({
          ok: false,
          err: {
            message: "Contenedor no existe IDIOTA!!!!!"
          }

        });
    }

    res.json({
      ok: true,
      message: `el contenedor ${contenedorDB.nombre} a sido eliminado `
    });
    
  })
})

module.exports = app;


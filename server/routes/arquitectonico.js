const express = require("express");
const Arquitectonico = require("../models/arquitectonico");
const fileUpload = require("express-fileupload");
const app = express();
// app.use(fileUpload());


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

  Contenedor.findById(id)
    .exec((err, contenedor) => {
      if (err) {
        return res
          .status(500)
          .json({
            ok: false,
            mensaje: "Error cargando contenedor",
            error: err
          });
      }
      if (!contenedor) {
        return res
          .status(400)
          .json({
            ok: false,
            mensaje: "El contenedor con el id " + id + " no existe",
            errors: { message: "No existe un contenedor con ese ID" }
          });
      }
      res.status(200).json({ ok: true, contenedor: contenedor });
    });
});

// CREAR CONTENEDOR
app.post("/contenedor", (req, res) => {
  if (!req.files.img) {
    return res.status(400).json({
      ok: false,
      err: {
        mensaje: "Imagenes por cargar",
      }
    });
  }
  console.log(req.body);
  let body = req.body;
  let img = req.files.img;
  let nombreCortado = img.name.split(".");
  let extension = nombreCortado[nombreCortado.length - 1];

  let extensionesValidas = ["png", "jpg", "gif", "jpeg"];

  if (extensionesValidas.indexOf(extension) < 0) {
    return res
      .status(400)
      .json({
        ok: false,
        err: {
          message:
            "Las extensiones permitidas son " + extensionesValidas.join(", "),
          ext: extension
        }
      });
  }

  let prueba = body.nombre.toLowerCase().replace(/\s/g, "-");
  let nombreArchivo = `${prueba}-${new Date().getMilliseconds()}.${extension}`;

  

  let contenedor = new Contenedor({
    nombre: body.nombre,
    descripcion: body.descripcion,
    subtitulo: body.subtitulo,
    img: nombreArchivo,    
    estado: body.estado ,
    pais: body.pais | "Colombia",
    tipo: body.tipo
  });

  contenedor.save((err, contenedor) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    img.mv(`uploads/contenedores/${nombreArchivo}`, err => {
      if (err) return res.status(500).json({ ok: false, err });

      res.json({ 
        ok: true, 
        message: "Archivo cargado op!",
      contenedor: contenedor });
    });

    
  });
});

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


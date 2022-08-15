var express = require('express');
var router = express.Router();
let todasLasPeliculasModel= require("../../models/zonaAdmin")


/* GET home page. */
router.get('/', async function(req, res, next) {

let titulosYSinopsis = await todasLasPeliculasModel.todasLasPeliculas()


  res.render('admin/admin', {
    layout: "admin/layout",
    nombre: req.session.nombre,
    title: "Zona de administracion",
    email: req.session.email,
    titulosYSinopsis
  });
});

router.get("/salir", function (req, res){
  req.session.destroy();
  res.render("login",{
    layout: "admin/layout"
  })
})
router.get("/agregar", function (req, res){
  res.render("admin/agregar",{
    layout: "admin/layout"
  })
})





router.post("/agregar", async function(req, res, next) {
  console.log(req.body)
try{


  if(req.body.titulo != "" && req.body.sinopsis != ""){
      //estos if array.isArray sirven para los checkbox
    if (Array.isArray(req.body.Plataformasparaver)) {
      req.body.Plataformasparaver = req.body.Plataformasparaver.join(',')
    }
    
    if (Array.isArray(req.body.etiquetas)) {
      req.body.etiquetas = req.body.etiquetas.join(',')
    }
    
    await todasLasPeliculasModel.agregarProducto(req.body);
    res.redirect("/admin/admin")
  } else {
    res.render("admin/agregar", {
      layout: "admin/layout",
      error: true,
      message: "todos los campos"
    })
  }
} catch (error){
  console.log(error)
  res.render("admin/agregar", {
    layout: "admin/layout",
    error: true,
    message: "no se cargo"
  })
}
})

router.get("/eliminar/:id", async(req, res, next) =>{
  let id = req.params.id;
  await todasLasPeliculasModel.borrar(id);
  res.redirect("/admin/admin")
})

router.get("/editar/:id", async (req, res, next) =>{
  const plataformas = [
    'hbo_max',
    'disney_plus',
    'amazon_Prime',
    'netflix',
    'cuevana'
  ]

  const etiquetas = [
    'aventura',
    'accion',
    'misterio',
    'terror',
    'suspenso',
  ]



  let id = req.params.id;
  let producto = await todasLasPeliculasModel.actualizar(id)
  producto.Plataformasparaver = producto.Plataformasparaver.split(',')
  producto.plataformas = {};
  plataformas.forEach(plataforma => {
    if (producto.Plataformasparaver.includes(plataforma)) {
      producto.plataformas[plataforma] = true;
    } else {
      producto.plataformas[plataforma] = false;
    }
  })
  producto.etiquetas_arr = producto.etiquetas.split(',')
  producto.etiquetas = {};
  etiquetas.forEach(etiqueta => {
    if (producto.etiquetas_arr.includes(etiqueta)) {
      producto.etiquetas[etiqueta] = true;
    } else {
      producto.etiquetas[etiqueta] = false;
    }
  })

  producto.estreno = `${producto.estreno.toISOString().substring(0,10)} ${producto.estreno.toISOString().substring(11,16)}`;
  
  res.render("admin/editar", {
    layout: "admin/layout",
    producto
  })
})

router.post("/editar", async (req, res, next) => {
  if (Array.isArray(req.body.Plataformasparaver)) {
    req.body.Plataformasparaver = req.body.Plataformasparaver.join(',')
  }
  
  if (Array.isArray(req.body.etiquetas)) {
    req.body.etiquetas = req.body.etiquetas.join(',')
  }

  try{
    let obj = {
      titulo: req.body.titulo,
      sinopsis: req.body.sinopsis,
      estrellas: req.body.estrellas,
      trailer: req.body.trailer,
      Plataformasparaver: req.body.Plataformasparaver,
      etiquetas: req.body.etiquetas
    }
    console.log(obj)
    await todasLasPeliculasModel.modificarecho(obj, req.body.id);
    res.redirect("/admin/admin");
  }
  catch(error){
    console.log(error)
    res.render("admin/editar",{
      layout: "admin/layout",
      error: true,
      message:"no se pudo editar"
    })
  }
})



module.exports = router;


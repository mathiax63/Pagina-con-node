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
try{
  if(req.body.titulo != "" && req.body.sinopsis != "" && req.body.etiquetas != ""){
    await todasLasPeliculasModel.agregarProducto(req.body);
    res.redirect("/admin/agregar")
  } else {
    res.render("admin/agregar", {
      layout: "admin/layout",
      error: true,
      message: "todos los campos"
    })
  }
} catch (error){
  console.log("admin/agregar", {
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
  let id = req.params.id;
  console.log(req.params.id);
  let producto = await todasLasPeliculasModel.actualizar(id)
  console.log(req.params.id)
  res.render("admin/editar", {
    layout: "admin/layout",
    producto
  })
})

router.post("/editar", async (req, res, next) =>{
  try{
    let obj = {
      titulo: req.body.titulo,
      sinopsis: req.body.sinopsis,
      estrellas: req.body.estrellas,
      trailer: req.body.trailer
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

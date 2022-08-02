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

router.post("/agregar", async(req, res, next) =>{
try{
  if(req.body.Titulo != "" && req.body.Sinopsis != "" && req.body.casilla != ""){
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

module.exports = router;

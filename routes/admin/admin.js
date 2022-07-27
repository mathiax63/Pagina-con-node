var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/admin', {
    layout: "admin/layout",
    nombre: req.session.nombre,
    title: "Zona de administracion",
    email: req.session.email
  });
});

router.get("/salir", function (req, res){
  req.session.destroy();
  res.render("login",{
    layout: "admin/layout"
  })
})

module.exports = router;

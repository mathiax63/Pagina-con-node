var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let session = require("express-session")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var todosRouter = require('./routes/todasP');
var especificoRouter = require('./routes/detalle');
var plataformaRouter = require('./routes/plataformas');
let adminRouter = require("./routes/admin/agregar")


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:"asdwadgtvbvcjkebytsk",
  resave: false,
  saveUninitialized: true
}));


app.get("/admin/agregar",function (req, res){
  var conocido = Boolean(req.session.nombre);
//console.log("estoy?"+conocido)
  res.render("admin/agregar", {
    title: "Zona de administracion",
    conocido: conocido,
    nombre: req.session.nombre,
    email: req.session.email
  })
})

app.post("/ingresar", function (req, res){
  //console.log("estoy?"+conocido)
if(req.body.email){
    req.session.email = req.body.email
  }


  if(req.body.nombre){
    req.session.nombre = req.body.nombre
  }
  res.redirect("admin/agregar");
})





app.get("/salir", function (req, res){
  req.session.destroy();
  res.redirect("/")
})




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', loginRouter);
app.use('/todasLasPeliculas', todosRouter);
app.use('/detalle', especificoRouter);
app.use('/paginasParaVer', plataformaRouter);
app.use("/admin/agregar", adminRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

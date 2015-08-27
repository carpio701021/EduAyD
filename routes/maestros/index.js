var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('maestros/index', { nombre_usuario: 'Aqui el nombre usuario' });
	
});

/* GET Asignacion de tareas */
router.get('/asignar_tarea/', function(req, res, next) {
	res.render('maestros/asignar_tarea', { nombre_usuario: 'Aqui el nombre usuario' });
});

/* GET ingresar notas */
router.get('/ingresar_notas/', function(req, res, next) {
	res.render('maestros/ingresar_notas', { nombre_usuario: 'Aqui el nombre usuario' });	
});

module.exports = router;

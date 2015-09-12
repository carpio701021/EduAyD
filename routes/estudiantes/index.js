var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('estudiantes/index', { nombre_usuario: 'Aqui el nombre usuario' });
	
});

/* GET notas page. */
router.get('/notas', function(req, res, next) {
	res.render('estudiantes/notas', { nombre_usuario: 'Aqui el nombre usuario' });
	
});

/* GET subir_tarea page. */
router.get('/subir_tarea', function(req, res, next) {
	res.render('estudiantes/subir_tarea', { nombre_usuario: 'Aqui el nombre usuario' });
	
});





module.exports = router;

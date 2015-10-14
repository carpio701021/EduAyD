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


/* POST sumar notas page. */
router.get('/notas/sumar_notas', function(req, res, next) {
	res.send(sumar_notas(req.body.list_notas));
});


function sumar_notas(list_notas){
	var suma = 0;
	for(nota in list_notas){
		suma += list_notas[nota];
	}
	return suma;
}

/* GET subir_tarea page. */
router.get('/subir_tarea', function(req, res, next) {
//	var carnet_estudiante = req.body.
	var cursos_por_estudiante_f = function(cursos_por_estudiante){
		res.render('estudiantes/subir_tarea', { 
			nombre_usuario: 'Luis Eduardo' ,
			cursos_por_estudiante: cursos_por_estudiante[0]
		});	
	}
	var dbconnection = require('../../routes/dbconnection.js');
    var str_query = 'call eduaydre.sp_get_cursos_por_estudiante_from_estudiantes(1, 1);';	

	dbconnection.exe_query(
			str_query, 
			cursos_por_estudiante_f,
			res);
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('estudiantes/index', { nombre_usuario: 'Aqui el nombre usuario' });
	
});

/* GET notas page. */
router.get('/notas', function(req, res, next) {

	var recursos_notas = function(cursos_del_estudiante){
		res.render('estudiantes/notas', { 
			nombre_usuario: 'Luis Eduardo' ,
			cursos: cursos_del_estudiante[0]
		});	
	}
	var dbconnection = require('../../routes/dbconnection.js');
	var str_query = 'CALL sp_get_cursos_ciclos_from_estudiante(1,1);'; //estudiante,ciclo

	dbconnection.exe_query(
			str_query, 
			recursos_notas,
			res);
});

/* GET notas page. */
router.post('/notas/cargar_tabla_notas', function(req, res, next) {

	var recursos_notas = function(cursos_del_estudiante){
		res.render('estudiantes/notas', { 
			nombre_usuario: 'Luis Eduardo' ,
			cursos: cursos_del_estudiante[0]
		});	
	}
	var dbconnection = require('../../routes/dbconnection.js');
	var str_query = 'CALL sp_get_cursos_ciclos_from_estudiante(1,1);'; //estudiante,ciclo

	dbconnection.exe_query(
			str_query, 
			recursos_notas,
			res);
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
	res.render('estudiantes/subir_tarea', { nombre_usuario: 'Aqui el nombre usuario' });
	
});





module.exports = router;

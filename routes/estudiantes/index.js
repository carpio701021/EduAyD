var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (!(req.user_session && req.user_session.tipo == '2')){
		res.redirect('/login?error=debe iniciar sesion primero');
		return;
	}
	res.render('estudiantes/index', { nombre_usuario: req.user_session.usuario });
	
});

router.get('/calendario', function(req, res, next) {
	if (!(req.user_session && req.user_session.tipo == '2')){
		res.redirect('/login?error=debe iniciar sesion primero');
		return;
	}

	//sp_get_tareas_para_calendario(carnet, ciclo, unidad)
	var actividades_horario = function(actividades){
		res.render('estudiantes/calendario', { 
			nombre_usuario: req.user_session.usuario ,
			actividades: actividades[0]
		});	
	}
	var dbconnection = require('../../routes/dbconnection.js');
	var str_query = 'CALL sp_get_tareas_para_calendario('+req.user_session.id+',1,1);'; //estudiante,ciclo

	dbconnection.exe_query(
			str_query, 
			actividades_horario,
			res);
	
});
/* GET notas page. */
router.get('/notas', function(req, res, next) {
	if (!(req.user_session && req.user_session.tipo == '2')){
		res.redirect('/login?error=debe iniciar sesion primero');
		return;
	}

	var recursos_notas = function(cursos_del_estudiante){
		res.render('estudiantes/notas', { 
			nombre_usuario: req.user_session.usuario ,
			cursos: cursos_del_estudiante[0]
		});	
	}
	var dbconnection = require('../../routes/dbconnection.js');
	var str_query = 'CALL sp_get_cursos_ciclos_from_estudiante('+req.user_session.id+',1);'; //estudiante,ciclo

	dbconnection.exe_query(
			str_query, 
			recursos_notas,
			res);
});

/* POST tabla de notas page. */
router.post('/notas/cargar_tabla_notas', function(req, res, next) {
	if (!(req.user_session && req.user_session.tipo == '2')){
		res.redirect('/login?error=debe iniciar sesion primero');
		return;
	}
	var recursos_notas = function(cursos_del_estudiante){
		console.log(cursos_del_estudiante[0]);
		res.json(
			cursos_del_estudiante[0]
		);	
	}
	var dbconnection = require('../../routes/dbconnection.js');
	var str_query = 'CALL sp_get_notas_from_estudiante_curso_ciclo('+
		req.user_session.id+','+
		req.body.curso + ',' +
		req.body.ciclo + ',' +
		req.body.unidad +
		');'; //carnet,curso,ciclo,unidad

	dbconnection.exe_query(
			str_query, 
			recursos_notas,
			res);
});




/* POST sumar notas page. */
router.get('/notas/sumar_notas', function(req, res, next) {
	if (!(req.user_session && req.user_session.tipo == '2')){
		res.redirect('/login?error=debe iniciar sesion primero');
		return;
	}
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
	if (!(req.user_session && req.user_session.tipo == '2')){
		res.redirect('/login?error=debe iniciar sesion primero');
		return;
	}
	var recursos_notas = function(cursos_del_estudiante){
		res.render('estudiantes/subir_tarea', { 
			nombre_usuario: req.user_session.usuario ,
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

router.get('/subir_tarea/cargar_tareas', function(req, res, next) {
	var recursos_actividades= function(actividades){		
		console.log(actividades);
		var opciones="";
		for(var e in actividades[0]){		
			opciones+="<option value="+actividades[0][e].tarea +">"+actividades[0][e].descripcion+"</option>";
		}		
		console.log("opciones");
		console.log(opciones);
		res.send(opciones);
	}
	
	var p_curso = req.query['curso']+"";
	var p_seccion = req.query['seccion']+"";	
	var p_ciclo = req.query['ciclo']+"";	
	var p_unidad = req.query['unidad']+"";	

	var dbconnection = require('../../routes/dbconnection.js');
    var str_query = 'CALL sp_get_tareas_curso_seccion_ciclo_unidad('+p_ciclo+','+p_curso+','+p_seccion+','+p_unidad+');';	
	console.log("pito");
	dbconnection.exe_query(
			str_query, 
			recursos_actividades,
			res);
	
});




module.exports = router;

var multer = require('multer');
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '../uploads_from_server/')
	},
	filename: function (req, file, cb) {
		cb(null, "[" + file.fieldname + '-' + Date.now() + "]" + file.originalname)
	}
});
var upload = multer ({ storage : storage });
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('maestros/index', { nombre_usuario: 'Aqui el nombre usuario' });
	
});

/* GET Asignacion de tareas */
router.get('/asignar_tarea/', function(req, res, next) {
	
	var recursos_asigna_tarea = function(tipo_tarea){

		var recursos_asigna_tarea1 = function(cursos_del_maestro){
			res.render('maestros/asignar_tarea', { 
				nombre_usuario: 'Luis Eduardo' , 
				cursos: cursos_del_maestro[0],
				tipos_tarea: tipo_tarea[0]
			} );
			console.log("cursos: "+ JSON.stringify(cursos_del_maestro));
			console.log("tipos_tarea: "+ JSON.stringify(tipo_actividad));
		}

		//llamada al objeto base de datos
		var dbconnection = require('../../routes/dbconnection.js');
		var str_query = 'CALL sp_get_cursos_ciclos_from_maestro(1,1);'; //maestro,ciclo
		//(  myquery , callback_to_query_parameters , callback_to_query , if_error , res){
		dbconnection.exe_query(
			str_query, 
			recursos_asigna_tarea1,
			res);
	}

    //llamada al objeto base de datos
    var dbconnection = require('../../routes/dbconnection.js');
    var str_query = 'select * from tarea_tipo;';
    //(  myquery , callback_to_query_parameters , callback_to_query , if_error , res){
    dbconnection.exe_query(
    	str_query, 
    	recursos_asigna_tarea,
		res);


});

//router.post('/asignar_tarea/guardar_tarea', function(req, res, next) {
//	
//	var p_unidad = 1 ;
//	var p_tipo_tarea = req.body.tipo_tarea  ;
//	var p_ciclo =  ;
//	var p_maestro =  ;
//	var p_curso = req.body.curso.curso ;
//	var p_seccion = req.body.curso.seccion ;
//	var p_es_examen =  ;
//	var p_descripcion = req.body.descripcion ;
//
//	var direccion_archivo_actividad = "" ;
//	var part_direccion_archivo = req.body.archivoAdjuntoT.split('\\');
//	for(part part_direccion_archivo)
//		direccion_archivo_actividad+=part_direccion_archivo[part] + "/";
//
//	var p_ruta_archivo = direccion_archivo_actividad ;
//	var p_ponderacion =  ;
//	var p_fecha_limite = req.body.fyh_year + '-' + req.body.fyh_month + '-' + req.body.fyh_day + ' ' + req.body.fyh_hr + ':' + req.body.fyh_min ;
//	var p_toleraciona =  ;
//	var p_tiempo_tolerancia =  ;
//	var p_porcentaje_tolerancia =  ;
//	var p_aprobada =  ;
//
//
//	//var send = fecha_inicio_actividad;
//	//console.log(send);
//	//res.send(send);
//	//return;
//
//	//falta guardar
//	var curso = req.body.curso;
//	var poneracion = req.body.ponderacion;
//
//	vargresar_actividad= function(cursos_del_maestro){
//		res.render('maestros/#tarea guardada exitosamente', { 
//			nombre_usuario: 'Luis Eduardo' ,
//		});	
//	}
//	var dbconnection = require('../../routes/dbconnection.js');
//	var str_query = 'CALL sp_insert_tarea_from_maestro('
//		+'in p_unidadt, '
//		+'in p_tipo_tareat, '
//		+'in p_ciclot, '
//		+'in p_maestrot, '
//		+'in p_cursot, '
//		+'in p_secciont, '
//		+'in p_es_exament, '
//		+'in p_descripcion text, '
//		+'in p_ruta_archivo text, '
//		+'in p_ponderaciont, '
//		+'in p_fecha_limite datetime, '
//		+'in p_toleraciona tinyint, '
//		+'in p_tiempo_tolerancia datetime, '
//		+'in p_porcentaje_toleranciat, '
//		+'in p_aprobada tinyint);';
//
//    var str_query = 'CALLgresarActividad`('+
//		'\'' + nombre_actividad  + '\'' + ',' + 
//		'\'' + descripcion_actividad  + '\'' + ',' + 
//		'\'' + direccion_archivo_actividad  + '\'' + ',' + 
//		'\'' + fecha_inicio_actividad  + '\'' + ',' + 
//		'\'' + fecha_fin_actividad  + '\'' + ',' + 
//		'\'' + tipoActividad  + '\');' ;
//
//	dbconnection.exe_query(
//			str_query, 
//			ingresar_actividad,
//			res);
//});


router.post('/asignar_tarea/subir_archivo/', upload.single('archivo_tarea') , function (req, res, next) {
	// req.file is the `avatar` file
	// req.body will hold the text fields, if there were any
	console.log("Archivo subido: " + req.file.path );
	res.send(req.file.path);
});

/* GETgresar notas */
router.get('/ingresar_notas/', function(req, res, next) {

	var recursos_ingresar_notas= function(cursos_del_maestro){
		res.render('maestros/ingresar_notas', { 
			nombre_usuario: 'Luis Eduardo' ,
			cursos: cursos_del_maestro
		});	
	}
	var dbconnection = require('../../routes/dbconnection.js');
    var str_query = 'select c.id_curso,c.nombre_curso from Maestro_x_curso,Curso c where MAESTRO_id_maestro = 1 and c.id_curso = CURSO_id_curso;';	

	dbconnection.exe_query(
			str_query, 
			recursos_ingresar_notas,
			res);
});

router.post('/ingresar_notas/cargar_tabla/', function(req, res, next) {
	var recursos_ingresar_notas= function(cursos_del_maestro){
		console.log(cursos_del_maestro);
		res.send(cursos_del_maestro);
	}

	var dbconnection = require('../../routes/dbconnection.js');
    var str_query = 'select c.id_curso,c.nombre_curso from Maestro_x_curso,Curso c where MAESTRO_id_maestro = 1 and c.id_curso = CURSO_id_curso;';	

	dbconnection.exe_query(
		str_query, 
		recursos_ingresar_notas,
		res
	);
});



module.exports = router;

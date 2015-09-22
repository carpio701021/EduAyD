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
				tipos_tarea: tipo_tarea
			} );
			console.log("cursos: "+ JSON.stringify(cursos_del_maestro));
			console.log("tipos_tarea: "+ JSON.stringify(tipo_tarea));
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

router.post('/asignar_tarea/guardar_tarea', function(req, res, next) {
	
	var p_unidad = 1 ;
	var p_tipo_tarea = req.body.tipo_tarea  ;
	var p_ciclo =  1;
	var p_maestro =  1;
	//console.log( JSON.parse(req.body.curso).curso ) ;
	var p_curso = JSON.parse( req.body.curso ).curso;
	var p_seccion = JSON.parse( req.body.curso ).seccion;
	var p_es_examen = '0' ;
	var p_descripcion = req.body.descripcion ;

	var direccion_archivo_actividad = "" ;
	var part_direccion_archivo = req.body.archivoAdjuntoT.split('\\');
	for(part in part_direccion_archivo)
		direccion_archivo_actividad+=part_direccion_archivo[part] + "/";

	var p_ruta_archivo = direccion_archivo_actividad ;
	var p_ponderacion = req.body.ponderacion ;
	var p_fecha_limite = req.body.fyh_year + '-' + req.body.fyh_month + '-' + req.body.fyh_day + ' ' + req.body.fyh_hr + ':' + req.body.fyh_min ;
	var p_toleraciona = 1 ;
	var p_tiempo_tolerancia = p_fecha_limite ;
	var p_porcentaje_tolerancia = 0 ;
	var p_aprobada = 0 ;


	//var send = fecha_inicio_actividad;
	//console.log(send);
	//res.send(send);
	//return;

	ingresar_actividad= function(cursos_del_maestro){
		res.render('maestros/', { 
			nombre_usuario: 'Luis Eduardo #exito' ,
		});	
	}
	var dbconnection = require('../../routes/dbconnection.js');
	var str_query = 'CALL sp_insert_tarea_from_maestro('
		+ p_unidad  + ','
		+ p_tipo_tarea + ','
		+ p_ciclo + ','
		+ p_maestro + ','
		+ p_curso + ','
		+ p_seccion + ','
		+ p_es_examen + ','
		+ "'" + p_descripcion + "'"  + ','
		+ "'" + p_ruta_archivo + "'"  + ','
		+ p_ponderacion + ','
		+ "'" + p_fecha_limite + "'"  + ','
		+ p_toleraciona + ','
		+ "'" + p_tiempo_tolerancia + "'"  + ','
		+ p_porcentaje_tolerancia + ','
		+ p_aprobada  + ');'
		;

	dbconnection.exe_query(
			str_query, 
			ingresar_actividad,
			res);
});


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

router.get('/planificar_unidad/', function(req, res, next) {

	
	var recursos_planificar= function(cursos_del_maestro){

		var recursos_planificar2= function(unidades){
			res.render('maestros/planificar_unidad', { 
				nombre_usuario: 'Luis Eduardo' ,
				cursos: cursos_del_maestro[0],
				unidades: unidades
			});	
		}
		var dbconnection = require('../../routes/dbconnection.js');
	    var str_query = 'select * from unidad;'; //maestro,ciclo

		dbconnection.exe_query(
				str_query, 
				recursos_planificar2,
				res);
		
	}

	var dbconnection = require('../../routes/dbconnection.js');
    var str_query = 'CALL sp_get_cursos_ciclos_from_maestro(1,1);'; //maestro,ciclo

	dbconnection.exe_query(
			str_query, 
			recursos_planificar,
			res);
});

router.get('/examenes/', function(req, res, next) {

	var recursos_examenes= function(cursos_del_maestro){		
		res.render('maestros/supervision_examen', { 
			nombre_usuario: 'Luis Eduardo' ,
			cursos: cursos_del_maestro[0]
		});	
	}

	var dbconnection = require('../../routes/dbconnection.js');
    var str_query = 'CALL sp_get_cursos_ciclos_from_maestro(1,1);'; //maestro,ciclo

	dbconnection.exe_query(
			str_query, 
			recursos_examenes,
			res);
	});


router.get('/examenes/cargar_examenes', function(req, res, next) {

	var recursos_examenes= function(examenes){		
		var opciones="";
		for(var e in examenes[0]){		
			opciones+="<option value="+examenes[0][e].tarea +">"+examenes[0][e].descripcion+"</option>";
		}		

		res.send(opciones);
	}

	var ciclo=req.query['ciclo'] +"";
	var cur= req.query['curso']+"";
	var maestro= req.query['maestro']+"";	

	var dbconnection = require('../../routes/dbconnection.js');
    var str_query = "CALL eduaydre.get_examenes_maestro_curso("+ciclo+","+cur+","+maestro+");"; //maestro,ciclo
	
	dbconnection.exe_query(
			str_query, 
			recursos_examenes,
			res);
	});

router.post('/examenes/enviar', function(req, res, next) {
	
	var p_unidad = 1 ;
	var p_tipo_tarea = 1  ;
	var p_ciclo =  1;
	var p_maestro =  1;
	//console.log( JSON.parse(req.body.curso).curso ) ;
	var p_curso = JSON.parse( req.body.curso ).curso;
	var p_seccion = JSON.parse( req.body.curso ).seccion;
	var p_es_examen = '1' ;
	var p_descripcion = req.body.descripcion ;

	var direccion_archivo_actividad = "" ;
	var part_direccion_archivo = req.body.archivoAdjuntoT.split('\\');
	for(part in part_direccion_archivo)
		direccion_archivo_actividad+=part_direccion_archivo[part] + "/";

	var p_ruta_archivo = direccion_archivo_actividad ;
	var p_ponderacion = req.body.ponderacion ;
	var p_fecha_limite = req.body.fyh_year + '-' + req.body.fyh_month + '-' + req.body.fyh_day + ' ' + req.body.fyh_hr + ':' + req.body.fyh_min ;
	var p_toleraciona = 1 ;
	var p_tiempo_tolerancia = p_fecha_limite ;
	var p_porcentaje_tolerancia = 0 ;
	var p_aprobada = 0 ;


	//var send = fecha_inicio_actividad;
	//console.log(send);
	//res.send(send);
	//return;

	ingresar_actividad= function(cursos_del_maestro){
		/*res.redirect('/maestros/', { 
			nombre_usuario: 'Luis Eduardo #exito' ,
		});			*/

		res.writeHead(302, { 'Location': '/maestros/examenes' //add other headers here... 
							}); 
		res.end();
	}
	var dbconnection = require('../../routes/dbconnection.js');
	var str_query = 'CALL sp_insert_tarea_from_maestro('
		+ p_unidad  + ','
		+ p_tipo_tarea + ','
		+ p_ciclo + ','
		+ p_maestro + ','
		+ p_curso + ','
		+ p_seccion + ','
		+ p_es_examen + ','
		+ "'" + p_descripcion + "'"  + ','
		+ "'" + p_ruta_archivo + "'"  + ','
		+ p_ponderacion + ','
		+ "'" + p_fecha_limite + "'"  + ','
		+ p_toleraciona + ','
		+ "'" + p_tiempo_tolerancia + "'"  + ','
		+ p_porcentaje_tolerancia + ','
		+ p_aprobada  + ');'
		;

	dbconnection.exe_query(
			str_query, 
			ingresar_actividad,
			res);
});

router.get('/planificar_unidad/cargar_unidades', function(req, res, next) {

	var recursos_examenes= function(examenes){		
		var opciones="";
		for(var e in examenes[0]){		
			opciones+="<option value="+examenes[0][e].tarea +">"+examenes[0][e].descripcion+"</option>";
		}		

		res.send(opciones);
	}

	var ciclo=req.query['ciclo'] +"";
	var cur= req.query['curso']+"";
	var maestro= req.query['maestro']+"";	

	var dbconnection = require('../../routes/dbconnection.js');
    var str_query = "CALL eduaydre.get_examenes_maestro_curso("+ciclo+","+cur+","+maestro+");"; //maestro,ciclo
	
	dbconnection.exe_query(
			str_query, 
			recursos_examenes,
			res);
	});


module.exports = router;

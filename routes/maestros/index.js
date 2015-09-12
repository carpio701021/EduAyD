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
	
	var recursos_asigna_tarea = function(tipo_actividad){

		var recursos_asigna_tarea1 = function(cursos_del_maestro){
			res.render('maestros/asignar_tarea', { 
				nombre_usuario: 'Luis Eduardo' , 
				cursos: cursos_del_maestro,
				tipos_actividad: tipo_actividad
			} );
		}

		//llamada al objeto base de datos
		var dbconnection = require('../../routes/dbconnection.js');
		var str_query = 'CALL seccionCursoGrado('+1+');';
		//(  myquery , callback_to_query_parameters , callback_to_query , if_error , res){
		dbconnection.exe_query(
			str_query, 
			recursos_asigna_tarea1,
			res);
	}

    //llamada al objeto base de datos
    var dbconnection = require('../../routes/dbconnection.js');
    var str_query = 'SELECT * FROM eduayd1.tipo_actividad;';
    //(  myquery , callback_to_query_parameters , callback_to_query , if_error , res){
    dbconnection.exe_query(
    	str_query, 
    	recursos_asigna_tarea,
		res);


});

router.post('/asignar_tarea/guardar_tarea', function(req, res, next) {
	var nombre_actividad = req.body.nombre_actividad;
	var descripcion_actividad = req.body.descripcion ;
	var direccion_archivo_actividad = "" ;
	var part_direccion_archivo = req.body.archivoAdjuntoT.split('\\');
	for(part in part_direccion_archivo)
		direccion_archivo_actividad+=part_direccion_archivo[part] + "/";
	var fecha_inicio_actividad = req.body.fyh_day + '-' + req.body.fyh_month + '-' + req.body.fyh_year ;
	var fecha_fin_actividad =fecha_inicio_actividad ;
	var tipoActividad = req.body.tipo_actividad ;

	//var send = fecha_inicio_actividad;
	//console.log(send);
	//res.send(send);
	//return;

	//falta guardar
	var curso = req.body.curso;
	var poneracion = req.body.ponderacion;

	var ingresar_actividad= function(cursos_del_maestro){
		res.render('maestros/#tarea guardada exitosamente', { 
			nombre_usuario: 'Luis Eduardo' ,
		});	
	}
	var dbconnection = require('../../routes/dbconnection.js');
    var str_query = 'CALL ingresarActividad`('+
		'\'' + nombre_actividad  + '\'' + ',' + 
		'\'' + descripcion_actividad  + '\'' + ',' + 
		'\'' + direccion_archivo_actividad  + '\'' + ',' + 
		'\'' + fecha_inicio_actividad  + '\'' + ',' + 
		'\'' + fecha_fin_actividad  + '\'' + ',' + 
		'\'' + tipoActividad  + '\');' ;

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

/* GET ingresar notas */
router.get('/ingresar_notas/', function(req, res, next) {

	var recursos_ingresar_notas= function(cursos_del_maestro){
		console.log("q pedo "+cursos_del_maestro);
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
<<<<<<< HEAD
	console.log("post cargar tabla");
	var recursos_cargar_tabla= function(estudiantes_curso_seleccionado){
		console.log("Consulta: " + estudiantes_curso_seleccionado);
		var tabla="p"+req.body.curso+"<table><tr><th width=300> Estudiante</th>";
		var par=true;
		for(var e in estudiantes_curso_seleccionado){		
			if(par){
				tabla+="<tr><td>"+estudiantes_curso_seleccionado[e].nombre_estudiante + " "+estudiantes_curso_seleccionado[e].apellidos_estudiante+"</td></tr>"
				par=false;
			}else{
				tabla+="<tr class='alt'><td>"+estudiantes_curso_seleccionado[e].nombre_estudiante + " "+estudiantes_curso_seleccionado[e].apellidos_estudiante+"</td></tr>"
				par=true;
			}			
		}
		tabla+="</table>"
		res.send(tabla);
	}

	var dbconnection = require('../../routes/dbconnection.js');
    var str_query = 'select * from Estudiante;';	

	dbconnection.exe_query(
			str_query, 
			recursos_cargar_tabla,
			res);
});



router.get('/examenes/', function(req, res, next) {

	var recursos_examenes= function(cursos_del_maestro){
		res.render('maestros/examenes', { 
			nombre_usuario: 'Luis Eduardo' ,
			cursos: cursos_del_maestro
		});	
=======
	var recursos_ingresar_notas= function(cursos_del_maestro){
		console.log(cursos_del_maestro);
		res.send(cursos_del_maestro);
>>>>>>> master
	}

	var dbconnection = require('../../routes/dbconnection.js');
    var str_query = 'select c.id_curso,c.nombre_curso from Maestro_x_curso,Curso c where MAESTRO_id_maestro = 1 and c.id_curso = CURSO_id_curso;';	

	dbconnection.exe_query(
<<<<<<< HEAD
			str_query, 
			recursos_examenes,
			res);
=======
		str_query, 
		recursos_ingresar_notas,
		res
	);
>>>>>>> master
});


router.get('/planificar_unidad/', function(req, res, next) {

	var recursos_planificar= function(cursos_del_maestro){
		res.render('maestros/planificar_unidad', { 
			nombre_usuario: 'Luis Eduardo' ,
			cursos: cursos_del_maestro
		});	
	}

	var dbconnection = require('../../routes/dbconnection.js');
    var str_query = 'select c.id_curso,c.nombre_curso from Maestro_x_curso,Curso c where MAESTRO_id_maestro = 1 and c.id_curso = CURSO_id_curso;';	

	dbconnection.exe_query(
			str_query, 
			recursos_planificar,
			res);
});




module.exports = router;

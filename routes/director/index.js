var multer = require('multer');
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, '../uploads_from_server/')
	},
	filename: function(req, file, cb) {
		cb(null, "[" + file.fieldname + '-' + Date.now() + "]" + file.originalname)
	}
});
var upload = multer({
	storage: storage
});


var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'eduaydg1@gmail.com',
        pass: 'pokemon150'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
/*var mailOptions = {
    from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);

});
*/
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
/*	if (!(req.user_session && req.user_session.tipo == '1')){
		res.redirect('/login?error=debe iniciar sesion primero');
		return;
	}*/

	res.render('director/index', {
		nombre_usuario: req.user_session.usuario
	});

});

/* GET Asignacion de tareas */
router.get('/correos/', function(req, res, next) {
	/*if (!(req.user_session && req.user_session.tipo == '1')){
		res.redirect('/login?error=debe iniciar sesion primero');
		return;
	}*/		
	res.render('director/correos',{
		nombre_usuario: req.user_session.usuario
	});


});

router.post('/correos/enviar/', function(req, res, next) {
	/*if (!(req.user_session && req.user_session.tipo == '1')){
		res.redirect('/login?error=debe iniciar sesion primero');
		return;
	}*/	
	console.log("entro")
	var mailOptions = {
	    from: 'EDUAYD <eduaydg1@gmail.com>', // sender address
	    to: 'carpio701021@gmail.com', // list of receivers
	    subject: 'Prueba', // Subject line
	    text: 'multicorreo funciona nitido', // plaintext body
//	    html: '<b>Hello world ✔</b>' // html body
	};
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Mensaje enviado: ' + info.response);

	});
	res.render('director/correos',{
		nombre_usuario: req.user_session.usuario
	});


});

router.post('/asignar_tarea/guardar_tarea', function(req, res, next) {
	if (!(req.user_session && req.user_session.tipo == '1')){
		res.redirect('/login?error=debe iniciar sesion primero');
		return;
	}

	var p_unidad = 1;
	var p_tipo_tarea = req.body.tipo_tarea;
	var p_ciclo = 1;
	var p_maestro = req.user_session.id;
	//console.log( JSON.parse(req.body.curso).curso ) ;
	var p_curso = JSON.parse(req.body.curso).curso;
	var p_seccion = JSON.parse(req.body.curso).seccion;
	var p_es_examen = '0';
	var p_descripcion = req.body.descripcion;

	var direccion_archivo_actividad = "";
	var part_direccion_archivo = req.body.archivoAdjuntoT.split('\\');
	for (part in part_direccion_archivo)
		direccion_archivo_actividad += part_direccion_archivo[part] + "/";

	var p_ruta_archivo = direccion_archivo_actividad;
	var p_ponderacion = req.body.ponderacion;
	var p_fecha_limite = req.body.fyh_year + '-' + req.body.fyh_month + '-' + req.body.fyh_day + ' ' + req.body.fyh_hr + ':' + req.body.fyh_min;
	var p_toleraciona = 1;
	var p_tiempo_tolerancia = p_fecha_limite;
	var p_porcentaje_tolerancia = 0;
	var p_aprobada = 0;


	//var send = fecha_inicio_actividad;
	//console.log(send);
	//res.send(send);
	//return;

	ingresar_actividad = function(cursos_del_maestro) {
		res.render('maestros/', {
			nombre_usuario: req.user_session.usuario
		});
	}
	var dbconnection = require('../../routes/dbconnection.js');
	var str_query = 'CALL sp_insert_tarea_from_maestro(' + p_unidad + ',' + p_tipo_tarea + ',' + p_ciclo + ',' + p_maestro + ',' + p_curso + ',' + p_seccion + ',' + p_es_examen + ',' + "'" + p_descripcion + "'" + ',' + "'" + p_ruta_archivo + "'" + ',' + p_ponderacion + ',' + "'" + p_fecha_limite + "'" + ',' + p_toleraciona + ',' + "'" + p_tiempo_tolerancia + "'" + ',' + p_porcentaje_tolerancia + ',' + p_aprobada + ');';

	dbconnection.exe_query(
		str_query,
		ingresar_actividad,
		res);
});


router.post('/asignar_tarea/subir_archivo/', upload.single('archivo_tarea'), function(req, res, next) {
	// req.file is the `avatar` file
	// req.body will hold the text fields, if there were any
	console.log("Archivo subido: " + req.file.path);
	res.send(req.file.path);
});

/* GETgresar notas */
router.get('/ingresar_notas/', function(req, res, next) {
	if (!(req.user_session && req.user_session.tipo == '1')){
		res.redirect('/login?error=debe iniciar sesion primero');
		return;
	}

	var recursos_ingresar_notas = function(cursos_del_maestro) {
		res.render('maestros/ingresar_notas', {
			nombre_usuario: req.user_session.usuario,
			cursos: cursos_del_maestro[0]
		});
	}
	var dbconnection = require('../../routes/dbconnection.js');


	var str_query = 'CALL sp_get_cursos_ciclos_from_maestro('+req.user_session.id+',1);'; //maestro,ciclo
	dbconnection.exe_query(
		str_query,
		recursos_ingresar_notas,
		res);
});



router.post('/ingresar_notas/cargar_tabla/', function(req, res, next) {
	if (!(req.user_session && req.user_session.tipo == '1')){
		res.redirect('/login?error=debe iniciar sesion primero');
		return;
	}

	var p_curso = req.body.curso;
	var p_seccion = req.body.seccion;
	var p_ciclo = req.body.ciclo;
	var p_unidad = req.body.unidad;

	//console.log("curso: " + p_curso + ", seccion: " + p_seccion)

	var get_estudiantes = function(estudiantes) {
		var get_tareas = function(tareas) {
			res.json({
				estudiantes: estudiantes[0],
				tareas: tareas[0]
			});
		};

		var dbconnection = require('../../routes/dbconnection.js');
		var str_query = 'CALL sp_get_tareas_curso_seccion_ciclo_unidad(' + p_ciclo + ',' + p_curso + ',' + p_seccion + ',' + p_unidad + ');';

		dbconnection.exe_query(
			str_query,
			get_tareas,
			res
		);

	};

	var dbconnection = require('../../routes/dbconnection.js');
	var str_query = 'CALL sp_get_estudiantes_curso_seccion_ciclo(' + p_ciclo + ',' + p_curso + ',' + p_seccion + ');';

	dbconnection.exe_query(
		str_query,
		get_estudiantes,
		res
	);
});


router.post('/ingresar_notas/guardar_notas/', function(req, res, next) {
	if (!(req.user_session && req.user_session.tipo == '1')){
		res.redirect('/login?error=debe iniciar sesion primero');
		return;
	}

	console.log(req.body);
	var estudiantes = JSON.parse(req.body.estudiantes_tareas).estudiantes;
	var tareas = JSON.parse(req.body.estudiantes_tareas).tareas;
	var seccion = JSON.parse(req.body.estudiantes_tareas).curso.seccion;

	console.log('Lo que busco: ' + req.body['nota_0_1']);


	for (es in estudiantes) {
		for (ta in tareas) {

			var str_query = 'CALL sp_guardar_nota_from_maestro(' + estudiantes[es].carnet + ',' //<{in p_carnet int}>, 
				+ req.body['nota_' + es + '_' + ta] + ',' //<{in p_nota_obtenida int}>, 
				+ tareas[ta].ciclo + ',' //<{in p_ciclo int}>, 
				+ tareas[ta].curso + ',' //<{in p_curso int}>, 
				+ tareas[ta].tarea + ',' //<{in p_tarea int}>, 
				+ seccion //<{in p_seccion int}>				
				+ ');' + '\n';

			var insertar_nota = function(resultado) {
				console.log("resultado " + es + "_" + ta + ": " + resultado);
			}

			var dbconnection = require('../../routes/dbconnection.js');

			dbconnection.exe_query(
				str_query,
				insertar_nota,
				res);

		}
	}


	res.redirect('/maestros/ingresar_notas#notas guardadas exitosamente');

});

router.get('/planificar_unidad/', function(req, res, next) {
	if (!(req.user_session && req.user_session.tipo == '1')){
		res.redirect('/login?error=debe iniciar sesion primero');
		return;
	}
	
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
	var str_query = 'CALL sp_get_cursos_ciclos_from_maestro('+req.user_session.id+',1);'; //maestro,ciclo

	dbconnection.exe_query(
		str_query,
		recursos_planificar,
		res);
});

router.get('/examenes/', function(req, res, next) {
	if (!(req.user_session && req.user_session.tipo == '1')){
		res.redirect('/login?error=debe iniciar sesion primero');
		return;
	}

	var recursos_examenes = function(cursos_del_maestro) {
		res.render('maestros/supervision_examen', {
			nombre_usuario: req.user_session.usuario,
			cursos: cursos_del_maestro[0]
		});
	}

	var dbconnection = require('../../routes/dbconnection.js');
	var str_query = 'CALL sp_get_cursos_ciclos_from_maestro('+req.user_session.id+',1);'; //maestro,ciclo

	dbconnection.exe_query(
		str_query,
		recursos_examenes,
		res);
});


router.get('/examenes/cargar_examenes', function(req, res, next) {
	if (!(req.user_session && req.user_session.tipo == '1')){
		res.redirect('/login?error=debe iniciar sesion primero');
		return;
	}

	var recursos_examenes = function(examenes) {
		var opciones = "";
		for (var e in examenes[0]) {
			opciones += "<option value=" + examenes[0][e].tarea + ">" + examenes[0][e].descripcion + "</option>";
		}

		res.send(opciones);
	}

	var ciclo = req.query['ciclo'] + "";
	var cur = req.query['curso'] + "";
	var maestro = req.query['maestro'] + "";

	var dbconnection = require('../../routes/dbconnection.js');
	var str_query = "CALL eduaydre.get_examenes_maestro_curso(" + ciclo + "," + cur + "," + maestro + ");"; //maestro,ciclo

	dbconnection.exe_query(
		str_query,
		recursos_examenes,
		res);
});

router.post('/examenes/enviar', function(req, res, next) {
	
	var p_unidad = 1 ;
	var p_tipo_tarea = 1  ;
	var p_ciclo =  1;
	var p_maestro =  req.user_session.id;
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
	var maestro= req.user_session.id;	

	var dbconnection = require('../../routes/dbconnection.js');
    var str_query = "CALL eduaydre.get_examenes_maestro_curso("+ciclo+","+cur+","+maestro+");"; //maestro,ciclo
	
	dbconnection.exe_query(
			str_query, 
			recursos_examenes,
			res);
	});


module.exports = router;

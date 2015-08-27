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
		var str_query = 'SELECT * FROM maestro_x_curso,curso WHERE MAESTRO_id_maestro = 1 AND maestro_x_curso.CURSO_id_curso=curso.id_curso;';
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


router.post('/asignar_tarea/subir_archivo/', upload.single('archivo_tarea') , function (req, res, next) {
	// req.file is the `avatar` file
	// req.body will hold the text fields, if there were any
	console.log("Archivo subido: " + req.file.path );
	res.send(req.file.path);

});




module.exports = router;

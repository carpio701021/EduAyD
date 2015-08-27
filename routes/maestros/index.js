var express = require('express');
var router = express.Router();

var multer = require('multer');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, "[" + file.fieldname + '-' + Date.now() + "]" + file.originalname)
	}
});
var upload = multer ({ storage : storage });


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('maestros/index', { nombre_usuario: 'Aqui el nombre usuario' });
	
});

/* GET Asignacion de tareas */
router.get('/asignar_tarea/', function(req, res, next) {
	

	var recursos_asigna_tarea = function(dbres){
		res.send( JSON.stringify(dbres.rrows) );
		//res.render('maestros/asignar_tarea', { nombre_usuario: 'Aqui el nombre usuario' });
	}


    //llamada al objeto base de datos
    var dbconnection = require('../../routes/dbconnection.js');
	//Metodo que realiza la consulta a la base de datos y devuelve:
    var str_query = 'select 4;';
    //(  myquery , callback_to_query_parameters , callback_to_query , if_error , res){
    dbconnection.exe_query(
    	str_query, 
    	'',
    	recursos_asigna_tarea,
    	function(res){
    		res.render('index', 
    			{
    				title: 'Sin conexión a la base de datos, favor intente más tarde. <br />Si el problema persiste contacte a su proveedor de servicio.'	
    		});
		}, 
		res);


});


router.post('/asignar_tarea/subir_archivo/', upload.single('archivo_tarea') , function (req, res, next) {


	// req.file is the `avatar` file
	// req.body will hold the text fields, if there were any
	console.log("Archivo subido: " + req.file.path );
	res.send(req.file.path);

});




module.exports = router;

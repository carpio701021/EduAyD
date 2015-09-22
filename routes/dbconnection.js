var express = require('express');
var router = express.Router();

//datos de conexion de la base de datos
default_dbhost='localhost';
default_dbuser='soft';
default_dbpassword='1234';
default_db = 'eduaydre';

var if_error = function(res){
	res.render('index', 
		{
			title: 'Sin conexión a la base de datos, favor intente más tarde. <br />Si el problema persiste contacte a su proveedor de servicio.'	
	});
}

function exe_query_specific (host , user , password , database_to_use , myquery  , callback_to_query , res){

	//conexion a la base de datos que utilizaremos
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host     : host,
		user     : user,
		password : password,
		database : database_to_use
	});

	//Se conecta a la base de datos
	connection.connect(function(err){
		if(!err) {
			console.log("Database " + database_to_use + " is connected ...");  
			//Si la conexion es exitosa manda a ejecutar el query
			connection.query(myquery, function(err, rows, fields) {
				console.log('Ejecutando myquery =>' + myquery );
				if (err){
					//codigo de error
					console.log('Error al ejecutar la consulta');
					 if_error(res);
					connection.end();
				}else{
					connection.end(function(err){
						if (err){
							//codigo de error
							console.log('Error al cerrar conexion');
							if_error(res);
							connection.end();
						}else{
							console.log('Consulta exitosa');
							//Si todo sale bien ejecutamos el callback_to_query
							callback_to_query(rows);
						}

					});
				}
			});

		} else {
			console.log("Error connecting database ...");  
			if_error(res);
		}
	});

}


exports.exe_query = function(  myquery , callback_to_query , res){
	exe_query_specific (default_dbhost , 
		default_dbuser , 
		default_dbpassword , 
		default_db , 
		myquery , 
		callback_to_query , 
		res );
}
//dbstrname



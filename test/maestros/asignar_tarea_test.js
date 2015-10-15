
var test    = require('unit.js');
var express = require('express');
var app     = express();

app.get('/user', function(req, res){
	var dbconnection = require('../../routes/dbconnection.js');
    var str_query = 'insertarEstudianteXEncargado(1,1)';	

	dbconnection.exe_query(
			str_query, 
			function(respuesta){
				res.status(200).send({ name: 'tobi' });
			},
			res);
	
});

describe('Prueba de coneccion a base de datos para ingresar maestros', function(){
	  it('respond with json', function(done){
	    test.httpAgent(app)
	      .get('/user')
	      .set('Accept', 'application/json')
	      .expect('Content-Type', /json/)
	      .expect(200,{name:'0'},done)
	  })
	})


var test = require('unit.js');






describe('Learning by the example', function(){
	var recursos_ingresar_notas= function(cursos_del_maestro){
		
	}
	
});

var recursos_ingresar_notas= function(cursos_del_maestro){
	res.render('maestros/ingresar_notas', { 
		nombre_usuario: 'Luis Eduardo' ,
		cursos: cursos_del_maestro
	});	
}
var test    = require('unit.js');
var express = require('express');
var app     = express();

app.get('/user', function(req, res){
	var dbconnection = require('../../routes/dbconnection.js');
    var str_query = 'select c.id_curso,c.nombre_curso from Maestro_x_curso,Curso c where MAESTRO_id_maestro = 1 and c.id_curso = CURSO_id_curso;';	

	dbconnection.exe_query(
			str_query, 
			function(respuesta){
				res.status(200).send({ name: respuesta });
			},
			res);
	
});

describe('Prueba de coneccion a base de datos', function(){
	  it('respond with json', function(done){
	    test.httpAgent(app)
	      .get('/user')
	      .set('Accept', 'application/json')
	      .expect('Content-Type', /json/)
	      .expect(200, done);
	  })
	})

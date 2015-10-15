var test = require('unit.js');
var express = require('express');
var app = express();

app
		.get(
				'/user',
				function(req, res) {
					var dbconnection = require('../../routes/dbconnection.js');
					var str_query = "call ingresarMaestro('Lancaster', 'Melendez', 'luis.peg7@gmail.com', '1994-03-03', '54607893', 'holi123');";
					// var str_query = 'select c.id_curso,c.nombre_curso from
					// Maestro_x_curso,Curso c where MAESTRO_id_maestro = 1 and
					// c.id_curso = CURSO_id_curso;';

					dbconnection.exe_query(str_query, function(object) {
						for ( var index in object) {
							var str = (JSON.stringify(object[index]));
							break;
						}
						var resultado = '1';
						if (str.indexOf("buena") > -1) {
							resultado = '0';
						}
						res.status(200).send({
							name : resultado
						});
					}, res);

				});

describe('Prueba de coneccion a base de datos para ingresar maestros',
		function() {
			it('respond with json', function(done) {
				test.httpAgent(app).get('/user').set('Accept',
						'application/json').expect('Content-Type', /json/)
						.expect(200, {
							name : '0'
						}, done)
			})
		})

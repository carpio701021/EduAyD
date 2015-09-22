var test    = require('unit.js');
var express = require('express');
var app     = express();


describe('Prueba de suma de una lista de numeros', function(){
	  it('respond with json', function(done){
	    test.httpAgent(app)
	      .get('/notas/sumar_notas')
	      .set('Accept', 'application/json')
	      .expect('Content-Type', /json/)
	      .expect(200, done);
	  })
	})

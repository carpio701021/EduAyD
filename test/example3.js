var test    = require('unit.js');
var express = require('express');
var app     = express();

var fib = function (numero){
	if(numero<2) return 1;
	else return fib(numero-1)+fib(numero-2);
}

app.get('/user', function(req, res){
	var numero = req.query['numero'];
	var resu=fib(numero) ;
	res.status(200).send({ numero: resu })
});

describe('GET /users', function(){
	
	var resu=fib(numero) ;
	  it('respond with json', function(done){
	    test.httpAgent(app)
	      .get('/user?numero=5')
	      .set('Accept', 'application/json')
	      .expect('Content-Type', /json/)
	      .expect(200, done)
	      .contains({numero:5});
	  })
	});
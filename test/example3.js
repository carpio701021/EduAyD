var test    = require('unit.js');
var express = require('express');
var app     = express();

app.get('/user', function(req, res){
	res.status(200).send([{ name: 'tobi' },{name: 'carlos'}])
});

describe('GET /users', function(){
	
	  it('respond with json', function(done){
	    test.httpAgent(app)
	      .get('/user')
	      .set('Accept', 'application/json')
	      .expect('Content-Type', /json/)
	      .expect(200,[{ name: 'tobi' },{name: 'carlos'}],done);
	  })
	})
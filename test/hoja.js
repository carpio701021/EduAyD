var test    = require('unit.js');
var express = require('express');
var app     = express();

var fib = function (numero){
	if(numero==0) return 0;
	if(numero<2) return 1;
	else return fib(numero-1)+fib(numero-2);
}

describe('PRUEBA PARA HOJA DE TRABAJO - LAB AyD1', function(){
	it('Prueba de fibonachi', function(){
		var resu={resultado:fib(16)} ;
		test
	      .object(resu)
	        .contains({resultado:987})
	          ;
	      });
	});
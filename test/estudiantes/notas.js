var test = require('unit.js');
var calculator = require('../../scrips/Calculator.js');

describe('Sumar notas', function() {
	it('sumatoria cualquier cantidad de notas de asignaturas', function() {
		var notas_asignaturas = [ 1, 2, 3 ];
		var sum = calculator.Calc.add(notas_asignaturas);
		test.number(sum).is(6);
	});
});

describe(
		'Sacar porcentajes',
		function() {
			it(
					'sacar porcentaje para cualquier cantidad de notas: se obtiene el porcentaje de un arreglo de notas y la posicion de la nota a calcular ',
					function() {
						var notas_asignaturas = [ 5, 5, 10, 20, 10 ];
						var porcentaje_a_calcular = 1;
						var per = calculator.Calc.percent(
								porcentaje_a_calcular, notas_asignaturas);
						test.number(per).is(10);
					});
		});

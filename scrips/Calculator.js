/**
 * 
 */

var Calculator = {};

Calculator.add = function add(notas_asignaturas) {
	var tot = 0;
	var i = 0;
	for (; i < notas_asignaturas.length; i++) {
		tot += notas_asignaturas[i];
	}
	return tot;
};

Calculator.percent = function percent(porcentaje_a_calcular, notas_asignaturas) {
	var res = 0;
	var sum = sumatoria_arreglo(notas_asignaturas);
	if (sum > 0) {
		if ((!(porcentaje_a_calcular >= notas_asignaturas.lenght))
				&& porcentaje_a_calcular >= 0) {
			res = 100 * notas_asignaturas[porcentaje_a_calcular] / sum;
		}
	}
	return res;
};

function sumatoria_arreglo(notas_asignaturas) {
	var tot = 0;
	var i = 0;
	for (; i < notas_asignaturas.length; i++) {
		tot += notas_asignaturas[i];
	}
	return tot;
}

exports.Calc = Calculator;

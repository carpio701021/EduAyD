/**
 * New node file
 */

var test = require('unit.js');

describe('LogIn ...', function() {
	it('Comparacion de usuario y contrasena', function() {
		var usr = "Luis Peralta";
		var psw = "aB1234567";
		test
			.string(usr)
			.match("Luis Peralta")
		.given(example = psw)
			.string(example)
				.match('malo')
					.if(example = 'bad value')
						.error(function(){	
							example.badMethod();
						})
	});
});
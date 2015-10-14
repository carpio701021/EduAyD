var test = require('unit.js');

 function fibonacci(n){
	if(n <= 0){
		return 0;
	}
	else if(n == 1){
		return 1;

	}
	else {
		return fibonacci(n -2) + fibonacci(n-1);
	}

}


describe('Fibonacci', function() {
	it('Fibonacci de 5', function() {
		var fibonacci5 = fibonacci(5);
		test.number(fibonacci5).is(5);
	});
})





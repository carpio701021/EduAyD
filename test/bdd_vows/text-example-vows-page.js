var vows = require('vows'),
    assert = require('assert');


vows.describe('Array').addBatch({                      // Batch
    'An array': {                                      // Context
        'with 3 elements': {                           // Sub-Context
            topic: [1, 2, 3],                          // Topic

            'has a length of 3': function (topic) {    // Vow
                assert.equal(topic.length, 3);
            }
        },
        'with zero elements': {                        // Sub-Context
            topic: [],                                 // Topic

            'has a length of 0': function (topic) {    // Vow
                assert.equal(topic.length, 0);
            },
            'returns *undefined*, when `pop()`ed': function (topic) {
                assert.isUndefined(topic.pop());
            }
        }
    }
}).export(module); 


vows.describe('Escenarios Maestro ingresa notas\
').addBatch({                      // Batch
    'Escenarios:\
    ': {                                      // Context
        'Escenario 1:\
        Given: Nota maxima de tarea y nota obtenida por el usuario \
        ': {                           // Sub-Context
            maxima_posible: 25,
            obtenida_por_estudiante:20,                    // Topic

            'When: la nota obtenida es menor o igual a la maxima posible': function (maxima_posible,obtenida_por_estudiante) {    // Vow
                assert.greater(maxima_posible, obtenida_por_estudiante);
            }
        },
        'Escenario 2:\
        Given: Nota maxima de tarea y nota obtenida por el usuario\
        ': {                        // Sub-Context
            maxima_posible: 25,
            obtenida_por_estudiante:30,                          // Topic

            'When: la nota obtenida es mayor a la nota posible':  function (maxima_posible,obtenida_por_estudiante) {    // Vow
                assert.greater(obtenida_por_estudiante,maxima_posible);
            }
        }
    }
}).export(module); 
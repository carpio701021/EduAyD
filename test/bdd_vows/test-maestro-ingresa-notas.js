
var vows = require('vows'),
    assert = require('assert');

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
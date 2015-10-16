
var vows = require('vows'),
    assert = require('assert');
var calculator = 

vows.describe('Escenarios asigna tareas \
').addBatch({                      // Batch
    'Escenarios:\
    ': {                                      // Context
        'Escenario 1:\
        Given: Arreglo de ponderaciones de las actividades de un curso\
        ': {                           // Sub-Context
            topic: [10, 20, 30, 40],                          // Topic

            'When: suman 100': function (topic) {    // Vow
                
                        var tot = 0;
                        var i = 0;
                        for (; i < topic.length; i++) {
                            tot += topic[i];
                        }
                        return tot;
                    
                assert.equal(tot, 100);
            }
        },
        'Escenario 2:\
        Given: Arreglo de ponderaciones de las actividades de un curso\
        ': {                        // Sub-Context
            topic: [1,1,1,1,1],                                 // Topic

            'When: No suman 100': function (topic) {    // Vow                        
                        var tot = 0;
                        var i = 0;
                        for (; i < topic.length; i++) {
                            tot += topic[i];
                        }
                        return tot;
                assert.notEqual(tot, 100);
            }
        },
        'Escenario 3:\
        Given: Arreglo de ponderaciones de las actividades de un curso\
        ': {                        // Sub-Context
            topic: [],                                 // Topic

            'When: Viene vacio': function (topic) {    // Vow
                assert.equal(topic.length, 0);
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
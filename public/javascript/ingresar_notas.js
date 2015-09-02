function btn_guardar_cambios(){
			alert("apachaste guardar cambios"+ i1_3.value);
		}
		var prueba = function(){
			alert("hola");
		}
		function seleccionar_curso(){			
				var objeto = new XMLHttpRequest();
				var tabla;
				console.log("metodo seleccion curso");	
				objeto.onreadystatechange = function(){			
					if(objeto.readyState==4){ //ya termino de cargar proceso 
						if(objeto.status==200){ //se cargo bien similar a 404 error 200 = exito
							alert(objeto.responseText);
							tabla= JSON.stringify(objeto.responseText);
							console.log("cosas: " + tabla);	
							tabla_alumnos_asignaturas.innerHTML=tabla;
						}else{
							alert("cagadal");
						}
					}
				};			
				objeto.open('POST', '/maestros/ingresar_notas/cargar_tabla',true);
				objeto.setRequestHeader('Content-type','application/x-www-form-urlencoded');
				objeto.send();					
				console.log("metodo seleccion curso2");				
			//=seleccion_curso;	
		}
var estudiantes;
var tareas;


function seleccionar_curso(){			
	var xmlobj = new XMLHttpRequest();
	var data_to_send = '';
	data_to_send += 'curso=' + JSON.parse(curso.value).curso + '&';
	data_to_send += 'seccion=' + JSON.parse(curso.value).seccion + '&';
	data_to_send += 'ciclo=' + ciclo.value  + '&';
	data_to_send += 'unidad=' + unidad.value;

	var tabla;
	xmlobj.onreadystatechange = function(){			
		if(xmlobj.readyState==4){ //ya termino de cargar proceso 
			if(xmlobj.status==200){ //se cargo bien similar a 404 error 200 = exito
				//alert(xmlobj.responseText);
				select_cursos.style.display = "none";
				tbl_ingresar_notas.style.display = "block";
				//tabla = JSON.stringify(xmlobj.responseText);
				datos = JSON.parse(xmlobj.responseText);
				estudiantes = datos.estudiantes;
				tareas = datos.tareas;
				tabla_alumnos_asignaturas.innerHTML=generarTabla(estudiantes,tareas);
			}else{
				alert("Imposible cargar datos del curso seleccionado");
			}
		}
	};			
	xmlobj.open('POST', '/maestros/ingresar_notas/cargar_tabla',true);
	xmlobj.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlobj.send(data_to_send);					
}



function generarTabla(estudiantes,tareas){
	var ntareas = tareas.length;
	//console.log(JSON.stringify(estudiantes));
	//console.log(JSON.stringify(tareas));
	var tabla='<table class="tablanotas" size="1">';
	tabla += '<tr>';
	tabla += '<td><b>Clave</b></td>';
	tabla += '<td><b>Apellidos, Nombres</b></td>';
	for (var i=0;i<ntareas;i++){
		tabla += '<td><b>'+tareas[i].descripcion + '<br />' 
			+ tareas[i].ponderacion + '/100 pts' +'</b></td>';
	}
	tabla += '<td><b>Total<br />100 pts</b></td>';
	tabla += '</tr>';
	for(var es=0 ; es<estudiantes.length ; es++){
		tabla += '<tr>';
			tabla += '<td>' + (es + 1) +'</td>';
			tabla += '<td>' + estudiantes[es].apellido + ', ' + estudiantes[es].nombre + '</td>';
		for(var ii=0;ii<ntareas;ii++){
			tabla += '<td>'
				+'<input id="nota_'+es+'_'+ ii +'" name="nota_'+es+'_'+ ii +'" onChange="cambio_de_nota('+es+','+ii+');" '
					+'type="number" max="'+tareas[ii].ponderacion+'" min="0" value="0" class="inptxttbl" required />'
				+'</td>';
		}
		tabla += '<td><div id="p_'+es+'" >0</div></td>';
		tabla += '</tr>'
	}
	tabla += '</table>';
	tabla += '<textarea id="estudiantes_tareas" name="estudiantes_tareas" style="display:none;" > '
		+ '{"estudiantes":' + JSON.stringify(estudiantes) + ',' 
		+ '"tareas":' + JSON.stringify(tareas) + '}'
		+'</textarea>';
	//alert(tabla);
	return tabla;
}



function cambio_de_nota(nestudiante,ntarea){
	var suma = 0;
	for(ta in tareas){
		suma += parseInt(document.getElementById('nota_'+nestudiante+'_'+ta).value);
	}
	document.getElementById('p_'+nestudiante).innerHTML = suma;
	//console.log('Estudiante: '+nestudiante + ' Tarea: '+ntarea);
}
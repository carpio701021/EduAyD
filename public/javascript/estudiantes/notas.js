var asignaturas;
var notas;
var var_curso;


function seleccionar_curso(){			
	var xmlobj = new XMLHttpRequest();
	var_curso = JSON.parse(curso.value);
	var data_to_send = '';
	data_to_send += 'curso=' + JSON.parse(curso.value).curso + '&';
	data_to_send += 'ciclo=' + JSON.parse(curso.value).ciclo  + '&';
	data_to_send += 'unidad=' + unidad.value;

	var tabla;
	xmlobj.onreadystatechange = function(){			
		if(xmlobj.readyState==4){ //ya termino de cargar proceso 
			if(xmlobj.status==200){ //se cargo bien similar a 404 error 200 = exito
				//alert(xmlobj.responseText);
				select_curso.style.display = "none";
				div_show_notas.style.display = "block";
				//tabla = JSON.stringify(xmlobj.responseText);
				datos = JSON.parse(xmlobj.responseText);
				asignaturas = datos.asignaturas;
				notas = datos.notas;
				tabla_alumnos_asignaturas.innerHTML=generarTabla(asignaturas,notas);
			}else{
				alert("Imposible cargar datos del curso seleccionado");
			}
		}
	};			
	xmlobj.open('POST', '/estudiantes/notas/cargar_tabla_notas',true);
	xmlobj.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlobj.send(data_to_send);					
}



function generarTabla(asignaturas,notas){
	var nnotas = notas.length;
	var tabla='<table class="tablanotas" size="1">';
	tabla += '<tr>';
	tabla += '<td><b>Clave</b></td>';
	tabla += '<td><b>Apellidos, Nombres</b></td>';
	for (var i=0;i<nnotas;i++){
		tabla += '<td><b>'+notas[i].descripcion + '<br />' 
			+ notas[i].ponderacion + '/100 pts' +'</b></td>';
	}
	tabla += '<td><b>Total<br />100 pts</b></td>';
	tabla += '</tr>';
	for(var es=0 ; es<asignaturas.length ; es++){
		tabla += '<tr>';
			tabla += '<td>' + (es + 1) +'</td>';
			tabla += '<td>' + asignaturas[es].apellido + ', ' + asignaturas[es].nombre + '</td>';
		for(var ii=0;ii<nnotas;ii++){
			tabla += '<td>'
				+'<input id="nota_'+es+'_'+ ii +'" name="nota_'+es+'_'+ ii +'" onChange="cambio_de_nota('+es+','+ii+');" '
					+'type="number" max="'+notas[ii].ponderacion+'" min="0" value="0" class="inptxttbl" required />'
				+'</td>';
		}
		tabla += '<td><div id="p_'+es+'" >0</div></td>';
		tabla += '</tr>'
	}
	tabla += '</table>';
	tabla += '<textarea id="asignaturas_notas" name="asignaturas_notas" style="display:none;" > '
		+ '{"asignaturas":' + JSON.stringify(asignaturas) + ',' 
		+ '"notas":' + JSON.stringify(notas) + ',' 
		+ '"curso":'+JSON.stringify(var_curso)+'}'
		+'</textarea>';
	//alert(tabla);
	return tabla;
}



function cambio_de_nota(nestudiante,ntarea){
	var suma = 0;
	for(ta in notas){
		suma += parseInt(document.getElementById('nota_'+nestudiante+'_'+ta).value);
	}
	document.getElementById('p_'+nestudiante).innerHTML = suma;
	//console.log('Estudiante: '+nestudiante + ' Tarea: '+ntarea);
}
var datos;
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
				div_show_notas.innerHTML=generarTabla(datos);
			}else{
				alert("Imposible cargar datos del curso seleccionado");
			}
		}
	};			
	xmlobj.open('POST', '/estudiantes/notas/cargar_tabla_notas',true);
	xmlobj.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlobj.send(data_to_send);					
}



function generarTabla(datos){
	var tabla='<table class="tablanotas" size="1">';
	tabla += '<tr>';
	tabla += '<td><b>Tarea</b></td>';
	tabla += '<td><b>Nota</b></td>';
	tabla += '<td><b>Fecha de envío</b></td>';
	tabla += '<td><b>Fecha de calificación</b></td>';
	tabla += '<td><b>Tipo de tarea</b></td>';
	tabla += '</tr>';

	var nota_total = 0;
	for(d in datos){
		tabla += '<tr>' ;
		tabla += '<td>' + datos[d].descripcion + '</br>' + datos[d].ponderacion + '/100' + '</td>';
		tabla += '<td>' + datos[d].nota_obtenida + '</td>';
		tabla += '<td>' + (new Date(datos[d].fecha_de_envio)).toLocaleDateString() 
			+ ' ' + (new Date(datos[d].fecha_de_envio)).toLocaleTimeString() + '</td>';
		tabla += '<td>' + (new Date(datos[d].fecha_calificacion)).toLocaleDateString()  
			+ ' ' + (new Date(datos[d].fecha_calificacion)).toLocaleTimeString() + '</td>';
		tabla += '<td>' + datos[d].tipo_tarea + '</td>';
		tabla += '</tr>' ;
		nota_total += datos[d].nota_obtenida;
	}
		tabla += '<tr>';
		tabla += '<td><b>Total</b></td>';
		tabla += '<td>' + nota_total + '</td>';
		tabla += '</tr>';


	tabla += '</table>';
	return tabla;
}


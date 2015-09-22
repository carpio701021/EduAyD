window.addEventListener("load", Ready); 
function Ready(){ 
	if(window.File && window.FileReader){ //These are the relevant HTML5 objects that we are going to use 
	}else{
		UploadArea.innerHTML = "Tu navegador no soporta el API, por favor actualiza tu navegador";
	}
}

var SelectedFile;
var archivoSubido;
function autoSubirArchivo() {
	if(btnSubirArchivo.value != ''){
		info.value = btnSubirArchivo.files[0].size;
		if(btnSubirArchivo.files[0].size>5000000){
			alert('No es posible subir archivo: Excede el tamaño permitido');
			return;
		}
		adjuntarArchivo.style.display = "none";
		archivosSubidos.style.display = "block";
		SelectedFile = btnSubirArchivo.files[0];
		archivosSubidos.innerHTML = '<b>Subiendo archivo adjunto:</b> ' 
		+ btnSubirArchivo.files[0].name + " [" + btnSubirArchivo.files[0].size + " bytes]" + ' <button type="button" value="Quitar" onClick="quitarAdjunto();"/>';
		
		var xhrObj = new XMLHttpRequest();
		var formData = new FormData();
		formData.append('archivo_tarea',btnSubirArchivo.files[0],btnSubirArchivo.files[0].name);
		
		
		//xhrObj.upload.addEventListener("progress", progressFunction, false);
		xhrObj.upload.onprogress = function(e) {
		    var done = e.position || e.loaded, total = e.totalSize || e.total;
			archivosSubidos.innerHTML = '<b>Subiendo archivo adjunto:</b> ' 
				+ btnSubirArchivo.files[0].name + " [" + (Math.floor(btnSubirArchivo.files[0].size / (1024*1024))) + " MB] "  
				+ (Math.floor(done/total*1000)/10) + '%';
		
		};
		
		/*xhrObj.upload.onload=function(e){
			if(xhrObj.status==200) {
				alert("Respuesta: \n" + archivoSubido)
				archivosSubidos.innerHTML = '<b>Archivo adjunto:</b> ' + btnSubirArchivo.files[0].name + ' <input type="submit" value="Quitar" onClick="quitarAdjunto();"/>';
			}
		};*/	

		xhrObj.onreadystatechange = function(){
			if(xhrObj.readyState==4)
				if(xhrObj.status==200) {
					//acciones cuado se aya cargado la pagina
					archivoSubido = xhrObj.responseText;
					archivoAdjuntoT.value = archivoSubido;
					//alert("Respuesta: \n" + archivoSubido)
					archivosSubidos.innerHTML = '<b>Archivo adjunto:</b> ' + btnSubirArchivo.files[0].name + ' <button type="button" value="Quitar" onClick="quitarAdjunto();">Quitar</button>';
				}else{
					alert("Ocurrió un error al subir archivo");
				}
			};
		
		xhrObj.open("POST", "/maestros/asignar_tarea/subir_archivo/", true);
		
		
		xhrObj.send(formData);

	}
}

function quitarAdjunto(){
	inpfilesup = document.createElement("INPUT");
	inpfilesup.type = "file";
	btnSubirArchivo.files= inpfilesup.files;
	adjuntarArchivo.style.display = "block";
	archivosSubidos.style.display = "none";
}
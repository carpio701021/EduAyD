

exports.sumar_actividades = function(topic){
	var tot = 0;
    var i = 0;
    for (; i < topic.length; i++) {
        tot += topic[i];
    }
    return tot;	
}

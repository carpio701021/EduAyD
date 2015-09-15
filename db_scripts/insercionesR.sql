-- Un SP al que le mande el id del maestro y me devuelva las secciones que este imparte, de que curso son y el grado

DELIMITER $$
CREATE DEFINER=`soft`@`%` PROCEDURE `sp_get_cursos_ciclos_from_maestro`(in id_maestro int,in ciclo int)
BEGIN
select sccm.seccion, sccm.ciclo, sccm.curso, s.nombre 'nombre_seccion',
ci.descripcion 'descripcion_ciclo', c.nombre 'nombre_curso', g.observacion 'descripcion_grado'
from seccion_ciclo_curso_maestro as sccm, seccion as s, ciclo as ci, curso as c,
grado as g
where sccm.id_maestro=id_maestro and sccm.ciclo=ciclo and sccm.seccion=s.seccion 
and sccm.ciclo=ci.ciclo and sccm.curso=c.curso and s.grado=g.grado;
END$$
DELIMITER ;

-- Un SP que reciba como parametros el id de un curso y el ciclo y obtenga los estudiantes asignados a dicho curso. Se necesitan el id del estudiante, nombres y apellidos
DELIMITER $$
CREATE DEFINER=`soft`@`localhost` PROCEDURE `sp_get_estudiante_por_curso`(in curso int , in ciclo int)
begin
	select e.carnet, e.nombre, e.apellido from estudiante e
	inner join  estudiante_ciclo_curso ecc on e.carnet = ecc.carnet ;
end$$
DELIMITER ;



INSERT INTO `eduaydre`.`ciclo`(`ciclo`,`descripcion`,`fecha_inicio`,`fecha_fin`)VALUES(1,"Año 2015","2015-1-1","2015-12-31");


INSERT INTO `eduaydre`.`grado` (`grado`, `observacion`) VALUES ('1', '1ro Primaria');
INSERT INTO `eduaydre`.`grado` (`grado`, `observacion`) VALUES ('2', '2do Primaria');
INSERT INTO `eduaydre`.`grado` (`grado`, `observacion`) VALUES ('3', '3ro Primaria');


INSERT INTO `eduaydre`.`seccion` (`seccion`, `grado`, `nombre`) VALUES ('1', '1', 'A');
INSERT INTO `eduaydre`.`seccion` (`seccion`, `grado`, `nombre`) VALUES ('2', '1', 'B');
INSERT INTO `eduaydre`.`seccion` (`seccion`, `grado`, `nombre`) VALUES ('3', '2', 'A');
INSERT INTO `eduaydre`.`seccion` (`seccion`, `grado`, `nombre`) VALUES ('4', '2', 'B');


INSERT INTO `eduaydre`.`curso` (`grado`, `curso`, `nombre`) VALUES ('1', '1', 'Matematica 1');
INSERT INTO `eduaydre`.`curso` (`grado`, `curso`, `nombre`) VALUES ('1', '2', 'Idioma Español');
INSERT INTO `eduaydre`.`curso` (`grado`, `curso`, `nombre`) VALUES ('1', '3', 'Ciencias Naturales');
INSERT INTO `eduaydre`.`curso` (`grado`, `curso`, `nombre`) VALUES ('2', '4', 'Matemáticas 2');
INSERT INTO `eduaydre`.`curso` (`grado`, `curso`, `nombre`) VALUES ('2', '5', 'Idioma Español 2');
INSERT INTO `eduaydre`.`curso` (`grado`, `curso`, `nombre`) VALUES ('2', '6', 'Ciencias Naturales 2');


INSERT INTO `eduaydre`.`estudiante` (`carnet`, `nombre`, `apellido`, `fecha_nacimiento`, `DPI`, `telefono`) VALUES ('1', 'Benito Carmelo', 'Rico ', '1994-08-14', '2520987654321', '54643219');
INSERT INTO `eduaydre`.`estudiante` (`carnet`, `nombre`, `apellido`, `fecha_nacimiento`, `DPI`, `telefono`) VALUES ('2', 'Luis Eduardo', 'Peralta', '1993-04-02', '135135103163', '54236289');
INSERT INTO `eduaydre`.`estudiante` (`carnet`, `nombre`, `apellido`, `fecha_nacimiento`, `DPI`, `telefono`) VALUES ('3', 'Melisa', 'Reyes', '1995-02-07', '24521461643', '54679832');


INSERT INTO `eduaydre`.`maestro` (`id_maestro`, `nombre`, `apellido`, `fecha_naciemiento`, `sexo`, `DPI`, `telefono`, `celular`) VALUES ('1', 'Luis Eduardo', 'Peralta Martinez', '1724-06-07', '1', '6543837465904', '65473892', '12345678');
INSERT INTO `eduaydre`.`maestro` (`id_maestro`, `nombre`, `apellido`, `fecha_naciemiento`, `sexo`, `DPI`, `telefono`, `celular`) VALUES ('2', 'Daniel', 'Chavarría', '1993-11-30', '1', '492949429252', '42529243', '245823154');


INSERT INTO `eduaydre`.`ciclo_curso_maestro` (`ciclo`, `id_maestro`, `curso`) VALUES ('1', '1', '1');
INSERT INTO `eduaydre`.`ciclo_curso_maestro` (`ciclo`, `id_maestro`, `curso`) VALUES ('1', '1', '2');
INSERT INTO `eduaydre`.`ciclo_curso_maestro` (`ciclo`, `id_maestro`, `curso`) VALUES ('1', '1', '4');








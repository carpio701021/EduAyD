-- por componer: 
	-- crear entidad tarea_ciclo

	-- cambiar en la entidad tarea el tipo de la descripcion (actualmente es int)
ALTER TABLE tarea
DROP COLUMN descripcion;

ALTER TABLE tarea
ADD descripcion text;
-- holi
	-- que se genere automaticamente la llave primaria de tarea
-- ALTER TABLE tarea
-- CHANGE COLUMN tarea tarea INT NOT NULL AUTO_INCREMENT ;

	-- El tipo de dato de fecha_limite en la tabla tarea_seccion_ciclo_curso_maestro debe ser datetime
ALTER TABLE tarea_seccion_ciclo_curso_maestro
DROP COLUMN fecha_limite;

ALTER TABLE tarea_seccion_ciclo_curso_maestro
ADD fecha_limite datetime;


-- Agregar columna de fecha de calificación y cambiar los tipos de date a datetime en las fechas

ALTER TABLE `eduaydre`.`nota` 
ADD COLUMN `fecha_calificacion` DATETIME NOT NULL COMMENT '' AFTER `ruta_archivo`;
ALTER TABLE `eduaydre`.`nota` 
CHANGE COLUMN `fecha_de_envio` `fecha_de_envio` DATETIME NOT NULL COMMENT '' ;



-- Un SP al que le mande el id del maestro y me devuelva las secciones que este imparte, de que curso son y el grado


DROP PROCEDURE IF EXISTS sp_get_cursos_ciclos_from_maestro;
DELIMITER $$
CREATE PROCEDURE `sp_get_cursos_ciclos_from_maestro`(in id_maestro int,in ciclo int)
BEGIN
select sccm.seccion, s.nombre 'nombre_seccion', 
sccm.curso, c.nombre 'nombre_curso',  g.observacion 'descripcion_grado'
from seccion_ciclo_curso_maestro as sccm, seccion as s, curso as c,
grado as g
where sccm.id_maestro=id_maestro and sccm.ciclo=ciclo and sccm.seccion=s.seccion 
and sccm.curso=c.curso and s.grado=g.grado;
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


-- SP de insercion de creacion de tareas por el maestro
DROP PROCEDURE IF EXISTS sp_insert_tarea_from_maestro;
DELIMITER $$
CREATE PROCEDURE `sp_insert_tarea_from_maestro`(
in p_unidad int,in p_tipo_tarea int, in p_ciclo int, in p_maestro int, in p_curso int, in p_seccion int,
in p_es_examen int, in p_descripcion text, in p_ruta_archivo text,
in p_ponderacion int, in p_fecha_limite datetime, in p_toleraciona tinyint, in p_tiempo_tolerancia datetime, in p_porcentaje_tolerancia int, in p_aprobada tinyint)
BEGIN

DECLARE nueva_llave_tarea INT DEFAULT 0;
SELECT count(tarea)+1 from tarea into nueva_llave_tarea;

INSERT INTO tarea(`tarea`, `unidad`, `tipo_tarea`, `esExamen`, `ruta_archivo`, `descripcion`) 
VALUES (nueva_llave_tarea, p_unidad, p_tipo_tarea, p_es_examen, p_ruta_archivo, p_descripcion);


INSERT INTO `eduaydre`.`tarea_ciclo_curso_maestro` (`tarea`, `ciclo`, `maestro`, `curso`) 
VALUES (nueva_llave_tarea, p_ciclo, p_maestro, p_curso);

INSERT INTO tarea_seccion_ciclo_curso_maestro 
(`ciclo`, `curso`, `tarea`, `ponderacion`, `fecha_limite`, `tolerancia`, `tiempo_tolerancia`, `porcentaje_tolerancia`, `aprobada`, `seccion`) 
VALUES (p_ciclo, p_curso, nueva_llave_tarea, p_ponderacion, p_fecha_limite, p_toleraciona, p_tiempo_tolerancia, p_porcentaje_tolerancia, p_aprobada, p_seccion);


END$$
DELIMITER ;

-- Obtiene los examenes respecto al maestro y el curso

DROP PROCEDURE IF EXISTS get_examenes_maestro_curso;
delimiter $$
create procedure get_examenes_maestro_curso(in cicloP int, in cursoP int, in maestroP int)
begin
select t.* 
from tarea_ciclo_curso_maestro tccm
inner join tarea t on tccm.tarea = t.tarea
where tccm.ciclo = cicloP and tccm.curso = cursoP and  tccm.maestro = maestroP and t.esExamen = 1 ;
end$$

-- SP que devuelve las tareas asignadas a determinada seccion en determinado ciclo y en determinada unidad 
DROP PROCEDURE IF EXISTS sp_get_tareas_curso_seccion_ciclo_unidad;
delimiter $$
create procedure sp_get_tareas_curso_seccion_ciclo_unidad(in p_ciclo int, in p_curso int,in p_seccion int,in p_unidad int)
begin

select  tsccm.ciclo, tsccm.curso,tsccm.tarea,tsccm.ponderacion,tsccm.tolerancia,tsccm.tiempo_tolerancia,tsccm.porcentaje_tolerancia,
tsccm.aprobada, tsccm.fecha_limite, t.unidad,t.tipo_tarea,t.esExamen, t.descripcion
from tarea_seccion_ciclo_curso_maestro tsccm, tarea t
where tsccm.ciclo=p_ciclo and tsccm.curso=p_curso and tsccm.seccion=p_seccion
and tsccm.tarea=t.tarea and t.unidad=p_unidad;

end$$
CALL `eduaydre`.`sp_get_tareas_curso_seccion_ciclo_unidad`(1,1,1,1);

-- SP que devuelve los estudiantes que llevan un curso en determinada seccion y determinado ciclo
DROP PROCEDURE IF EXISTS sp_get_estudiantes_curso_seccion_ciclo;
delimiter $$
create procedure sp_get_estudiantes_curso_seccion_ciclo(in p_ciclo int, in p_curso int,in p_seccion int)
begin

select esc.carnet, e.nombre,e.apellido  
from estudiante_seccion_ciclo esc, estudiante_ciclo_curso ecc, estudiante e
where esc.carnet=ecc.carnet and esc.ciclo=ecc.ciclo and esc.carnet=e.carnet
and esc.ciclo=p_ciclo and ecc.curso=p_curso and esc.seccion=p_seccion
order by e.apellido; 

end$$

CALL `eduaydre`.`sp_get_estudiantes_curso_seccion_ciclo`(1,1,1);


-- Procedimiento que guarda una nota (calificación de alguna tarea o la tarea que el estudiante envía como tal)
DROP PROCEDURE IF EXISTS sp_guardar_nota_from_maestro;
delimiter $$
create procedure sp_guardar_nota_from_maestro(in p_carnet int, in p_nota_obtenida int,
in p_ciclo int,in p_curso int,in p_tarea int,in p_seccion int)
begin

INSERT INTO `eduaydre`.`nota`
(`carnet`,
`nota_obtenida`,
`fecha_de_envio`,
`ciclo`,
`curso`,
`tarea`,
`seccion`,
`fecha_calificacion`)
VALUES
(p_carnet,
p_nota_obtenida,
NOW(),
p_ciclo,
p_curso,
p_tarea,
p_seccion,
NOW())
ON DUPLICATE KEY UPDATE    
nota_obtenida=VALUES(nota_obtenida), 
fecha_calificacion=VALUES(fecha_calificacion);

end$$


-- SP que obtiene los cursos que un estudiante cursa en un ciclo determinado
DROP PROCEDURE IF EXISTS sp_get_cursos_ciclos_from_estudiante;

DELIMITER $$
CREATE DEFINER=`soft`@`localhost` PROCEDURE `sp_get_cursos_ciclos_from_estudiante`(in p_carnet int,in p_ciclo int)
BEGIN

select ecc.ciclo,c.curso,c.nombre,esc.seccion
from estudiante_ciclo_curso ecc, curso c, estudiante_seccion_ciclo esc
where ecc.carnet=p_carnet and ecc.ciclo=p_ciclo and ecc.curso=c.curso
and esc.carnet=ecc.carnet and esc.ciclo=p_ciclo
;

END$$
DELIMITER ;

call eduaydre.sp_get_cursos_ciclos_from_estudiante(1, 1);



-- SP que obtiene los resultados de las tareas
DROP PROCEDURE IF EXISTS sp_get_notas_from_estudiante_curso_ciclo;
DELIMITER $$
CREATE DEFINER=`soft`@`localhost` PROCEDURE `sp_get_notas_from_estudiante_curso_ciclo`(
in p_carnet int,in p_curso int,in p_ciclo int,in p_unidad int)
BEGIN

select n.nota_obtenida,n.fecha_de_envio,t.descripcion,n.tarea,n.fecha_calificacion,tt.nombre as 'tipo_tarea',tsccm.ponderacion
-- select *
from nota n, tarea t, tarea_tipo tt,tarea_seccion_ciclo_curso_maestro tsccm
where n.carnet = p_carnet and n.ciclo=p_ciclo 
and n.curso=p_curso and n.tarea=t.tarea and t.unidad=p_unidad and t.tipo_tarea=tt.tarea_tipo
and t.tarea=tsccm.tarea and tsccm.ciclo=n.ciclo and tsccm.curso=n.curso
;

END$$
DELIMITER ;



-- Procedimiento para el login
DROP PROCEDURE IF EXISTS sp_login;
delimiter $$
create procedure sp_login(in p_correo varchar(45), in p_pass varchar(45), in p_tipo_usuario int)
begin
-- siempre sera 1 maestro y 2 estudiante
declare v_usuario int default 0; -- codigo de usuario
declare resp int default 0; -- si la respuesta es 1 el login fue exitoso
declare v_id int default 0; -- el respectivo id de su tipo (carnet o id_maestro etc)

if p_tipo_usuario = 1 then -- si es maestro realiza la respectiva consulta
	set v_id = ifnull((
		select m.id_maestro from maestro m , usuario_maestro um, usuario u
		where m.id_maestro=um.id_maestro and u.usuario=um.usuario and u.correo=p_correo and u.pass=p_pass ),0);
elseif p_tipo_usuario = 2 then -- si es estudiante 
	set v_id = ifnull((
		select e.carnet from estudiante e , usuario_estudiante ue, usuario u
		where e.carnet=ue.carnet and u.usuario=ue.usuario and u.correo=p_correo and u.pass=p_pass ),0); 
else set v_id = 0;
end if;

select v_id as id;
		
end$$
delimiter

-- SP que obtiene todos los usuarios y sus correos con sus tipos
DROP PROCEDURE IF EXISTS sp_get_usuarios;
DELIMITER $$
CREATE DEFINER=`soft`@`localhost` PROCEDURE `sp_get_usuarios`()
BEGIN

select usuario,correo,usuario_tipo tipo from usuario;

END$$
DELIMITER ;


-- SP que obtiene las tareas para calendarizarlas
DROP PROCEDURE IF EXISTS sp_get_tareas_para_calendario;
DELIMITER $$
CREATE DEFINER=`soft`@`localhost` PROCEDURE `sp_get_tareas_para_calendario`(
in p_carnet int,in p_ciclo int,in p_unidad int)
BEGIN

select cu.nombre, cu.curso,tsccm.ponderacion,tsccm.fecha_limite,tsccm.tiempo_tolerancia
-- select * 
from estudiante e, ciclo c, unidad u, curso cu,
estudiante_ciclo_curso ecc, 
estudiante_seccion_ciclo esc, tarea_seccion_ciclo_curso_maestro tsccm
where c.ciclo=p_ciclo and e.carnet=p_carnet and u.unidad=p_unidad and cu.curso=tsccm.curso
and ecc.carnet=p_carnet and ecc.ciclo=p_ciclo
and esc.carnet=p_carnet and esc.ciclo=p_ciclo
and tsccm.seccion=esc.seccion and tsccm.ciclo=p_ciclo and tsccm.curso=ecc.curso
and tsccm.aprobada=1
;

END$$
DELIMITER ;


-- ---- fin stored procedures



-- Inserciones de datos

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


INSERT INTO `eduaydre`.`tarea_tipo` (`tarea_tipo`, `nombre`) VALUES ('1', 'Hoja de trabajo');
INSERT INTO `eduaydre`.`tarea_tipo` (`tarea_tipo`, `nombre`) VALUES ('2', 'Examen');
INSERT INTO `eduaydre`.`tarea_tipo` (`tarea_tipo`, `nombre`) VALUES ('3', 'Examen Corto');
INSERT INTO `eduaydre`.`tarea_tipo` (`tarea_tipo`, `nombre`) VALUES ('4', 'Tarea en casa');
INSERT INTO `eduaydre`.`tarea_tipo` (`tarea_tipo`, `nombre`) VALUES ('5', 'Tarea entrega presencial');

INSERT INTO `eduaydre`.`seccion_ciclo_curso_maestro` (`seccion`, `ciclo`, `id_maestro`, `curso`) VALUES ('1', '1', '1', '1');
INSERT INTO `eduaydre`.`seccion_ciclo_curso_maestro` (`seccion`, `ciclo`, `id_maestro`, `curso`) VALUES ('2', '1', '1', '2');
INSERT INTO `eduaydre`.`seccion_ciclo_curso_maestro` (`seccion`, `ciclo`, `id_maestro`, `curso`) VALUES ('3', '1', '1', '4');

INSERT INTO `eduaydre`.`unidad` (`unidad`, `fecha_inicial`, `fecha_final`) VALUES ('1', '1-1-1', '3-3-3');


INSERT INTO `eduaydre`.`tarea` (`tarea`, `unidad`, `tipo_tarea`, `esExamen`, `descripcion`, `ruta_archivo`) VALUES ('1', '1', '1', '0', 'mi primer tarea', '/tarea_blah_blah_blah');

INSERT INTO `eduaydre`.`tarea_ciclo_curso_maestro` (`tarea`, `ciclo`, `maestro`, `curso`) VALUES ('1', '1', '1', '1');

INSERT INTO `eduaydre`.`tarea_seccion_ciclo_curso_maestro` (`ciclo`, `curso`, `tarea`, `ponderacion`, `fecha_limite`, `tolerancia`, `tiempo_tolerancia`, `porcentaje_tolerancia`, `aprobada`, `seccion`) VALUES ('1', '1', '1', '30', '1-2-1 5:30:00', '0', '1-2-1 5:30:00', '0', '1', '1');


INSERT INTO `eduaydre`.`estudiante_ciclo_curso` (`ciclo`, `curso`, `carnet`) VALUES ('1', '1', '1');
INSERT INTO `eduaydre`.`estudiante_ciclo_curso` (`ciclo`, `curso`, `carnet`) VALUES ('1', '2', '1');
INSERT INTO `eduaydre`.`estudiante_ciclo_curso` (`ciclo`, `curso`, `carnet`) VALUES ('1', '3', '1');
INSERT INTO `eduaydre`.`estudiante_ciclo_curso` (`ciclo`, `curso`, `carnet`) VALUES ('1', '1', '2');
INSERT INTO `eduaydre`.`estudiante_ciclo_curso` (`ciclo`, `curso`, `carnet`) VALUES ('1', '2', '2');
INSERT INTO `eduaydre`.`estudiante_ciclo_curso` (`ciclo`, `curso`, `carnet`) VALUES ('1', '3', '2');
INSERT INTO `eduaydre`.`estudiante_ciclo_curso` (`ciclo`, `curso`, `carnet`) VALUES ('1', '1', '3');
INSERT INTO `eduaydre`.`estudiante_ciclo_curso` (`ciclo`, `curso`, `carnet`) VALUES ('1', '2', '3');
INSERT INTO `eduaydre`.`estudiante_ciclo_curso` (`ciclo`, `curso`, `carnet`) VALUES ('1', '3', '3');


INSERT INTO `eduaydre`.`seccion_ciclo` (`seccion`, `ciclo`) VALUES ('1', '1');


INSERT INTO `eduaydre`.`estudiante_seccion_ciclo` (`carnet`, `seccion`, `ciclo`) VALUES ('1', '1', '1');
INSERT INTO `eduaydre`.`estudiante_seccion_ciclo` (`carnet`, `seccion`, `ciclo`) VALUES ('2', '1', '1');
INSERT INTO `eduaydre`.`estudiante_seccion_ciclo` (`carnet`, `seccion`, `ciclo`) VALUES ('3', '1', '1');


INSERT INTO `eduaydre`.`usuario_tipo` (`nombre`) VALUES ('maestro');
INSERT INTO `eduaydre`.`usuario_tipo` (`nombre`) VALUES ('estudiante');


INSERT INTO `eduaydre`.`usuario` (`correo`, `pass`, `usuario_tipo`) VALUES ('peralta', 'ccc', '1');
INSERT INTO `eduaydre`.`usuario` (`correo`, `pass`, `usuario_tipo`) VALUES ('chino', 'ccc', '1');

INSERT INTO `eduaydre`.`usuario_maestro` (`id_maestro`, `usuario`) VALUES ('1', '1');
INSERT INTO `eduaydre`.`usuario_maestro` (`id_maestro`, `usuario`) VALUES ('2', '2');


INSERT INTO `eduaydre`.`usuario` (`correo`, `pass`, `usuario_tipo`) VALUES ('benito', 'bbb', '2');
INSERT INTO `eduaydre`.`usuario` (`correo`, `pass`, `usuario_tipo`) VALUES ('melisa', 'bbb', '2');


INSERT INTO `eduaydre`.`usuario_estudiante` (`usuario`, `carnet`) VALUES ('3', '1');
INSERT INTO `eduaydre`.`usuario_estudiante` (`usuario`, `carnet`) VALUES ('4', '2');


INSERT INTO `eduaydre`.`usuario_tipo` (`usuario_tipo`, `nombre`) VALUES ('3', 'encargado');
INSERT INTO `eduaydre`.`usuario_tipo` (`usuario_tipo`, `nombre`) VALUES ('4', 'director');



INSERT INTO `eduaydre`.`usuario` (`usuario`, `correo`, `pass`, `usuario_tipo`) VALUES ('5', 'soypapa', 'ppp', '3');
INSERT INTO `eduaydre`.`usuario` (`usuario`, `correo`, `pass`, `usuario_tipo`) VALUES ('6', 'soymama', 'ppp', '3');
INSERT INTO `eduaydre`.`usuario` (`usuario`, `correo`, `pass`, `usuario_tipo`) VALUES ('7', 'eldirector', 'ddd', '4');
INSERT INTO `eduaydre`.`usuario` (`usuario`, `correo`, `pass`, `usuario_tipo`) VALUES ('8', 'eldueño', 'eee', '4');


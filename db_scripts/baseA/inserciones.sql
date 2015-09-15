-- Inserciones de 20 Cursos
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('1', 'Matemática Primero Primaria', 'Numeros mayas');
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('2', 'Matemática Segundo Primaria', 'Sumas y restas');
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('3', 'Matemática Tercero Primaria', 'Multiplicación y division');
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('4', 'Matemática Cuarto Primaria', 'Integrales dobles y transformadas ');
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('5', 'Ciencias Naturales Primero Primaria', 'Florecitas');
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('6', 'Ciencias Naturales Segundo Primaria', 'Animalitos');
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('7', 'Ciencias Naturales Tercero Primaria', 'Arbolitos');
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('8', 'Ciencias Naturales Cuarto Primaria', 'El universo');
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('9', 'Idioma Español Primero Primaria', 'vocales');
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('10', 'Idioma Español Segundo Primaria', 'Consonantes');
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('11', 'Idioma Español Tercero Primaria', 'Comprension lectora');
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('12', 'Idioma Español Cuarto Primaria', 'Ortografía');
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('13', 'Sociales Primero Primaria', 'La familia');
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('14', 'Sociales Segundo Primaria', 'La comunidad');
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('15', 'Sociales Tercero Primaria', 'Historia');
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('16', 'Sociales Cuarto Primaria', 'Politica');
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('17', 'Ingles Primero Primaria', 'Vocales');
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('18', 'Ingles Segundo Primaria', 'Palabras');
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('19', 'Ingles Tercero Primaria', 'Verbos');
INSERT INTO `eduayd1`.`curso` (`id_curso`, `nombre_curso`, `descripcion_curso`) VALUES ('20', 'Ingles Cuarto Primaria', 'Oraciones');

-- Insercion de 5 Maestro
INSERT INTO `eduayd1`.`Maestro` (`id_maestro`, `nombre_maestro`, `apellidos_maestro`, `email_maestro`, `fecha_nacimiento_maestro`, `telefono_maestro`, `password`) VALUES ('1', 'Luis Eduardo', 'Lopez Herrera', 'juan@gmail.com', '1986-05-25', '12341234', '1234');
INSERT INTO `eduayd1`.`Maestro` (`id_maestro`, `nombre_maestro`, `apellidos_maestro`, `email_maestro`, `fecha_nacimiento_maestro`, `telefono_maestro`, `password`) VALUES ('2', 'Marco Tulio', 'Marroquin Alvarado', 'marro@gmail.com', '1980-01-20', '98765432', '1234');
INSERT INTO `eduayd1`.`Maestro` (`id_maestro`, `nombre_maestro`, `apellidos_maestro`, `email_maestro`, `fecha_nacimiento_maestro`, `telefono_maestro`, `password`) VALUES ('3', 'Renato David', 'Guitierrez Paz', 'renato@gmail.com', '1990-10-23', '13243546', '1234');
INSERT INTO `eduayd1`.`Maestro` (`id_maestro`, `nombre_maestro`, `apellidos_maestro`, `email_maestro`, `fecha_nacimiento_maestro`, `telefono_maestro`, `password`) VALUES ('4', 'Luis Miguel', 'Kirlin Kay', 'luis@gmail.com', '1992-12-21', '11223344', '1234');
INSERT INTO `eduayd1`.`Maestro` (`id_maestro`, `nombre_maestro`, `apellidos_maestro`, `email_maestro`, `fecha_nacimiento_maestro`, `telefono_maestro`, `password`) VALUES ('5', 'Otto Juan', 'Perez Carbon', 'carbon@gmail.com', '1981-08-02', '88227744', '1234');

-- Inserciones 4 Meastro_x_curso
INSERT INTO `eduayd1`.`Maestro_x_curso` (`CURSO_id_curso`, `MAESTRO_id_maestro`, `id_maestro_x_curso`) VALUES ('1', '1', '1');
INSERT INTO `eduayd1`.`Maestro_x_curso` (`CURSO_id_curso`, `MAESTRO_id_maestro`, `id_maestro_x_curso`) VALUES ('5', '1', '2');
INSERT INTO `eduayd1`.`Maestro_x_curso` (`CURSO_id_curso`, `MAESTRO_id_maestro`, `id_maestro_x_curso`) VALUES ('9', '1', '3');
INSERT INTO `eduayd1`.`Maestro_x_curso` (`CURSO_id_curso`, `MAESTRO_id_maestro`, `id_maestro_x_curso`) VALUES ('13', '1', '4');


-- Insercion 5 Tipos de actividad
INSERT INTO `eduayd1`.`TIPO_ACTIVIDAD` (`id_tipo_actividad`, `nombre_tipo_actividad`) VALUES ('1', 'Tarea');
INSERT INTO `eduayd1`.`TIPO_ACTIVIDAD` (`id_tipo_actividad`, `nombre_tipo_actividad`) VALUES ('2', 'Examen Corto');
INSERT INTO `eduayd1`.`TIPO_ACTIVIDAD` (`id_tipo_actividad`, `nombre_tipo_actividad`) VALUES ('3', 'Hoja de trabajo');
INSERT INTO `eduayd1`.`TIPO_ACTIVIDAD` (`id_tipo_actividad`, `nombre_tipo_actividad`) VALUES ('4', 'Laboratorio');
INSERT INTO `eduayd1`.`TIPO_ACTIVIDAD` (`id_tipo_actividad`, `nombre_tipo_actividad`) VALUES ('5', 'Examen de unidad');

-- Inserción de 7 estudiantes de prueba
INSERT INTO `eduayd1`.`Estudiante` (`id_estudiante`, `nombre_estudiante`, `apellidos_estudiante`, `direccion_estudiante`, `telefono_estudiante`, `email_estudiante`, `fecha_nacimiento`, `password`) VALUES ('1', 'Luis Pancho', 'Monzon Samayoa', 'Cerca de la U', '13243546', 'lpms@gmail.com', '1990-08-21', '1234');
INSERT INTO `eduayd1`.`Estudiante` (`id_estudiante`, `nombre_estudiante`, `apellidos_estudiante`, `direccion_estudiante`, `telefono_estudiante`, `email_estudiante`, `fecha_nacimiento`, `password`) VALUES ('2', 'José Abel', 'Estrada Lopez', 'Lejos de la U', '09785623', 'jael@gmail.com', '1992-01-23', '1234');
INSERT INTO `eduayd1`.`Estudiante` (`id_estudiante`, `nombre_estudiante`, `apellidos_estudiante`, `direccion_estudiante`, `telefono_estudiante`, `email_estudiante`, `fecha_nacimiento`, `password`) VALUES ('3', 'Jeremias David', 'Rodriguez Interiano', '30 calle B 13-29 colonia San Carlos', '12340987', 'jdri@gmail.com', '2000-03-12', '1234');
INSERT INTO `eduayd1`.`Estudiante` (`id_estudiante`, `nombre_estudiante`, `apellidos_estudiante`, `direccion_estudiante`, `telefono_estudiante`, `email_estudiante`, `fecha_nacimiento`, `password`) VALUES ('4', 'Alberto Rodrigo', 'Guitierrez de Paz', '23 calle A 12-42 zona 1', '01928374', 'argdp@gmaiil.com', '1980-02-20', '1234');
INSERT INTO `eduayd1`.`Estudiante` (`id_estudiante`, `nombre_estudiante`, `apellidos_estudiante`, `direccion_estudiante`, `telefono_estudiante`, `email_estudiante`, `fecha_nacimiento`, `password`) VALUES ('5', 'Jeyson Daniel', 'Bonilla Peralta', '90 calle C 32-42 zona 21', '92837465', 'jdbp@gmail.com', '1995-03-12', '1234');
INSERT INTO `eduayd1`.`Estudiante` (`id_estudiante`, `nombre_estudiante`, `apellidos_estudiante`, `direccion_estudiante`, `telefono_estudiante`, `email_estudiante`, `fecha_nacimiento`, `password`) VALUES ('6', 'Allan Juan Carlos', 'Noguera Padilla', 'Lejos de todo', '98327465', 'ajcnp@gmail.com', '1992-03-13', '1234');
INSERT INTO `eduayd1`.`Estudiante` (`id_estudiante`, `nombre_estudiante`, `apellidos_estudiante`, `direccion_estudiante`, `telefono_estudiante`, `email_estudiante`, `fecha_nacimiento`, `password`) VALUES ('7', 'David Gregorio', 'Lopez Crack', '29 calle b 32-12 zona 2', '12349876', 'dglc@gmail.com', '1993-05-21', '1234');

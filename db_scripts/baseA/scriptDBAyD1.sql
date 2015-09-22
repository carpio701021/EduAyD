-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema eduayd1
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `eduayd1` ;

-- -----------------------------------------------------
-- Schema eduayd1
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eduayd1` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `eduayd1` ;

-- -----------------------------------------------------
-- Table `eduayd1`.`GRADO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eduayd1`.`GRADO` ;

CREATE TABLE IF NOT EXISTS `eduayd1`.`GRADO` (
  `id_grado` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `nombre_grado` VARCHAR(30) NOT NULL COMMENT '',
  `descripcion_grado` VARCHAR(70) NULL COMMENT '',
  PRIMARY KEY (`id_grado`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduayd1`.`SECCION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eduayd1`.`SECCION` ;

CREATE TABLE IF NOT EXISTS `eduayd1`.`SECCION` (
  `id_seccion` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `nombre_seccion` VARCHAR(30) NOT NULL COMMENT '',
  `descripcion_seccion` VARCHAR(70) NULL COMMENT '',
  PRIMARY KEY (`id_seccion`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduayd1`.`CURSO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eduayd1`.`CURSO` ;

CREATE TABLE IF NOT EXISTS `eduayd1`.`CURSO` (
  `id_curso` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `nombre_curso` VARCHAR(50) NOT NULL COMMENT '',
  `descripcion_curso` VARCHAR(70) NULL COMMENT '',
  PRIMARY KEY (`id_curso`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduayd1`.`ESTUDIANTE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eduayd1`.`ESTUDIANTE` ;

CREATE TABLE IF NOT EXISTS `eduayd1`.`ESTUDIANTE` (
  `id_estudiante` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `nombre_estudiante` VARCHAR(30) NOT NULL COMMENT '',
  `apellidos_estudiante` VARCHAR(30) NOT NULL COMMENT '',
  `direccion_estudiante` VARCHAR(60) NOT NULL COMMENT '',
  `telefono_estudiante` VARCHAR(8) NULL COMMENT '',
  `email_estudiante` VARCHAR(45) NOT NULL COMMENT '',
  `fecha_nacimiento` DATE NOT NULL COMMENT '',
  `password` VARCHAR(15) NOT NULL COMMENT '',
  PRIMARY KEY (`id_estudiante`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduayd1`.`ENCARGADO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eduayd1`.`ENCARGADO` ;

CREATE TABLE IF NOT EXISTS `eduayd1`.`ENCARGADO` (
  `id_encargado` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `nombre_encargadoo` VARCHAR(30) NOT NULL COMMENT '',
  `apellido_encargado` VARCHAR(50) NOT NULL COMMENT '',
  `direccion_encargado` VARCHAR(60) NOT NULL COMMENT '',
  `telefono_encargado` VARCHAR(8) NOT NULL COMMENT '',
  `email_encargado` VARCHAR(45) NULL COMMENT '',
  `fecha_nacimiento_encargado` DATE NOT NULL COMMENT '',
  `password` VARCHAR(15) NULL COMMENT '',
  PRIMARY KEY (`id_encargado`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduayd1`.`MAESTRO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eduayd1`.`MAESTRO` ;

CREATE TABLE IF NOT EXISTS `eduayd1`.`MAESTRO` (
  `id_maestro` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `nombre_maestro` VARCHAR(30) NOT NULL COMMENT '',
  `apellidos_maestro` VARCHAR(45) NOT NULL COMMENT '',
  `email_maestro` VARCHAR(45) NOT NULL COMMENT '',
  `fecha_nacimiento_maestro` DATE NOT NULL COMMENT '',
  `telefono_maestro` VARCHAR(8) NOT NULL COMMENT '',
  `password` VARCHAR(15) NOT NULL COMMENT '',
  PRIMARY KEY (`id_maestro`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduayd1`.`MOTIVO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eduayd1`.`MOTIVO` ;

CREATE TABLE IF NOT EXISTS `eduayd1`.`MOTIVO` (
  `id_motivo` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `nombre_motivo` VARCHAR(45) NOT NULL COMMENT '',
  `descripcion_motivo` VARCHAR(100) NULL COMMENT '',
  PRIMARY KEY (`id_motivo`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduayd1`.`TIPO_ACTIVIDAD`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eduayd1`.`TIPO_ACTIVIDAD` ;

CREATE TABLE IF NOT EXISTS `eduayd1`.`TIPO_ACTIVIDAD` (
  `id_tipo_actividad` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `nombre_tipo_actividad` VARCHAR(45) NOT NULL COMMENT '',
  PRIMARY KEY (`id_tipo_actividad`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduayd1`.`ACTIVIDAD`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eduayd1`.`ACTIVIDAD` ;

CREATE TABLE IF NOT EXISTS `eduayd1`.`ACTIVIDAD` (
  `id_actividad` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `nombre_actividad` VARCHAR(45) NOT NULL COMMENT '',
  `descripcion_actividad` VARCHAR(100) NOT NULL COMMENT '',
  `direccion_archivo_actividad` VARCHAR(45) NULL COMMENT '',
  `fecha_inicio_actividad` DATE NOT NULL COMMENT '',
  `fecha_final_actividad` DATE NOT NULL COMMENT '',
  `TIPO_ACTIVIDAD_id_tipo_actividad` INT NOT NULL COMMENT '',
  PRIMARY KEY (`id_actividad`)  COMMENT '',
  INDEX `fk_ACTIVIDAD_TIPO_ACTIVIDAD_idx` (`TIPO_ACTIVIDAD_id_tipo_actividad` ASC)  COMMENT '',
  CONSTRAINT `fk_ACTIVIDAD_TIPO_ACTIVIDAD`
    FOREIGN KEY (`TIPO_ACTIVIDAD_id_tipo_actividad`)
    REFERENCES `eduayd1`.`TIPO_ACTIVIDAD` (`id_tipo_actividad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduayd1`.`GRADO_X_SECCION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eduayd1`.`GRADO_X_SECCION` ;

CREATE TABLE IF NOT EXISTS `eduayd1`.`GRADO_X_SECCION` (
  `id_grado_x_seccion` INT NOT NULL COMMENT '',
  `GRADO_id_grado` INT NOT NULL COMMENT '',
  `SECCION_id_seccion` INT NOT NULL COMMENT '',
  INDEX `fk_GRADO_X_SECCION_GRADO1_idx` (`GRADO_id_grado` ASC)  COMMENT '',
  INDEX `fk_GRADO_X_SECCION_SECCION1_idx` (`SECCION_id_seccion` ASC)  COMMENT '',
  PRIMARY KEY (`id_grado_x_seccion`)  COMMENT '',
  CONSTRAINT `fk_GRADO_X_SECCION_GRADO1`
    FOREIGN KEY (`GRADO_id_grado`)
    REFERENCES `eduayd1`.`GRADO` (`id_grado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_GRADO_X_SECCION_SECCION1`
    FOREIGN KEY (`SECCION_id_seccion`)
    REFERENCES `eduayd1`.`SECCION` (`id_seccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduayd1`.`ESTUDIANTE_X_ENCARGADO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eduayd1`.`ESTUDIANTE_X_ENCARGADO` ;

CREATE TABLE IF NOT EXISTS `eduayd1`.`ESTUDIANTE_X_ENCARGADO` (
  `ESTUDIANTE_id_estudiante` INT NOT NULL COMMENT '',
  `ENCARGADO_id_encargado` INT NOT NULL COMMENT '',
  INDEX `fk_ESTUDIANTE_X_ENCARGADO_ESTUDIANTE1_idx` (`ESTUDIANTE_id_estudiante` ASC)  COMMENT '',
  INDEX `fk_ESTUDIANTE_X_ENCARGADO_ENCARGADO1_idx` (`ENCARGADO_id_encargado` ASC)  COMMENT '',
  CONSTRAINT `fk_ESTUDIANTE_X_ENCARGADO_ESTUDIANTE1`
    FOREIGN KEY (`ESTUDIANTE_id_estudiante`)
    REFERENCES `eduayd1`.`ESTUDIANTE` (`id_estudiante`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ESTUDIANTE_X_ENCARGADO_ENCARGADO1`
    FOREIGN KEY (`ENCARGADO_id_encargado`)
    REFERENCES `eduayd1`.`ENCARGADO` (`id_encargado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduayd1`.`MAESTRO_X_CURSO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eduayd1`.`MAESTRO_X_CURSO` ;

CREATE TABLE IF NOT EXISTS `eduayd1`.`MAESTRO_X_CURSO` (
  `CURSO_id_curso` INT NOT NULL COMMENT '',
  `MAESTRO_id_maestro` INT NOT NULL COMMENT '',
  `id_maestro_x_curso` INT NOT NULL AUTO_INCREMENT COMMENT '',
  INDEX `fk_MAESTRO_X_CURSO_CURSO1_idx` (`CURSO_id_curso` ASC)  COMMENT '',
  INDEX `fk_MAESTRO_X_CURSO_MAESTRO1_idx` (`MAESTRO_id_maestro` ASC)  COMMENT '',
  PRIMARY KEY (`id_maestro_x_curso`)  COMMENT '',
  CONSTRAINT `fk_MAESTRO_X_CURSO_CURSO1`
    FOREIGN KEY (`CURSO_id_curso`)
    REFERENCES `eduayd1`.`CURSO` (`id_curso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_MAESTRO_X_CURSO_MAESTRO1`
    FOREIGN KEY (`MAESTRO_id_maestro`)
    REFERENCES `eduayd1`.`MAESTRO` (`id_maestro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduayd1`.`UNIDAD`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eduayd1`.`UNIDAD` ;

CREATE TABLE IF NOT EXISTS `eduayd1`.`UNIDAD` (
  `id_unidad` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `nombre_unidad` VARCHAR(45) NOT NULL COMMENT '',
  PRIMARY KEY (`id_unidad`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduayd1`.`AULA`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eduayd1`.`AULA` ;

CREATE TABLE IF NOT EXISTS `eduayd1`.`AULA` (
  `GRADO_X_SECCION_id_grado_x_seccion` INT NOT NULL COMMENT '',
  `MAESTRO_X_CURSO_id_maestro_x_curso` INT NOT NULL COMMENT '',
  `id_aula` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `UNIDAD_id_unidad` INT NOT NULL COMMENT '',
  INDEX `fk_AULA_GRADO_X_SECCION1_idx` (`GRADO_X_SECCION_id_grado_x_seccion` ASC)  COMMENT '',
  INDEX `fk_AULA_MAESTRO_X_CURSO1_idx` (`MAESTRO_X_CURSO_id_maestro_x_curso` ASC)  COMMENT '',
  PRIMARY KEY (`id_aula`)  COMMENT '',
  INDEX `fk_AULA_UNIDAD1_idx` (`UNIDAD_id_unidad` ASC)  COMMENT '',
  CONSTRAINT `fk_AULA_GRADO_X_SECCION1`
    FOREIGN KEY (`GRADO_X_SECCION_id_grado_x_seccion`)
    REFERENCES `eduayd1`.`GRADO_X_SECCION` (`id_grado_x_seccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_AULA_MAESTRO_X_CURSO1`
    FOREIGN KEY (`MAESTRO_X_CURSO_id_maestro_x_curso`)
    REFERENCES `eduayd1`.`MAESTRO_X_CURSO` (`id_maestro_x_curso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_AULA_UNIDAD1`
    FOREIGN KEY (`UNIDAD_id_unidad`)
    REFERENCES `eduayd1`.`UNIDAD` (`id_unidad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduayd1`.`AULA_X_ESTUDIANTE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eduayd1`.`AULA_X_ESTUDIANTE` ;

CREATE TABLE IF NOT EXISTS `eduayd1`.`AULA_X_ESTUDIANTE` (
  `id_aula_x_estudiante` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `AULA_id_aula` INT NOT NULL COMMENT '',
  `ESTUDIANTE_id_estudiante` INT NOT NULL COMMENT '',
  PRIMARY KEY (`id_aula_x_estudiante`)  COMMENT '',
  INDEX `fk_AULA_X_ESTUDIANTE_AULA1_idx` (`AULA_id_aula` ASC)  COMMENT '',
  INDEX `fk_AULA_X_ESTUDIANTE_ESTUDIANTE1_idx` (`ESTUDIANTE_id_estudiante` ASC)  COMMENT '',
  CONSTRAINT `fk_AULA_X_ESTUDIANTE_AULA1`
    FOREIGN KEY (`AULA_id_aula`)
    REFERENCES `eduayd1`.`AULA` (`id_aula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_AULA_X_ESTUDIANTE_ESTUDIANTE1`
    FOREIGN KEY (`ESTUDIANTE_id_estudiante`)
    REFERENCES `eduayd1`.`ESTUDIANTE` (`id_estudiante`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduayd1`.`SUPERVISOR`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eduayd1`.`SUPERVISOR` ;

CREATE TABLE IF NOT EXISTS `eduayd1`.`SUPERVISOR` (
  `id_supervisor` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `nombre_supervisor` VARCHAR(45) NOT NULL COMMENT '',
  `apellidos_supervisor` VARCHAR(45) NOT NULL COMMENT '',
  `telefono_supervisor` VARCHAR(8) NOT NULL COMMENT '',
  `correo_supervisor` VARCHAR(45) NOT NULL COMMENT '',
  `fecha_nacimiento` DATE NOT NULL COMMENT '',
  `password` VARCHAR(15) NOT NULL COMMENT '',
  PRIMARY KEY (`id_supervisor`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduayd1`.`SUPERVISION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eduayd1`.`SUPERVISION` ;

CREATE TABLE IF NOT EXISTS `eduayd1`.`SUPERVISION` (
  `MAESTRO_X_CURSO_id_maestro_x_curso` INT NOT NULL COMMENT '',
  `SUPERVISOR_id_supervisor` INT NOT NULL COMMENT '',
  `id_supervision` INT NOT NULL AUTO_INCREMENT COMMENT '',
  INDEX `fk_SUPERVISION_MAESTRO_X_CURSO1_idx` (`MAESTRO_X_CURSO_id_maestro_x_curso` ASC)  COMMENT '',
  INDEX `fk_SUPERVISION_SUPERVISOR1_idx` (`SUPERVISOR_id_supervisor` ASC)  COMMENT '',
  PRIMARY KEY (`id_supervision`)  COMMENT '',
  CONSTRAINT `fk_SUPERVISION_MAESTRO_X_CURSO1`
    FOREIGN KEY (`MAESTRO_X_CURSO_id_maestro_x_curso`)
    REFERENCES `eduayd1`.`MAESTRO_X_CURSO` (`id_maestro_x_curso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SUPERVISION_SUPERVISOR1`
    FOREIGN KEY (`SUPERVISOR_id_supervisor`)
    REFERENCES `eduayd1`.`SUPERVISOR` (`id_supervisor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduayd1`.`SUPERVISION_X_ACTIVIDAD`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eduayd1`.`SUPERVISION_X_ACTIVIDAD` ;

CREATE TABLE IF NOT EXISTS `eduayd1`.`SUPERVISION_X_ACTIVIDAD` (
  `id_supervision_x_actividad` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `ACTIVIDAD_id_actividad` INT NOT NULL COMMENT '',
  `SUPERVISION_id_supervision` INT NOT NULL COMMENT '',
  PRIMARY KEY (`id_supervision_x_actividad`)  COMMENT '',
  INDEX `fk_SUPERVISION_X_ACTIVIDAD_ACTIVIDAD1_idx` (`ACTIVIDAD_id_actividad` ASC)  COMMENT '',
  INDEX `fk_SUPERVISION_X_ACTIVIDAD_SUPERVISION1_idx` (`SUPERVISION_id_supervision` ASC)  COMMENT '',
  CONSTRAINT `fk_SUPERVISION_X_ACTIVIDAD_ACTIVIDAD1`
    FOREIGN KEY (`ACTIVIDAD_id_actividad`)
    REFERENCES `eduayd1`.`ACTIVIDAD` (`id_actividad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SUPERVISION_X_ACTIVIDAD_SUPERVISION1`
    FOREIGN KEY (`SUPERVISION_id_supervision`)
    REFERENCES `eduayd1`.`SUPERVISION` (`id_supervision`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduayd1`.`ESTUDIANTE_X_ACTIVIDAD`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `eduayd1`.`ESTUDIANTE_X_ACTIVIDAD` ;

CREATE TABLE IF NOT EXISTS `eduayd1`.`ESTUDIANTE_X_ACTIVIDAD` (
  `id_estudiante_x_actividad` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `ponderacion` FLOAT NOT NULL COMMENT '',
  `ACTIVIDAD_id_actividad` INT NOT NULL COMMENT '',
  `ESTUDIANTE_id_estudiante` INT NOT NULL COMMENT '',
  PRIMARY KEY (`id_estudiante_x_actividad`)  COMMENT '',
  INDEX `fk_ESTUDIANTE_X_ACTIVIDAD_ACTIVIDAD1_idx` (`ACTIVIDAD_id_actividad` ASC)  COMMENT '',
  INDEX `fk_ESTUDIANTE_X_ACTIVIDAD_ESTUDIANTE1_idx` (`ESTUDIANTE_id_estudiante` ASC)  COMMENT '',
  CONSTRAINT `fk_ESTUDIANTE_X_ACTIVIDAD_ACTIVIDAD1`
    FOREIGN KEY (`ACTIVIDAD_id_actividad`)
    REFERENCES `eduayd1`.`ACTIVIDAD` (`id_actividad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ESTUDIANTE_X_ACTIVIDAD_ESTUDIANTE1`
    FOREIGN KEY (`ESTUDIANTE_id_estudiante`)
    REFERENCES `eduayd1`.`ESTUDIANTE` (`id_estudiante`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

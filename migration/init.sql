-- MySQL Script generated by MySQL Workbench
-- Wed Feb 28 00:49:00 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema bowling
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `bowling` ;

-- -----------------------------------------------------
-- Schema bowling
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bowling` DEFAULT CHARACTER SET utf8 ;
USE `bowling` ;

-- -----------------------------------------------------
-- Table `bowling`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bowling`.`users` ;

CREATE TABLE IF NOT EXISTS `bowling`.`users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(50) NOT NULL,
  `nickname` VARCHAR(10) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_email` (`email` ASC),
  INDEX `idx_nickname` (`nickname` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bowling`.`scores`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bowling`.`scores` ;

CREATE TABLE IF NOT EXISTS `bowling`.`scores` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `userId` BIGINT NOT NULL,
  `score` INT NOT NULL,
  `targetDate` DATE NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_userId` (`userId` ASC),
  INDEX `idx_score` (`score` ASC),
  INDEX `idx_targetDate` (`targetDate` ASC))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

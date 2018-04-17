DROP DATABASE IF EXISTS 42matcha;

CREATE DATABASE IF NOT EXISTS 42matcha;

USE 42matcha;

CREATE TABLE IF NOT EXISTS `User` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`login` varchar(255) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL UNIQUE,
	`age` TIMESTAMP NOT NULL,
	`nb_image` INT NOT NULL DEFAULT 0,
	`gender` enum('female', 'male', 'other') NOT NULL DEFAULT 'female',
	`orientation` enum('heterosexual','bisexual','homosexual') NOT NULL DEFAULT 'bisexual',
	`bio` TEXT,
	`pic0` varchar(255),
	`pic1` varchar(255),
	`pic2` varchar(255),
	`pic3` varchar(255),
	`pic4` varchar(255),
	`city` varchar(255),
	`lat` FLOAT( 10, 6 ) NOT NULL,
	`lng` FLOAT( 10, 6 ) NOT NULL,
	`status` enum('online','offline') NOT NULL DEFAULT 'offline',
	`is_lock` enum('true','false') NOT NULL DEFAULT 'false',
	`reset_pass` varchar(255) DEFAULT NULL
) ENGINE=MYISAM DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `Tag` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY key,
	`tag_name` varchar(255) NOT NULL UNIQUE
) ENGINE=MYISAM DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;


CREATE TABLE IF NOT EXISTS `Viewer` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`user_id` INT NOT NULL,
	`viewed_user_id` INT NOT NULL,


    INDEX viewed_user (viewed_user_id),
    FOREIGN KEY (viewed_user_id)
        REFERENCES User(id)
        ON DELETE CASCADE
) ENGINE=MYISAM DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;

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
	`profile_image` varchar(255) DEFAULT NULL,
	`gender` enum('female', 'male', 'other') NOT NULL DEFAULT 'female',
	`orientation` enum('heterosexual','bisexual','homosexual') NOT NULL DEFAULT 'bisexual',
	`bio` TEXT,
	`status` enum('online','offline') NOT NULL DEFAULT 'offline',
	`is_lock` enum('true','false') NOT NULL DEFAULT 'false',
	`reset_pass` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `Image` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`src` varchar(255) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `Post` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`title` varchar(255) NOT NULL,
	`content` TEXT NOT NULL,
	`user_id` int NOT NULL,

	INDEX post_user (user_id),
    FOREIGN KEY (user_id)
        REFERENCES User(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `Location` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`address` varchar(255) NOT NULL,
	`lat` decimal(10, 8) NOT NULL,
	`long` decimal(11,8) NOT NULL,
	`user_id` INT NOT NULL,

	INDEX location_user (user_id),
    FOREIGN KEY (user_id)
        REFERENCES User(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `Comment` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY key,
	`post_id` INT NOT NULL,
	`user_id` INT NOT NULL,
	`content` TEXT,
	`comment_parent_id` INT DEFAULT NULL,

	INDEX comment_user (user_id),
    FOREIGN KEY (user_id)
        REFERENCES User(id)
        ON DELETE NO ACTION,

     INDEX comment_post (post_id),
    FOREIGN KEY (post_id)
        REFERENCES Post(id)
        ON DELETE CASCADE,

    INDEX post_parent (comment_parent_id),
    FOREIGN KEY (comment_parent_id)
        REFERENCES Comment(id)
        ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `Tag` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY key,
	`tag_name` varchar(255) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `Post_tag` (
	`post_id` INT NOT NULL,
	`tag_id` INT NOT NULL,


    INDEX Post_tag_post (post_id),
    FOREIGN KEY (post_id)
        REFERENCES Post(id)
        ON DELETE NO ACTION,

    INDEX Post_tag_tag (tag_id),
    FOREIGN KEY (tag_id)
        REFERENCES Tag(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `User_tag` (
	`user_id` INT NOT NULL,
	`tag_id` INT NOT NULL,


    INDEX User_tag_user (user_id),
    FOREIGN KEY (user_id)
        REFERENCES Post(id)
        ON DELETE NO ACTION,

    INDEX User_tag_tag (tag_id),
    FOREIGN KEY (tag_id)
        REFERENCES Tag(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `User_image` (
	`user_id` INT NOT NULL,
	`image_id` INT NOT NULL,

    INDEX User_image_user (user_id),
    FOREIGN KEY (user_id)
        REFERENCES User(id)
        ON DELETE CASCADE,


    INDEX User_image_image (image_id),
    FOREIGN KEY (image_id)
        REFERENCES Image(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `Post_image` (
	`post_id` INT NOT NULL,
	`image_id` INT NOT NULL,


    INDEX Post_image_user (post_id),
    FOREIGN KEY (post_id)
        REFERENCES Post(id)
        ON DELETE CASCADE,


    INDEX Post_image_image (image_id),
    FOREIGN KEY (image_id)
        REFERENCES Image(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `Liker` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`user_id` INT NOT NULL,
	`liked_user_id` INT NOT NULL,


    INDEX user_liker (user_id),
    FOREIGN KEY (user_id)
        REFERENCES User(id)
        ON DELETE CASCADE,

    INDEX liked_user (liked_user_id),
    FOREIGN KEY (liked_user_id)
        REFERENCES User(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `Viewer` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`user_id` INT NOT NULL,
	`viewed_user_id` INT NOT NULL,


    INDEX viewed_user (viewed_user_id),
    FOREIGN KEY (viewed_user_id)
        REFERENCES User(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_general_ci;

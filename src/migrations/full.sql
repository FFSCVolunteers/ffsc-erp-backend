-- Adminer 4.6.2 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `ffsc_erp`;
CREATE DATABASE `ffsc_erp` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ffsc_erp`;

DROP TABLE IF EXISTS `center`;
CREATE TABLE `center` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `center` (`id`, `name`, `address`, `created_at`, `updated_at`) VALUES
(1,	'Binh Loi',	'12 Binh Loi, HCMC',	'2018-09-07 23:21:26',	'2018-09-07 23:21:26');

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `role` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1,	'Admin',	'2018-09-04 07:59:57',	'2018-09-04 07:59:57'),
(2,	'Center Admin',	'2018-09-05 14:58:07',	'2018-09-05 14:58:07');

DROP TABLE IF EXISTS `statistic`;
CREATE TABLE `statistic` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `year` smallint(5) unsigned NOT NULL,
  `month` tinyint(2) unsigned NOT NULL,
  `month_year` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `center_id` int(10) unsigned NOT NULL,
  `number_of_new_students` int(10) unsigned DEFAULT NULL,
  `number_of_scholarships` int(10) unsigned DEFAULT NULL,
  `number_of_excellent_students` int(10) unsigned DEFAULT NULL,
  `inputted_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `inputted_by` (`inputted_by`),
  KEY `month_year` (`month_year`),
  KEY `center_id` (`center_id`),
  CONSTRAINT `statistic_ibfk_1` FOREIGN KEY (`inputted_by`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `statistic_ibfk_2` FOREIGN KEY (`center_id`) REFERENCES `center` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `statistic` (`id`, `year`, `month`, `month_year`, `center_id`, `number_of_new_students`, `number_of_scholarships`, `number_of_excellent_students`, `inputted_by`, `created_at`, `updated_at`) VALUES
(5,	2018,	8,	'8-2018',	1,	20,	10,	20,	1,	'2018-09-08 01:22:07',	'2018-09-08 01:22:07'),
(6,	2018,	8,	'8-2018',	1,	20,	10,	20,	1,	'2018-09-08 01:36:00',	'2018-09-08 01:36:00');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mobile` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `active` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `token` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `address`, `mobile`, `password`, `token`, `active`, `created_at`, `updated_at`) VALUES
(1,	'Vu',	'Khuu',	'vu.khuu@gmail.com',	'Hoc Mon',	'',	'$2a$10$rHEqtRxk5qrKm75rXtyyEu8cjMsuAQi1aqToM5zIk252BjHTbfg/K',	't2ftdMV92rOQmzrPduVtdPoPQBGOoegf',	1,	'2018-09-06 08:19:08',	'2018-09-06 08:19:08');

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  `center_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `role_id` (`role_id`),
  KEY `center_id` (`center_id`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_role_ibfk_3` FOREIGN KEY (`center_id`) REFERENCES `center` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- 2018-09-08 01:37:50

create database airwithblock_db;
use airwithblock_db;

CREATE TABLE `Products` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `owner_account` varbinary(255) NOT NULL,
  `product_type` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_contents` text NOT NULL,
  `product_image` longblob NOT NULL,
  `people_number` int NOT NULL,
  `postal_code` int NOT NULL,
  `basic_addr` varchar(255) NOT NULL,
  `detailed_addr` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `created_at` datetime
);

CREATE TABLE `Password` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `reservation_id` int NOT NULL,
  `password` text NOT NULL
);

CREATE TABLE `Reservation` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `reservationMapping_id` int NOT NULL,
  `owner_account` varbinary(255) NOT NULL,
  `buyer_account` varbinary(255) NOT NULL,
  `checkin` date NOT NULL,
  `checkout` date NOT NULL,
  `reservation_day` int NOT NULL,
  `password_check` bool DEFAULT false
);

CREATE TABLE `Users` (
  `account` varbinary(255) PRIMARY KEY,
  `public_key` text NOT NULL,
  `private_key` text NOT NULL
);

ALTER TABLE `Password` ADD FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`);

ALTER TABLE `Password` ADD FOREIGN KEY (`reservation_id`) REFERENCES `Reservation` (`id`);

ALTER TABLE `Reservation` ADD FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`);

ALTER TABLE `Reservation` ADD FOREIGN KEY (`buyer_account`) REFERENCES `Users` (`account`);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '008526';

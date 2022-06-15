drop database if exits airwithblock_db;
create database airwithblock_db;
use airwithblock_db;

CREATE TABLE `Products` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `owner_account` varchar(255) NOT NULL,
  `product_type` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_contents` text NOT NULL,
  `product_image` varchar(255) NOT NULL,
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
  `password` varchar(255)
);

CREATE TABLE `Reservation` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `owner_account` varchar(255),
  `buyer_account` varchar(255) NOT NULL,
  `buyer_publickey` varchar(255) NOT NULL,
  `reservation_date` date NOT NULL,
  `reservation_day` int NOT NULL
);

ALTER TABLE `Password` ADD FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`);

ALTER TABLE `Password` ADD FOREIGN KEY (`reservation_id`) REFERENCES `Reservation` (`id`);

ALTER TABLE `Reservation` ADD FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '008526';
CREATE DATABASE product_db;
USE product_db;
CREATE TABLE products (
id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
price INT UNSIGNED NOT NULL,
description TEXT
);
CREATE DATABASE order_db;
USE order_db;
CREATE TABLE orders (
id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
user VARCHAR(30) NOT NULL,
product INT UNSIGNED NOT NULL,
amount INT UNSIGNED NOT NULL
);
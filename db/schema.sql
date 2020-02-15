drop database if exists test_db;

create database test_db;

use test_db;

create table users (
 ID int not null AUTO_INCREMENT,
 name varchar(255),
 primary key(ID)
);

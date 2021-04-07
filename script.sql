create database petstore;
use petstore;
create table product (
	id varchar(10),
    type varchar(1), #I neu la item, S neu la spa, P neu la pet
    quantity int,
    price int,
    primary key (id));
create table item (
	id varchar(10),
    `name` varchar(20),
    `imageurl` varchar(100),
    primary key (id),
    foreign key (id) references product (id));
create table spa (
	id varchar(10),
    `name` varchar(20),
    `imageurl` varchar(100),
    primary key (id),
    foreign key (id) references product (id));
create table pet (
	id varchar(10),
    `name` varchar(50),
    `imageurl` varchar(100),
    `breed` varchar(20),
    primary key (id),
    foreign key (id) references product (id));
create table customer (
	phonenumber varchar(11),
    name varchar(50),
    primary key (phonenumber));
create table `order` (
	id varchar(10),
    price int,
    userphonenumber varchar(11),
    primary key (id),
    foreign key (userphonenumber) references customer (phonenumber));
create table productorder (
	orderid varchar(10),
	productid varchar(10),
    quantity int,
    primary key (orderid, productid),
    foreign key (orderid) references `order` (id),
    foreign key (productid) references product (id));
create table blog (
	id varchar(10),
	content text,
    primary key (id));
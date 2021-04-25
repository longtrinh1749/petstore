create database petstoredb;
use petstoredb;

create table pet (
    id varchar(10) primary key,
    name varchar(50),
    breed varchar(20),
    price int,
    imageurl varchar(200)
);
create table item (
    id varchar(10) PRIMARY KEY,
    name varchar(50),
    category varchar(50),
    brand varchar(50),
    price int,
    imageurl varchar(200)
);
create table spa (
    id varchar(10) PRIMARY KEY,
    name varchar(50),
    price int,
    imageurl varchar(200)
);
create table customer (
    id varchar(10) PRIMARY key,
    phoneno varchar(12), 
    email varchar(100),
    address varchar(200)
);
create table petorder (
    id varchar(10) PRIMARY KEY,
    total int,
    customerid varchar(10),
    `timestamp` date,
    FOREIGN KEY (`customerid`) REFERENCES customer (id)
);
create table itemorder (
    id varchar(10) PRIMARY KEY,
    total int,
    customerid varchar(10),
    `timestamp` date,
    FOREIGN KEY (`customerid`) REFERENCES customer (id)
);
create table spaorder (
    id varchar(10) PRIMARY KEY,
    total int, 
    customerid varchar(10),
    `timestamp` date,
    FOREIGN KEY (`customerid`) REFERENCES customer (id)
);
create table orderpet (
    petid varchar(10),
    orderid varchar(10),
    quantity int,
    FOREIGN KEY (`petid`) REFERENCES pet (id),
    FOREIGN KEY (`orderid`) REFERENCES petorder (id),
	PRIMARY KEY (petid, orderid)
);
create table orderitem (
    itemid varchar(10) REFERENCES item(id),
    orderid varchar(10) REFERENCES itemorder (id),
    quantity int,
    PRIMARY KEY (itemid, orderid)
);
create table orderspa (
    spaid varchar(10) REFERENCES spa(id),
    orderid varchar(10) REFERENCES spaorder(id),
    quantity int, 
    PRIMARY KEY (spaid, orderid)
);
create table blod (
    id varchar(10) PRIMARY KEY,
    content text, 
    author varchar(100),
    `timestamp` date
);
create table blogimages(
    blogid varchar(10), 
    imageurl varchar(200),
    PRIMARY KEY (blogid, imageurl)
);
create table admin (
    id varchar(100) PRIMARY KEY,
    pw varchar(100)
);	
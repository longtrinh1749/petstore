const dotenv = require('dotenv').config({path: '../.env'});

const USER = process.env.MYSQL_USERNAME || 'root';
const PASSWORD = process.env.MYSQL_ROOT_PASSWORD || 'root';
const HOST = "localhost";
const DB = process.env.MYSQL_DATABASE || 'petstoredb';

module.exports = {
    HOST,
    USER,
    PASSWORD,
    DB
}
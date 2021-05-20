const mysql = require('mysql2');
const dbConfig = require('../config/db.config');

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

connection.connect((error) => {
    if(error) throw error;
    console.log('Connect to database successfully.');
});

module.exports = connection;
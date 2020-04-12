const Sequelize = require('sequelize');
require('dotenv').config({ path: 'variables.env'});

// Option 1: Passing parameters separately
const db = new Sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASS, {
    host: process.env.BD_HOST,
    dialect: 'mysql',
    port: process.env.BD_PORT,
    operatorAliases: false,
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

//  permissions db
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'; // password FLUSH PRIVILEGES

// Option 2: Passing a connection URI
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

module.exports = db;
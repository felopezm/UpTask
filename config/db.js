const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const db = new Sequelize('updasknode', 'root', 'root', {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: '3306',
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

// Option 2: Passing a connection URI
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

module.exports = db;
const Sequelize = require('sequelize');
const db = require('../config/db');
const Projects = require('../models/Projects');
const bcrypt = require('bcrypt-nodejs');

const Users = db.define('users',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Add Email valid !'
            },
            notEmpty:{
                msg: 'The Email can not void'
            }            
        },
        unique: {
            args: true,
            msg: 'User Exist !'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'The Password can not void'
            }            
        }

    }
},{
    hooks: {
        beforeCreate(user){
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        }
    }
});

Users.hasMany(Projects);

module.exports = Users;
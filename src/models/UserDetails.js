const sequelize = require('../db/sequelize')
const jwt = require('express-jwt')
const md5 = require('md5')
const {Sequelize, Model, DataTypes} = require("sequelize");
const constants = require('../constants/constants')


const UserDetails = sequelize.define(constants.user_details, {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    salutation: {
        type: DataTypes.STRING
    },
    first_name: {
        type: DataTypes.STRING
    },
    middle_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING
    },
    photopath: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

module.exports = UserDetails
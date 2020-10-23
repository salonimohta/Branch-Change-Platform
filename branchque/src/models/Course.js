const sequelize = require('../db/sequelize')
const jwt = require('express-jwt')
const md5 = require('md5')
const {Sequelize, Model, DataTypes} = require("sequelize");
const constants = require('../constants/constants')

const Course = sequelize.define(constants.courses_database, {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    duration: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
})

module.exports = Course
const sequelize = require('../db/sequelize')
const jwt = require('express-jwt')
const md5 = require('md5')
const {Sequelize, Model, DataTypes} = require("sequelize");
const constants = require('../constants/constants')

const DepartmentDetails = sequelize.define(constants.cbcs_departments_database, {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.INTEGER
    },
    wef: {
        type: DataTypes.STRING
    },
    wet: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

module.exports = DepartmentDetails
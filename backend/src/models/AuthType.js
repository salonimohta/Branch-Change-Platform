const sequelize = require('../db/sequelize')
const jwt = require('express-jwt')
const md5 = require('md5')
const {Sequelize, Model, DataTypes} = require("sequelize");
const constants = require('../constants/constants')

const AuthType = sequelize.define(constants.user_auth_types_database, {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    auth_id: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

module.exports = AuthType
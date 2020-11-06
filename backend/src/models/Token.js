const sequelize = require('../db/sequelize')
const jwt = require('express-jwt')
const md5 = require('md5')
const {Sequelize, Model, DataTypes} = require("sequelize");
const constants = require('../constants/constants')

const Token = sequelize.define(constants.token_database, {
    id: {
        type: DataTypes.STRING,
    },
    token: {
        type: DataTypes.STRING,
        primaryKey: true

    }
}, {
    timestamps: false
});


module.exports = Token
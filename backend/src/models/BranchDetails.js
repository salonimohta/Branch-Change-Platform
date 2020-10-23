const sequelize = require('../db/sequelize')
const jwt = require('express-jwt')
const md5 = require('md5')
const {Sequelize, Model, DataTypes} = require("sequelize");
const constants = require('../constants/constants')

const BranchDetails = sequelize.define(constants.cbcs_branches_database, {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

module.exports = BranchDetails
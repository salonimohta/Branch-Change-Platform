const sequelize = require('../db/sequelize')
const jwt = require('express-jwt')
const md5 = require('md5')
const {Sequelize, Model, DataTypes} = require("sequelize");
const constants = require('../constants/constants')


const BranchChangeApplication = sequelize.define(constants.change_branch_option_database, {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    cb_log_id: {
        type: DataTypes.INTEGER
    },
    dept_id: {
        type: DataTypes.STRING,
        // references: 'cbcs_departments',
        // referencesKey: 'id'

    },
    branch_id: {
        type: DataTypes.STRING,
        // references: 'cbcs_branches',
        // referencesKey: 'id'
    },
    offered: {
        type: DataTypes.ENUM('0', '1')
    }
}, {
    timestamps: false
})

module.exports = BranchChangeApplication
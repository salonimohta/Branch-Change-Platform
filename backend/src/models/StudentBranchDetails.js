const sequelize = require('../db/sequelize')
const jwt = require('express-jwt')
const md5 = require('md5')
const {Sequelize, Model, DataTypes} = require("sequelize");
const constants = require('../constants/constants')
const StudentBranchDetails = sequelize.define(constants.change_branch_log_database, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        notNull: true,
        primaryKey: true,
        // references: 'change_branch_option',
        // referencesKey: 'cb_log_id'
    },
    admn_no: {
        type: DataTypes.STRING,
        // references: 'user_details',
        // referencesKey: 'id'
    },
    current_dept_id: {
        type: DataTypes.STRING,
        notNull: true
    },
    current_course_id: {
        type: DataTypes.STRING
    },
    current_branch_id: {
        type: DataTypes.STRING
    },
    session: {
        type: DataTypes.STRING
    },
    session_year: {
        type: DataTypes.STRING
    },
    acad_status: {
        type: DataTypes.STRING
    },
    acad_id: {
        type: DataTypes.STRING
    },
    acad_date_time: {
        type: DataTypes.DATE
    },
    timestamp: {
        type: DataTypes.DATE
    },
    ip: {
        type: DataTypes.STRING
    }


}, {
    timestamps: false
})

module.exports = StudentBranchDetails
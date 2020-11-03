const sequelize = require('../db/sequelize')
const jwt = require('express-jwt')
const md5 = require('md5')
const {Sequelize, Model, DataTypes} = require("sequelize");
const constants = require('../constants/constants')


const SubmissionDeadline = sequelize.define(constants.submission_deadline_database, {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    deadline: {
        type: DataTypes.DATE
    },
    timestamp: {
        type: DataTypes.DATE,
        notNull: true
    }
}, {
    timestamps: false
})

module.exports = SubmissionDeadline
const sequelize = require('../db/sequelize')
const jwt = require('express-jwt')
const md5 = require('md5')
const {Sequelize, Model, DataTypes} = require("sequelize");
const constants = require('../constants/constants')

const UserLogin = sequelize.define(constants.user_login_database, {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING
    },
    auth_id: {
        type: DataTypes.STRING
    }, created_date: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});


UserLogin.findByCredentials = async function (username, password) {

    const user = await UserLogin.findOne({
        where: {
            id: {[Sequelize.Op.like]: username.trim()}
        }
    })

    if (!user) {
        throw new Error('Unable to login')
    }
    const salt = 'ISM'
    const created_date = user.created_date
    const year = new Date(created_date)
    const tempHash = md5(md5(password) + year.getFullYear().toString() + salt)
    if (tempHash !== user.password) {
        throw new Error('Unable to login')
    }
    user.hashedPass = tempHash

    return user
}



module.exports = UserLogin
const sequelize = require('../db/sequelize')
const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const controller = require('../constrollers/user')
const router = new express.Router()


router.post('/users/login', controller.login)



module.exports = router
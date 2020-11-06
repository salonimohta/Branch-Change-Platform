const jwt = require('jsonwebtoken')
const constants = require('../constants/constants')
const UserLogin = require('../models/UserLogin')
const Token = require('../models/Token')

const auth = async (req, res, next) => {
    try {

        // const token = await req.cookies['t']
        const token = req.header('Authorization').replace('Bearer ','')
        const decodedToken = await jwt.verify(token, constants.jwtKey)
        const isValid = await Token.findOne({
            where : {
                token: token
            }
        })
        if(!isValid) {
            throw new Error("Authentication failed")
        }
        const user = await UserLogin.findOne({
            where: {
                id: decodedToken._id,
                password: decodedToken._password
            }
        })
        if (!user) {
            throw new Error('Authentication failed')
        }
        req.user = user
        req.token = token
        next()
    } catch (e) {
        res.status(401).send({error: "Authentication required"})
    }

}

module.exports = auth
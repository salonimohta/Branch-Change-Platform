const jwt = require('jsonwebtoken')
const constants = require('../constants/constants')
const UserLogin = require('../models/UserLogin')


const auth = async (req, res, next) => {
    try{

        const token = await req.cookies['t']
        const decodedToken = await jwt.verify(token, constants.jwtKey)
        const user = await UserLogin.findOne({
            where: {
                id: decodedToken._id,
                password: decodedToken._password
            }
        })
        if(!user){
            throw new Error('Authentication failed')
        }
        req.user = user
        req.token = token
        next()
    } catch(e){
        res.status(401).send({error: "Authentication required"})
    }

}

module.exports = auth
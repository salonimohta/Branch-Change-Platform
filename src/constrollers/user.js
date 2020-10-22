const express = require('express')
// const {UserLogin, UserDetails, AuthType, BranchDetails, Course, DepartmentDetails, StudentBranchDetails, BranchChangeApplication} = require('../models/user')
const auth = require('../middleware/auth')
const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken')
const UserLogin = require('../models/UserLogin')
const UserDetails = require('../models/UserDetails')
const AuthType = require('../models/AuthType')
const BranchDetails = require('../models/BranchDetails')
const StudentBranchDetails = require('../models/StudentBranchDetails')
const DepartmentDetails = require('../models/DepartmentDetails')
const BranchChangeApplication = require('../models/BranchChangeApplication')
const Course = require('../models/Course')
module.exports.login = async (req, res) => {
    try {
        // console.log(await UserLogin.findAll())
        const user = await UserLogin.findByCredentials(req.body.username, req.body.password)
        // console.log(user)
        const token = jwt.sign({_id: user.id, _password: user.hashedPass, _key: '@bhijeet@'}, process.env.JWT_SECRET);
        const auths = await AuthType.findAll({where: {id: user.id}})
        if (user.auth_id === 'emp') {
            return res.send({
                user_details: await UserDetails.findOne({
                    where: {
                        id: user.id
                    }
                }),
                auths
            })
        }
        // console.log(await StudentBranchDetails.findAll())
        res.cookie("t", token, {expire: new Date() + 999})
        const studentBranchDetails = await StudentBranchDetails.findOne({
            where: {
                admn_no: user.id
            },
            include: {
                all: true,
                nested: true
            },
            raw: true,
            nest: true
        })
        // console.log(studentBranchDetails)
        const branchChangeApplication = await BranchChangeApplication.findAll({
            where: {
                cb_log_id: studentBranchDetails.id
            },
            include: {
                all: true,
                nested: false
            },
        })

        studentBranchDetails.branch = await BranchDetails.findOne({
            where: {
                id: studentBranchDetails.current_branch_id
            }
        })
        studentBranchDetails.department = await DepartmentDetails.findOne({
            where: {
                id: studentBranchDetails.current_dept_id
            }
        })
        studentBranchDetails.course = await Course.findOne({
            where: {
                id: studentBranchDetails.current_course_id
            }
        })

        await res.send({studentBranchDetails, branchChangeApplication, auths})
    } catch (e) {
        res.status(400).send(e)
    }
}

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
const constants = require('../constants/constants')

module.exports.login = async (req, res) => {
    try {
        // console.log(await UserLogin.findAll())
        const user = await UserLogin.findByCredentials(req.body.username, req.body.password)
        // console.log(user)
        const token = jwt.sign({
            _id: user.id,
            _password: user.hashedPass,
            // _key: constants.jwtKey
        }, process.env.JWT_SECRET);
        const auths = await AuthType.findAll({where: {id: user.id}})
        res.cookie("t", token, {expire: new Date() + 999})
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

module.exports.viewBranchApplication = async (req, res, next) => {
    try {
        const studentBranchDetails = await StudentBranchDetails.findOne({
            where: {
                admn_no: req.user.id
            }
        })
        if (!studentBranchDetails) {
            return res.status(404).send()
        }
        const branchChangeApplications = await BranchChangeApplication.findAll({
            where: {
                cb_log_id: studentBranchDetails.id
            },
            raw: true
        })
        let completeBranchChangeApplications = []

        for (let i = 0; i < branchChangeApplications.length; i++) {
            const departmentDetails = await DepartmentDetails.findOne({
                where: {
                    id: branchChangeApplications[i].dept_id
                }
            })
            const branchDetails = await BranchDetails.findOne({
                where: {
                    id: branchChangeApplications[i].branch_id
                }
            })
            completeBranchChangeApplications.push({
                departmentDetails,
                branchDetails,
                branchChangeApplications: branchChangeApplications[i]
            })
        }
        res.send({completeBranchChangeApplications})
    } catch (e) {
        res.status(500).send({e, message: 'Some internal error occurred'})
    }
}

module.exports.logout = async (req, res) => {
    try {
        await res.clearCookie('t')
        res.send({message: 'we logged you out'})
    } catch (e) {
        res.status(500).send({e, message: 'Some internal error occurred'})
    }
}
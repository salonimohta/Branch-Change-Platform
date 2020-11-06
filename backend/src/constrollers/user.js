const express = require('express')
// const {UserLogin, UserDetails, AuthType, BranchDetails, Course, DepartmentDetails, StudentBranchDetails, BranchChangeApplication} = require('../models/user')
const auth = require('../middleware/auth')
const expressJwt = require('express-jwt')
const sequelize = require('../db/sequelize')
const {Sequelize, Model, DataTypes} = require("sequelize");
const jwt = require('jsonwebtoken')
const UserLogin = require('../models/UserLogin')
const UserDetails = require('../models/UserDetails')
const AuthType = require('../models/AuthType')
const BranchDetails = require('../models/BranchDetails')
const StudentBranchDetails = require('../models/StudentBranchDetails')
const DepartmentDetails = require('../models/DepartmentDetails')
const BranchChangeApplication = require('../models/BranchChangeApplication')
const Course = require('../models/Course')
const SubmissionDeadline = require('../models/SubmissionDeadline')
const Token = require('../models/Token')
const constants = require('../constants/constants')

const checkAdmin = async (req, res) => {
    const auths = await AuthType.findAll({
        where: {
            id: req.user.id
        }
    })
    let isAdmin = false
    await auths.forEach((auth) => {
        isAdmin |= auth.auth_id === constants.branch_allocator_admin
        // console.log(auth.auth_id)
    })
    // console.log(isAdmin)
    return isAdmin
    // return res.send({isAdmin})
    //
    // if (isAdmin === false) {
    //     res.status(404).send({message: "You might not be the admin"})
    //
    // }
}


module.exports.login = async (req, res) => {
    try {
        // console.log(await UserLogin.findAll())
        const user = await UserLogin.findByCredentials(req.body.username, req.body.password)
        const token = jwt.sign({
            _id: user.id,
            _password: user.hashedPass,
            // _key: constants.jwtKey
        }, process.env.JWT_SECRET);
        const auths = await AuthType.findAll({where: {id: user.id}})
        // res.cookie("t", token, {expire: new Date() + 999})
        await Token.create({
            id: user.id,
            token: token
        })
        if (user.auth_id === 'emp') {
            return res.send({
                user_details: await UserDetails.findOne({
                    where: {
                        id: user.id
                    }
                }),
                auths,
                token
            })
        }
        const studentBranchDetails = await StudentBranchDetails.findOne({
            where: {
                admn_no: user.id
            },
            include: {
                all: true,
                nested: true
            },
            order: [['timestamp', 'DESC']],

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
        await res.send({studentBranchDetails, branchChangeApplication, auths, token})
    } catch (e) {
        res.status(400).send(e)
    }
}

const attachDepartmentAndBranchDetails = async function (branchChangeApplications) {

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
            branchChangeApplication: branchChangeApplications[i]
        })
    }
    return completeBranchChangeApplications
}


module.exports.branches = async (req, res) => {
    try {
        const u = await BranchDetails.findAll()
        res.send({u})
    } catch (e) {
        res.status(500).send()
    }

}

/*
module.exports.viewAllBranchApplications = async (req, res) => {
    try {
        const isAdmin = await checkAdmin(req)
        // const auths = await AuthType.findAll({
        //     where: {
        //         id: req.user.id
        //     }
        // })
        // let isAdmin = false
        // await auths.forEach((auth) => {
        //     isAdmin |= auth.auth_id === constants.branch_allocator_admin
        //     // console.log(auth.auth_id)
        // })
        // // return res.send({isAdmin})

        if (isAdmin === false) {
            return res.status(404).send({message: "You might not be the admin"})
        }
        // console.log("You")
        // let u = await BranchChangeApplication.findAll({
        //     group: ['cb_log_id']
        // })
        // res.send({u})
        let branchChangeApplications = await BranchChangeApplication.findAll({
            raw: true
        })
        branchChangeApplications = await attachDepartmentAndBranchDetails(branchChangeApplications)
        // let completeBranchChangeApplications = []
        for (let i = 0; i < branchChangeApplications.length; i++) {
            // console.log(branchChangeApplications[i].branchChangeApplication.cb_log_id)
            const studentBranchDetails = await StudentBranchDetails.findOne({
                where: {
                    id: branchChangeApplications[i].branchChangeApplication.cb_log_id
                },
                order: [['timestamp', 'DESC']],
                raw: true
            })

            if (branchChangeApplications[i].branchChangeApplication.offered === '1') {
                for (let j = 0; j < branchChangeApplications.length; j++) {
                    if (branchChangeApplications[i].branchChangeApplication.cb_log_id === branchChangeApplications[j].branchChangeApplication.cb_log_id) {
                        branchChangeApplications[j].flag = true
                    }

                }
            }
            else if(!branchChangeApplications[i].flag) {
                branchChangeApplications[i].flag = false
            }
            branchChangeApplications[i].studentBranchDetails = studentBranchDetails
        }
        res.send({branchChangeApplications})
    } catch (e) {
        res.status(500).send()
    }
}
*/

module.exports.viewAllBranchApplications = async (req, res) => {
    try {
        const isAdmin = await checkAdmin(req)
        if (isAdmin === false) {
            return res.status(404).send({message: "You might not be the admin"})
        }
        const allIds = await BranchChangeApplication.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('cb_log_id')), 'cb_log_id'],
            ],
            raw: true
        })
        let branchChangeApplications = []
        for (let i = 0; i < allIds.length; i++) {
            branchChangeApplications.push({})
            branchChangeApplications[i].applications = await BranchChangeApplication.findAll({
                where: {
                    cb_log_id: allIds[i].cb_log_id
                },
                raw: true
            })
            for (let j = 0; j < branchChangeApplications[i].applications.length; j++) {
                branchChangeApplications[i].applications[j].branchDetails = await BranchDetails.findOne({
                    where: {
                        id: branchChangeApplications[i].applications[j].branch_id
                    }
                })
                branchChangeApplications[i].applications[j].departmentDetails = await DepartmentDetails.findOne({
                    where: {
                        id: branchChangeApplications[i].applications[j].dept_id
                    }
                })
            }
            const studentDetails = await StudentBranchDetails.findOne({
                where: {
                    id: allIds[i].cb_log_id
                }
            })
            if (!studentDetails) {
                continue
            }
            const studentBranch = await StudentBranchDetails.findAll({
                where: {
                    admn_no: studentDetails.admn_no
                },
                order: [['timestamp', 'DESC']],
                raw: true

            })
            branchChangeApplications[i].approvedFlag = studentBranch.length >= 2
            branchChangeApplications[i].currentDetails = await studentBranch[0]
            console.log(branchChangeApplications[i].currentDetails.current_branch_id)
            branchChangeApplications[i].currentDetails.branchDetails = await BranchDetails.findOne({
                where: {
                    id: branchChangeApplications[i].currentDetails.current_branch_id
                }
            })
            branchChangeApplications[i].currentDetails.departmentDetails = await DepartmentDetails.findOne({
                where: {
                    id: branchChangeApplications[i].currentDetails.current_dept_id
                }
            })
        }
        res.send({branchChangeApplications})
    } catch (e) {
        res.status(500).send({
            error: e,
            msg: e.toString()
        })
    }
}

module.exports.viewBranchApplication = async (req, res) => {
    try {
        const studentBranchDetails = await StudentBranchDetails.findOne({
            where: {
                admn_no: req.user.id
            },
            order: [['timestamp', 'DESC']],
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
        const completeBranchChangeApplications = await attachDepartmentAndBranchDetails(branchChangeApplications)
        res.send({completeBranchChangeApplications})
    } catch (e) {
        res.status(500).send({e, message: 'Some internal error occurred'})
    }
}


module.exports.getResults = async (req, res) => {
    try {
        const studentBranchDetails = await StudentBranchDetails.findAll({
            where: {
                admn_no: req.user.id
            },
            order: [['timestamp', 'DESC']]
        })
        if (studentBranchDetails.length < 2) {
            return res.status(404).send({error: "Result has not been declared or you might not have been allotted any new branch"})
        }
        let result = {
            admn_no: req.user.id,
            // offeredBranch: studentBranchDetails[0].current_branch_id,
            // previousBranch: studentBranchDetails[1].current_branch_id,
            // offeredDepartment: studentBranchDetails[0].current_dept_id,
            // previousDepartment: studentBranchDetails[1].current_dept_id,
            // offeredCourse: studentBranchDetails[0].current_course_id,
            // previousCourse: studentBranchDetails[0].current_course_id
        }
        result.offeredBranch = await BranchDetails.findOne({
            where: {
                id: studentBranchDetails[0].current_branch_id
            }
        })

        result.previousBranch = await BranchDetails.findOne({
            where: {
                id: studentBranchDetails[1].current_branch_id
            }
        })

        result.offeredDepartment = await DepartmentDetails.findOne({
            where: {
                id: studentBranchDetails[0].current_dept_id
            }
        })
        result.previousDepartment = await DepartmentDetails.findOne({
            where: {
                id: studentBranchDetails[1].current_dept_id
            }
        })
        result.offeredCourse = await Course.findOne({
            where: {
                id: studentBranchDetails[0].current_course_id
            }
        })
        result.previousCourse = await Course.findOne({
            where: {
                id: studentBranchDetails[0].current_course_id
            }
        })
        result.branchChangeApplication = await BranchChangeApplication.findAll({
            where: {
                cb_log_id: studentBranchDetails[1].id
            }
        })
        res.send({result})
    } catch (e) {
        res.status(500).send({
            error: e,
            msg: e.toString()
        })
    }
}


module.exports.getSubmissionDeadline = async (req, res) => {
    try {
        // const isAdmin = await checkAdmin(req)
        //
        // // const auths = await AuthType.findAll({
        // //     where: {
        // //         id: req.user.id
        // //     }
        // // })
        // // let isAdmin = false
        // // await auths.forEach((auth) => {
        // //     isAdmin |= auth.auth_id === constants.branch_allocator_admin
        // //     // console.log(auth.auth_id)
        // // })
        // // // return res.send({isAdmin})
        //
        // if (isAdmin === false) {
        //     return res.status(404).send({message: "You might not be the admin"})
        // }
        const deadline = await SubmissionDeadline.findOne({
            order: [['timestamp', 'DESC']]
        })
        res.send({deadline})
    } catch (e) {
        res.status(500).send({e})
    }
}


module.exports.setSubmissionDeadline = async (req, res) => {
    try {
        const isAdmin = await checkAdmin(req)
        // console.log(isAdmin)
        if (isAdmin === false) {
            return res.status(404).send({message: "You might not be the admin"})
        }
        //     const auths = await AuthType.findAll({
        //         where: {
        //             id: req.user.id
        //         }
        //     })
        //     let isAdmin = false
        //     await auths.forEach((auth) => {
        //         isAdmin |= auth.auth_id === constants.branch_allocator_admin
        //         // console.log(auth.auth_id)
        //     })
        //     // return res.send({isAdmin})
        //
        //     if (isAdmin === false) {
        //         return res.status(404).send({message: "You might not be the admin"})
        //     }
        // console.log("yeo")
        // console.log(req.body.deadline)
        const d1 = new Date(Date.now())
        const d2 = new Date(req.body.deadline.toString())
        // if (Date.now() > req.body.deadline) {
        //     throw new Error("History")
        // }
        // console.log(d1, d2)
        if (d1 > d2) {
            // console.log("less")
            throw new Error("History")
        }
        const deadline = await SubmissionDeadline.create({
            timestamp: Date.now(),
            deadline: req.body.deadline
            // deadline: Date.now()
        })
        res.send({deadline})
    } catch (e) {
        res.status(500).send({e, msg: e.toString()})
    }
}


module.exports.submitApplication = async (req, res) => {
    try {
        const allRecords = await StudentBranchDetails.findAll({
            where: {
                admn_no: req.user.id
            }
        })
        // console.log(allRecords)
        if (allRecords.length >= 2) {
            throw new Error("You have already been offered a branch.")
        }
        const studentBranchDetails = await StudentBranchDetails.findOne({
            where: {
                admn_no: req.user.id
            },
            order: [['timestamp', 'DESC']],
        })
        const branchChangeApplication = await BranchChangeApplication.findAll({
            where: {
                cb_log_id: studentBranchDetails.id
            },
            raw: true
        })
        const hasAlreadyApplied = branchChangeApplication.length !== 0
        if (hasAlreadyApplied) {
            return res.status(400).send({error: "you have already applied"})
        }
        const optionsArray = req.body.options
        for (let i = 0; i < optionsArray.length; i++) {
            optionsArray[i].cb_log_id = studentBranchDetails.id
        }
        // const u = await BranchChangeApplication.create({
        //     // id: 1212,
        //     cb_log_id: optionsArray[0].cb_log_id,
        //     dept_id: optionsArray[0].dept_id,
        //     course_id: optionsArray[0].course_id,
        //     branch_id: optionsArray[0].branch_id,
        //     offered: '0'
        // }).then(x => res.send({
        //
        // }))


        const insertedData = await BranchChangeApplication.bulkCreate(optionsArray, {})

        res.send({msg: "Successfully submitted application", insertedData})


    } catch (e) {
        res.status(500).send({e: e, msg: e.toString()})
    }
}

module.exports.logout = async (req, res) => {
    try {
        // await res.clearCookie('t')
        await Token.destroy({
            where: {
                token: req.token
            }
        })
        res.send({message: 'we logged you out'})
    } catch (e) {
        res.status(500).send({e, message: 'Some internal error occurred'})
    }
}


module.exports.setOffered = async (req, res) => {
    try {
        const isAdmin = await checkAdmin(req)
        if (isAdmin === false) {
            return res.status(404).send({message: "You might not be the admin"})
        }
        const branchChangeApplication = await BranchChangeApplication.findOne({
            where: {
                id: parseInt(req.body.id)
            }
        })
        if (branchChangeApplication === null) {
            throw new Error("No record found for the offered choice.")
        }
        // console.log(branchChangeApplication)
        const isAlreadyOffered = await BranchChangeApplication.findOne({
            where: {
                cb_log_id: branchChangeApplication.cb_log_id,
                offered: '1'
            }
        }).then((r) => r !== null)
        // console.log(isAlreadyOffered)
        if (isAlreadyOffered) {
            throw new Error("Student already offered a course of their choice")
        }
        await BranchChangeApplication.update({
            offered: '1'
        }, {
            where: {
                id: parseInt(req.body.id)
            }
        })
        const newStudentBranchDetails = await StudentBranchDetails.findOne({
            where: {
                id: branchChangeApplication.cb_log_id
            },
            order: [['timestamp', 'DESC']],

            raw: true,
            nest: false
        })
        newStudentBranchDetails.current_dept_id = branchChangeApplication.dept_id
        newStudentBranchDetails.current_course_id = branchChangeApplication.course_id
        newStudentBranchDetails.current_branch_id = branchChangeApplication.branch_id
        newStudentBranchDetails.timestamp = await Date.now()
        newStudentBranchDetails.id = null
        const offeredBranchDetails = await StudentBranchDetails.build(newStudentBranchDetails)
        await offeredBranchDetails.save()
        res.send({msg: "done", offeredBranchDetails})
    } catch (e) {
        res.status(500).send({e: e.toString(), msg: e})
    }
}
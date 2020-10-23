const sequelize = require('../db/sequelize')
const jwt = require('express-jwt')
const md5 = require('md5')
const {Sequelize, Model, DataTypes} = require("sequelize");
const UserLogin = require('./UserLogin')
const UserDetails = require('./UserDetails.js')
const AuthType = require('./AuthType')
const BranchDetails = require('./BranchDetails')
const DepartmentDetails = require('./DepartmentDetails')
const StudentBranchDetails = require('./StudentBranchDetails')
const BranchChangeApplication = require('./BranchChangeApplication')
const Course = require('./Course')


//
// const UserLogin = sequelize.define("users", {
//     id: {
//         type: DataTypes.STRING,
//         primaryKey: true
//     },
//     password: {
//         type: DataTypes.STRING
//     },
//     auth_id: {
//         type: DataTypes.STRING
//     }, created_date: {
//         type: DataTypes.DATE
//     },
//     status: {
//         type: DataTypes.STRING
//     }
// }, {
//     timestamps: false
// });

//
// const UserDetails = sequelize.define('user_details', {
//     id: {
//         type: DataTypes.STRING,
//         primaryKey: true
//     },
//     salutation: {
//         type: DataTypes.STRING
//     },
//     first_name: {
//         type: DataTypes.STRING
//     },
//     middle_name: {
//         type: DataTypes.STRING
//     },
//     last_name: {
//         type: DataTypes.STRING
//     },
//     category: {
//         type: DataTypes.STRING
//     },
//     photopath: {
//         type: DataTypes.STRING
//     }
// }, {
//     timestamps: false
// })

//
// const AuthType = sequelize.define('user_auth_types', {
//     id: {
//         type: DataTypes.STRING,
//         primaryKey: true
//     },
//     auth_id: {
//         type: DataTypes.STRING
//     }
// }, {
//     timestamps: false
// })
//
// const BranchDetails = sequelize.define('cbcs_branches', {
//     id: {
//         type: DataTypes.STRING,
//         primaryKey: true
//     },
//     name: {
//         type: DataTypes.STRING
//     }
// }, {
//     timestamps: false
// })

// const DepartmentDetails = sequelize.define('cbcs_departments', {
//     id: {
//         type: DataTypes.STRING,
//         primaryKey: true
//     },
//     name: {
//         type: DataTypes.STRING
//     },
//     type: {
//         type: DataTypes.STRING
//     },
//     status: {
//         type: DataTypes.INTEGER
//     },
//     wef: {
//         type: DataTypes.STRING
//     },
//     wet: {
//         type: DataTypes.STRING
//     }
// }, {
//     timestamps: false
// })
//
// const StudentBranchDetails = sequelize.define('change_branch_log', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         notNull: true,
//         primaryKey: true,
//         // references: 'change_branch_option',
//         // referencesKey: 'cb_log_id'
//     },
//     admn_no: {
//         type: DataTypes.STRING,
//         // references: 'user_details',
//         // referencesKey: 'id'
//     },
//     current_dept_id: {
//         type: DataTypes.STRING,
//         notNull: true
//     },
//     current_course_id: {
//         type: DataTypes.STRING
//     },
//     current_branch_id: {
//         type: DataTypes.STRING
//     },
//     session: {
//         type: DataTypes.STRING
//     },
//     session_year: {
//         type: DataTypes.STRING
//     },
//     acad_status: {
//         type: DataTypes.STRING
//     },
//     acad_id: {
//         type: DataTypes.STRING
//     },
//     acad_date_time: {
//         type: DataTypes.DATE
//     },
//     timestamp: {
//         type: DataTypes.DATE
//     },
//     ip: {
//         type: DataTypes.STRING
//     }
//
//
// }, {
//     timestamps: false
// })
//
// const BranchChangeApplication = sequelize.define('change_branch_option', {
//     id: {
//         type: DataTypes.STRING,
//         primaryKey: true
//     },
//     cb_log_id: {
//         type: DataTypes.INTEGER
//     },
//     dept_id: {
//         type: DataTypes.STRING,
//         // references: 'cbcs_departments',
//         // referencesKey: 'id'
//
//     },
//     branch_id: {
//         type: DataTypes.STRING,
//         // references: 'cbcs_branches',
//         // referencesKey: 'id'
//     },
//     offered: {
//         type: DataTypes.ENUM('0', '1')
//     }
// }, {
//     timestamps: false
// })

// const Course = sequelize.define('courses', {
//     id: {
//         type: DataTypes.STRING,
//         primaryKey: true
//     },
//     name: {
//         type: DataTypes.STRING
//     },
//     duration: {
//         type: DataTypes.INTEGER
//     }
// },{
//     timestamps: false
// })
//
// UserLogin.findByCredentials = async function (username, password) {
//
//     const user = await UserLogin.findOne({
//         where: {
//             id: {[Sequelize.Op.like]: username.trim()}
//         }
//     })
//
//     if (!user) {
//         throw new Error('Unable to login')
//     }
//     const salt = 'ISM'
//     const created_date = user.created_date
//     const year = new Date(created_date)
//     const tempHash = md5(md5(password) + year.getFullYear().toString() + salt)
//     if (tempHash !== user.password) {
//         throw new Error('Unable to login')
//     }
//     user.hashedPass = tempHash
//
//     return user
// }








module.exports = {UserLogin, UserDetails, AuthType, BranchDetails, Course, StudentBranchDetails, BranchChangeApplication, DepartmentDetails}

require('dotenv').config({path: './.env'})
const express = require('express')
const sequelize = require('./db/sequelize')
const userRouter = require('./router/user')
// // const {UserLogin, UserDetails, AuthType, BranchDetails, Course, DepartmentDetails, StudentBranchDetails, BranchChangeApplication} = require('./models/user')
// const {Course} = require('./models/user')
const UserLogin = require('./models/UserLogin')
const UserDetails = require('./models/UserDetails')
const AuthType = require('./models/AuthType')
const BranchDetails = require('./models/BranchDetails')
const StudentBranchDetails = require('./models/StudentBranchDetails')
const DepartmentDetails = require('./models/DepartmentDetails')
const BranchChangeApplication = require('./models/BranchChangeApplication')
const Course = require('./models/Course')
const SubmissionDeadline = require('./models/SubmissionDeadline')
const Token = require('./models/Token')
const cors = require('cors')
// const taskRouter = require('./routers/task')
const app = express()
app.use(cors())
const port = process.env.PORT
const cookieParser = require("cookie-parser");
app.use(cookieParser());


// app.use((req,res, next) => {
//     console.log(req.method, req.path)
//     next()
// })

app.use(express.json())
app.use('/api', userRouter)
// app.use(taskRouter)


app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        await UserLogin.sync()
        await UserDetails.sync()
        await AuthType.sync()
        await BranchDetails.sync()
        await Course.sync()
        await DepartmentDetails.sync()
        await StudentBranchDetails.sync()
        await BranchChangeApplication.sync()
        await SubmissionDeadline.sync()
        await Token.sync()

        await BranchChangeApplication.belongsTo(BranchDetails, {foreignKey: 'branch_id', targetKey: 'id'})
        await BranchDetails.hasMany(BranchChangeApplication, {foreignKey: 'branch_id', sourceKey: 'id'})

        await BranchChangeApplication.belongsTo(DepartmentDetails, {foreignKey: 'dept_id', targetKey: 'id'})
        await DepartmentDetails.hasMany(BranchChangeApplication, {foreignKey: 'dept_id', sourceKey: 'id'})


        await UserDetails.hasOne(StudentBranchDetails, {foreignKey: 'id', sourceKey: 'id'})
        await StudentBranchDetails.belongsTo(UserDetails, {foreignKey: 'admn_no', targetKey: 'id'})
        console.log("Listening on port: " + port)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({_id:'absccc'}, 'thisismynewcourse')
//     console.log(token)
// }
//
// myFunction(AC)




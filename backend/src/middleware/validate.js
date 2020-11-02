const DepartmentDetails = require('../models/DepartmentDetails')
const BranchDetails = require('../models/BranchDetails')
const Course = require('../models/Course')
const validate = async (req, res, next) => {
    try {
        // console.log(req.body)
        const {options, number_of_options} = req.body
        if (options.length !== number_of_options) {
            throw new Error("The number of options is different from the options filled.")
        }
        if(options.length > 5) {
            throw new Error("You cannot submit more than 5 requests")
        }
        for (let i = 0; i < options.length; i++) {
            const dept = await DepartmentDetails.findOne({
                where: {
                    id: options[i].dept_id
                }
            })
            const branch = await BranchDetails.findOne({
                where: {
                    id: options[i].branch_id
                }
            })
            const course = await Course.findOne({
                where: {
                    id: options[i].course_id
                }
            })
            if (!dept) {
                throw new Error(`There is no such dept for ${options[i].dept_id}`)
            }
            if (!course) {
                throw new Error(`There is no such dept for ${options[i].course_id}`)
            }
            if (!branch) {
                throw new Error(`There is no such dept for ${options[i].branch_id}`)
            }
        }
        next()
    } catch (e) {
        res.status(401).send({
            error: "Invalid data",
            msg: e.toString()
        })
    }

}

module.exports = validate
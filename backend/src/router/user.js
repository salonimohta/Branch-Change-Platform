const sequelize = require('../db/sequelize')
const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const controller = require('../constrollers/user')
const validate = require('../middleware/validate')
const router = new express.Router()


router.post('/users/login', controller.login)
router.post('/users/logout',auth, controller.logout)
router.get('/users/view-branch-application', auth, controller.viewBranchApplication)
router.get('/users/view-all-branch-applications', auth, controller.viewAllBranchApplications)
router.get('/branches', auth, controller.branches)
router.post('/users/submit-application', [auth, validate], controller.submitApplication)
router.get('/users/submission-deadline', auth, controller.getSubmissionDeadline)
router.post('/users/submission-deadline', auth, controller.setSubmissionDeadline)
router.post('/users/set-offered', auth, controller.setOffered)
router.get('/users/get-results', auth, controller.getResults)

// router.post('/users/submit-application', auth, controller.submitApplication)

module.exports = router
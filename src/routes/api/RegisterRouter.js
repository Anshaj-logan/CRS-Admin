const express = require('express')
const bcrypt = require('bcryptjs')
const loginData = require('../../models/login')


const login = require('../../models/login')
const stdReg = require('../../models/register')
const cmpReg = require('../../models/Cmpreg')



const RegisterRouter = express.Router()

RegisterRouter.post('/student', async (req, res) => {
    try {
        const userExists = await login.findOne({ username: req.body.username })


        if (userExists) {
            return res.status(400).json({ success: false, error: true, message: 'user already registered' })
        }
        console.log(req.body.password);
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const oldPhone = await stdReg.findOne({ contact: req.body.contact })
        if (oldPhone) {
            return res.status(400).json({ success: false, error: true, message: 'phone number already exists ' })
        }
        const oldEmail = await stdReg.findOne({ email: req.body.email })
        if (oldEmail) {
            return res.status(400).json({ success: false, error: true, message: 'email already exists ' })
        }
        var log = {
            username: req.body.username,
            password: hashedPassword,
            role: 1,
            status: 0,
        }
        const result = await login(log).save()
        var reg = {
            login_id: result._id,
            name: req.body.name,
            email: req.body.email,
            department: req.body.department,
            contact: req.body.contact,
            sslc_score: req.body.sslc_score,
            plustwo_score: req.body.plustwo_score,
            degree_score: req.body.degree_score,
            backlogs: req.body.backlogs,


        }
        const result2 = await stdReg(reg).save()
        res.status(201).json({
            success: true, error: false,
            result: result2,
            message: 'Successfully Registered'
        })

    }
    catch (err) {
        res.status(500).json({ success: false, error: true, message: 'Something Went Wrong' })
        console.log(err)
    }
})

RegisterRouter.post('/company', async (req, res) => {
    try {
        const userExists = await login.findOne({ username: req.body.username })


        if (userExists) {
            return res.status(400).json({ success: false, error: true, message: 'user already registered' })
        }
        console.log(req.body.password);
        const hashedPassword = await bcrypt.hash(req.body.password, 12)

        const oldPhone = await cmpReg.findOne({ contact: req.body.contact })
        if (oldPhone) {
            return res.status(400).json({ success: false, error: true, message: 'phone number already exists ' })
        }
        const oldEmail = await cmpReg.findOne({ email: req.body.email })
        if (oldEmail) {
            return res.status(400).json({ success: false, error: true, message: 'email already exists ' })
        }
        var log = {
            username: req.body.username,
            password: hashedPassword,
            role: 2,
            status: 0,
        }
        const result = await login(log).save()
        var reg = {
            login_id: result._id,
            company_name :req.body.company_name, 
            established:req.body.established,
            contact:req.body.contact,
            location:req.body.location,
            email: req.body.email,

        }
        const result2 = await cmpReg(reg).save()
        res.status(201).json({
            success: true, error: false,
            result: result2,
            message: 'Successfully Registered'
        })

    }
    catch (err) {
        res.status(500).json({ success: false, error: true, message: 'Something Went Wrong' })
        console.log(err)
    }
})
module.exports = RegisterRouter
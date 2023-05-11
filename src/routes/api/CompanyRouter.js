const express = require('express')
const company = require('../../models/Cmpreg')
const uploadpost = require('../../models/Addpost')
const User = require('../../models/register')
const uploadexam = require('../../models/UploadExam')
const interview = require('../../models/UploadInterview')
const uploadresult = require('../../models/UploadResult')






const CompanyRouter = express.Router()

CompanyRouter.get('/view-company', (req, res) => {
    company.find()
        .then((data) => {
            res.status(200).json({
                success: true,
                error: false,
                data: data
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "something wrong"
            })
        })

})

CompanyRouter.post('/upload-Post', async (req, res) => {

    try {
        const { login_id, job_title, descrption, package,vaccency,email,location } = req.body
        console.log(req.body);

        const result = await uploadpost.create({  login_id, job_title, descrption, package,vaccency,email,location  })
        if (result) {
            res.status(201).json({ success: true, error: false, message: "Job Added", details: result });
        }


    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }

})

CompanyRouter.get('/view-post', (req, res) => {
    uploadpost.aggregate([
        {
          '$lookup': {
            'from': 'cmpregister_tbs', 
            'localField': 'login_id', 
            'foreignField': 'login_id', 
            'as': 'company'
          }
        },
        {
            "$unwind":"$company"
        },
        {
            "$group":{
                '_id':"$_id",
                'job_title':{"$first":"$job_title"},
                'package':{"$first":"$package"},
                'email':{"$first":"$email"},
                'location':{"$first":"$location"},
                'company_name':{"$first":"$company.company_name"},
                'established':{"$first":"$company.established"},
                'contact':{"$first":"$company.contact"},
                'location':{"$first":"$company.location"},
            }
        }
      ])
        .then((data) => {
            res.status(200).json({
                success: true,
                error: false,
                data: data
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "something wrong"
            })
        })

})
CompanyRouter.get('/view-User', (req, res) => {
    User.find()
        .then((data) => {
            res.status(200).json({
                success: true,
                error: false,
                data: data
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "something wrong"
            })
        })

})

CompanyRouter.post('/upload-exam', async (req, res) => {

    try {
        const { login_id, user_id, date, time,link} = req.body
        console.log(req.body);

        const result = await uploadexam.create({  login_id, user_id, date, time,link  })
        if (result) {
            res.status(201).json({ success: true, error: false, message: "Exam Added", details: result });
        }


    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }

})

CompanyRouter.post('/upload-interview', async (req, res) => {

    try {
        const { login_id, user_id, date, time,link} = req.body
        console.log(req.body);

        const result = await interview.create({  login_id, user_id, date, time,link  })
        if (result) {
            res.status(201).json({ success: true, error: false, message: "Interview Added", details: result });
        }


    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }

})

CompanyRouter.get('/view-exam', (req, res) => {
    uploadexam.aggregate([
        {
          '$lookup': {
            'from': 'cmpregister_tbs', 
            'localField': 'login_id', 
            'foreignField': 'login_id', 
            'as': 'company'
          }
        },
        {
            "$unwind":"$company"
        },
        {
            "$group":{
                "_id":"$_id",
                "date":{"$first":"$date"},
                "time":{"$first":"$time"},
                "link":{"$first":"$link"},
                "company_name":{"$first":"$company.company_name"},
            }
        }
      ])
        .then((data) => {
            res.status(200).json({
                success: true,
                error: false,
                data: data
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "something wrong"
            })
        })

})

CompanyRouter.get('/view-interview', (req, res) => {
    interview.find()
        .then((data) => {
            res.status(200).json({
                success: true,
                error: false,
                data: data
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "something wrong"
            })
        })

})

CompanyRouter.post('/upload-result', async (req, res) => {

    try {
        const { login_id, user_id, date, mark} = req.body
        console.log(req.body);

        const result = await uploadresult.create({  login_id, user_id, date, mark  })
        if (result) {
            res.status(201).json({ success: true, error: false, message: "Result Added", details: result });
        }


    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }

})
CompanyRouter.get('/view-result', (req, res) => {
    uploadresult.aggregate([
        {
          '$lookup': {
            'from': 'cmpregister_tbs', 
            'localField': 'login_id', 
            'foreignField': 'login_id', 
            'as': 'company'
          }
        },
        {
            "$unwind":"$company"
        },
        {
            "$group":{
                "_id":"$_id",
                "date":{"$first":"$date"},
                "mark":{"$first":"$mark"},
                
                "company_name":{"$first":"$company.company_name"},
            }
        }
      ])
        .then((data) => {
            res.status(200).json({
                success: true,
                error: false,
                data: data
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "something wrong"
            })
        })

})

module.exports = CompanyRouter


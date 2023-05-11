const express = require('express')
const stud = require('../../models/register')
const applyexamm = require('../../models/Applyexam')





const StudentRouter = express.Router()

StudentRouter.get('/view-student-profile/:id', (req, res) => {
    const id = req.params.id
    stud.findOne({ login_id: id })
        .then(function (data) {
            if (data == 0) {
                return res.status(401).json({
                    success: false,
                    error: true,
                    message: "No Data Found!"
                })
            }
            else {
                return res.status(200).json({
                    success: true,
                    error: false,
                    data: data
                })
            }
        })

})

StudentRouter.post('/update-user-profile/:id', (req, res) => {
    const { name, backlogs, email, contact, degree_score,department,plustwo_score,sslc_score } = req.body
    const id = req.params.id
    console.log(id);
    stud.updateOne({ login_id: id }, { $set: {  name, backlogs, email, contact, degree_score,department,plustwo_score,sslc_score  } }).then((data) => {
        console.log(data);
        res.status(200).json({
            success: true,
            error: false,
            message: "Details updated"
        })

    }).catch(err => {
        return res.status(401).json({
            message: "Something went Wrong!"
        })
    })

})

StudentRouter.post('/apply-exam', async (req, res) => {

    try {
        const { login_id, name, department, company_id,contact,email } = req.body
        console.log(req.body);

        const result = await applyexamm.create({ login_id, name, department, company_id,contact,email })
        if (result) {
            res.status(201).json({ success: true, error: false, message: "Applied Successfully", details: result });
        }


    } catch (error) {
        res.status(500).json({ success: false, error: true, message: "Something went wrong" });
        console.log(error);
    }

})





module.exports = StudentRouter
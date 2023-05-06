const express = require('express')
const stdmodel = require('../models/stdnt')
// const stdmodel = require('.  ./models/stdnt')
const studentRouter = express.Router()
studentRouter.use(express.static('./public'))




studentRouter.get('/student',  async function (req, res) {
  const data=await registermodel.find()
  res.render('mng_std',{data})
  })
  studentRouter.get('/delete/:name',  async function (req, res) {
    const id=req.params.name
    try {
      const delete_data=await addntfcnmodel.deleteOne({_id:id})
      if (delete_data.deletedCount==1)
      {
        res.redirect("/student/student")
      }
    } catch (error) {
      
    }
    
  })






module.exports = studentRouter
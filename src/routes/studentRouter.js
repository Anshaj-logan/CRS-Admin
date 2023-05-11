const express = require('express')
const student = require('../models/register')
const login = require('../models/login')
const studentRouter = express.Router()
studentRouter.use(express.static('./public'))




studentRouter.get('/view_student',  async function (req, res) {
  const data = await  login.aggregate([
    {
        '$lookup': {
          'from': 'register_tbs', 
          'localField': '_id', 
          'foreignField': 'login_id', 
          'as': 'data'
        }
      },
    {
      "$unwind": "$data"
    },
    {
      "$group": {
        "_id": "$_id",
        "user_id": { "$first": "$data._id" },
        "name": { "$first": "$data.name" },
        "email": { "$first": "$data.email" },
        "phone": { "$first": "$data.contact" },
        "status": { "$first": "$status" },
      }
    }

  ])
  // res.json({data})
  res.render('mng_std',{data})
})


studentRouter.get('/delete/:id',  async function (req, res) {
  const id=req.params.id
  try {
    const delete_data=await student.deleteOne({login_id:id})
    if (delete_data.deletedCount===1)
    {
      const delete_data1=await login.deleteOne({_id:id})
      if(delete_data1.deletedCount===1){
        res.redirect("/student/view_student")
      }
      
    }
  } catch (error) {
    
  }
  
})


studentRouter.get("/approve/:id", async (req, res) => {
  const id = req.params.id
  console.log(id);
  login.updateOne({ _id: id }, { $set: { status: "1" } }).then((details) => {
      
      res.redirect('/student/view_student')
  })

});







module.exports = studentRouter
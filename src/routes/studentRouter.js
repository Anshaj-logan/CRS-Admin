const express = require('express')
const student = require('../models/register')
const login = require('../models/login')
const studentRouter = express.Router()
studentRouter.use(express.static('./public'))


studentRouter.post("/admin-login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username);

  try {
    const oldUser = await login.findOne({ username })
    console.log(oldUser);
    if (!oldUser) return res.redirect('/')
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
    console.log("user", isPasswordCorrect);

    if (!isPasswordCorrect) return res.redirect('/')

    if (oldUser.role === '0') {
            const admin = await login.findOne({ _id: oldUser._id })
            if (admin) {
                return res.redirect('/dashboard')
            }           
    }       
  } catch (error) {
      return res.status(500).redirect('/')
  }
})

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
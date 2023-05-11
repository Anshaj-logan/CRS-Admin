const express = require('express')
const companyRouter = express.Router()
const login = require('../models/login')
const company = require('../models/Cmpreg')
companyRouter.use(express.static('./public'))




companyRouter.get('/company', async function (req, res) {
  try {
    const data = await  login.aggregate([
      {
          '$lookup': {
            'from': 'cmpregister_tbs', 
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
          "company_name": { "$first": "$data.company_name" },
          "email": { "$first": "$data.email" },
          "phone": { "$first": "$data.contact" },
          "location": { "$first": "$data.location" },
          "status": { "$first": "$status" },
        }
      }
  
    ])
      res.render('mng_cmpny',{data})
      // res.json({data})
   
  
  } catch (error) {
    
  }
})


companyRouter.get('/delete/:id',  async function (req, res) {
  const id=req.params.id
  try {
    const delete_data=await company.deleteOne({login_id:id})
    if (delete_data.deletedCount===1)
    {
      const delete_data1=await login.deleteOne({_id:id})
      if(delete_data1.deletedCount===1){
        res.redirect("/company/company")
      }
      
    }
  } catch (error) {
    
  }
  
})


companyRouter.get("/approve/:id", async (req, res) => {
  const id = req.params.id
  console.log(id);
  login.updateOne({ _id: id }, { $set: { status: "1" } }).then((details) => {
      
      res.redirect('/company/company')
  })

});





module.exports = companyRouter
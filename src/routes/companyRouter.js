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
          "status": { "$first": "$status" },
        }
      }
  
    ])
      // res.render('mng_cmpny')
      res.json({data})
   
  
  } catch (error) {
    
  }
})





module.exports = companyRouter
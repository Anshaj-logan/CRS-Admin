const express = require('express')
const resultRouter = express.Router()
resultRouter.use(express.static('./public'))
const result = require('../models/UploadResult')




resultRouter.get('/result', async function (req, res) {
  try {
    const data = await result.aggregate([
      {
        '$lookup': {
          'from': 'cmpregister_tbs', 
          'localField': 'login_id', 
          'foreignField': 'login_id', 
          'as': 'company'
        }
      },
      {
        '$lookup': {
          'from': 'register_tbs', 
          'localField': 'user_id', 
          'foreignField': '_id', 
          'as': 'user'
        }
      },
      {
          "$unwind":"$company"
      },
      {
          "$unwind":"$user"
      },
      {
          "$group":{
              "_id":"$_id",
              "date":{"$first":"$date"},
              "mark":{"$first":"$mark"},
              "contact":{"$first":"$company.contact"},              
              "company_name":{"$first":"$company.company_name"},
              "user_name":{"$first":"$user.name"},
              "email":{"$first":"$user.email"},
              "contact":{"$first":"$user.contact"},
          }
      }
    ])
    if(data){
      // res.json({data})
      res.render('vwrslt',{data})
    }
 
  } catch (error) {
    
  }
    
  })




module.exports = resultRouter
const express = require('express')
const addntfcnmodel = require('../models/addntfcn')
const uploadexam = require('../models/UploadExam')
const interview = require('../models/UploadInterview')
const notificationRouter = express.Router()
notificationRouter.use(express.static('./public'))




notificationRouter.get('/ntfcn', function (req, res) {
    res.render('addntfcn')
  })
  notificationRouter.get('/view-exam-notification',async function (req, res) {
    try {
      const data=await uploadexam.aggregate([
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
      res.render('vwntfcn',{data})
      // res.json({data})
    } catch (error) {
      
    }
    
  })
  notificationRouter.get('/view-interview-notification',  async function (req, res) {
   
    try {
      const data=await interview.find()
      if (data)
      {
        res.render("viewinterview",{data})
      }
    } catch (error) {
      
    }
    
  })


  notificationRouter.post('/not',function(req,res){
    console.log(req.body);
    let a=new Date();
    const data={
      notification:req.body.not,
      date:a,
      
    }
    addntfcnmodel(data).save().then((data)=>{
    res.redirect('/notfcn/vwntfcn')
    console.log(data);

   })
  })



module.exports = notificationRouter
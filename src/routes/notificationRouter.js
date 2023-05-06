const express = require('express')
const addntfcnmodel = require('../models/addntfcn')
const notificationRouter = express.Router()
notificationRouter.use(express.static('./public'))




notificationRouter.get('/ntfcn', function (req, res) {
    res.render('addntfcn')
  })
  notificationRouter.get('/vwntfcn',async function (req, res) {
    try {
      const data=await addntfcnmodel.find();
      res.render('vwntfcn',{data})
    } catch (error) {
      
    }
    
  })
  notificationRouter.get('/delete/:name',  async function (req, res) {
    const id=req.params.name
    try {
      const delete_data=await addntfcnmodel.deleteOne({_id:id})
      if (delete_data.deletedCount==1)
      {
        res.redirect("/notfcn/vwntfcn")
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
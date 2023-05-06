const express = require('express')
const registermodel = require('../models/register')
const registerRouter = express.Router()
registerRouter.use(express.static('./public'))

registerRouter.get('/reg', function (req, res) {
    res.render('fgfg')
  })

registerRouter.get('/vwreg',  async function (req, res) {
  try {
    const data=await registermodel.find()
    res.render('mng_std',{data})
  } catch (error) {
    
  }
    
  })

registerRouter.post('/reggadd',  function(req,res){
        const data={
          name:req.body.rname,
          department:req.body.rdept,
          year:req.body.ryear,
          Email:req.body.remail,
          Contact:req.body.rcontact,
          SSLC_Score:req.body.rsslc,
          PLusTwo_Score:req.body.rplustwo,
          Degree_Percentage:req.body.rdegree,
          NumberofBacklogs:req.body.rnum,
          CV:req.body.rcv,
          Action:req.body.ract,
           }
      registermodel(data).save().then((details)=>{
        res.status(200).json({
            success:true,
            error:false,
            data:details,
            message:"Registration"
        })
      })
    })
  




module.exports = registerRouter
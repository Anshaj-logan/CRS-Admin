const express = require('express')
const companyRouter = express.Router()
companyRouter.use(express.static('./public'))




companyRouter.get('/company', function (req, res) {
    res.render('mng_cmpny')
  })







module.exports = companyRouter
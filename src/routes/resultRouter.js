const express = require('express')
const resultRouter = express.Router()
resultRouter.use(express.static('./public'))




resultRouter.get('/result', function (req, res) {
    res.render('vwrslt')
  })




module.exports = resultRouter
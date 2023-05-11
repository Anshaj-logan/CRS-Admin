const express = require('express')
const upevntmodel = require('../models/uploadevents')
const eventRouter = express.Router()
eventRouter.use(express.static('./public'))
const multer = require('multer')



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../CRS-Client/public/event')
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })


eventRouter.get('/upload_events', function (req, res) {
  res.render('Uploadevent')
})
eventRouter.get('/vwevnt', async function (req, res) {
  try {
    const data = await upevntmodel.find();
    console.log("data", data);
    res.render('vwevent', { data })
  }
  catch (error) {

  }


})
eventRouter.get('/:id', async function (req, res) {
  const id = req.params.id
  try {
    const edit_data = await upevntmodel.findOne({ _id: id })

    res.render('editevnt', { edit_data })

  } catch (error) {

  }

})
eventRouter.get('/delete/:name', async function (req, res) {
  const id = req.params.name
  try {
    const delete_data = await upevntmodel.deleteOne({ _id: id })
    if (delete_data.deletedCount == 1) {
      res.redirect("/upload_events/vwevnt")
    }
  } catch (error) {

  }

})
eventRouter.post('/event', upload.single('pic'), function (req, res) {
  console.log(req.body);
  const data = {
    name: req.body.ev,
    date: req.body.date,
    time: req.body.time,
    venue: req.body.place,
    instructions: req.body.in,
    brochure: req.file.filename
  }
  upevntmodel(data).save().then((data) => {
    console.log(data);
    res.redirect('/upload_events/vwevnt')
  })
})

eventRouter.post('/editevent', async function (req, res) {

  console.log(req.body);
  const id = req.body._id
  const data = {
    name: req.body.ev,
    date: req.body.date,
    time: req.body.time,
    venue: req.body.place,
    instructions: req.body.in,
  }
  console.log(id);
  upevntmodel.updateOne({ _id: id }, { $set: data }).then((response) => {
    console.log(id);
    res.redirect('/upload_events/vwevnt')
  })
})
module.exports = eventRouter
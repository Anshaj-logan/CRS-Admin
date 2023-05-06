const express = require('express')
const mongoose = require('mongoose')
const studentRouter = require('./src/routes/studentRouter')
const companyRouter = require('./src/routes/companyRouter')
const eventRouter = require('./src/routes/eventRouter')
const resultRouter = require('./src/routes/resultRouter')
const app = express()
var bodyParser = require('body-parser')
const notificationRouter = require('./src/routes/notificationRouter')
const registerRouter = require('./src/routes/registerRouter')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./public'))
app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use('/register',registerRouter)

app.use('/student',studentRouter)
app.use('/company',companyRouter)  
app.use('/upload_events',eventRouter)
app.use('/notfcn',notificationRouter)
app.use('/result',resultRouter)




app.get('/login', function (req, res) {
  res.send('Login page')
})
app.get('/reg', function (req, res) {
    res.send('reg page')
  })
  
app.get('/',(req,res)=>{
    res.render('dashboard')
})


const MONGODB_URL=
"mongodb+srv://anshajmaitexa:1234@cluster0.lmqsqvs.mongodb.net/CRS_db?retryWrites=true&w=majority"


const port=2000;

mongoose.connect(MONGODB_URL).then(()=>{
    app.listen(port,()=>{
        console.log(`server running on port http://localhost:2000/admin`);
    })
}).catch((error)=>{
    console.log(` ${error} did not connect`); 
})
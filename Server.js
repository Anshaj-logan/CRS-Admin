const express = require('express')
const mongoose = require('mongoose')
const studentRouter = require('./src/routes/studentRouter')
const companyRouter = require('./src/routes/companyRouter')
const eventRouter = require('./src/routes/eventRouter')
const resultRouter = require('./src/routes/resultRouter')
const app = express()
var bodyParser = require('body-parser')
const notificationRouter = require('./src/routes/notificationRouter')
const RegisterRouter = require('./src/routes/api/RegisterRouter')
const signinRouter = require('./src/routes/api/signinRouter')
const StudentRouter = require('./src/routes/api/studentRouter')
const CompanyRouter = require('./src/routes/api/CompanyRouter')




app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./public'))
app.set('view engine', 'ejs')
app.set('views', './src/views')



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


app.use(express.static('./public'))
app.set('view engine','ejs')
app.set('views','./src/views')
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader( 
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

app.use('/api/register/',RegisterRouter)
app.use('/api/login/',signinRouter)
app.use('/api/student/',StudentRouter)
app.use('/api/company/',CompanyRouter)




const MONGODB_URL=
"mongodb+srv://anshajmaitexa:1234@cluster0.9lfualx.mongodb.net/CRS_db?retryWrites=true&w=majority"


const port=2000;

mongoose.connect(MONGODB_URL).then(()=>{
    app.listen(port,()=>{
        console.log(`server running on port http://localhost:2000/admin`);
    })
}).catch((error)=>{
    console.log(` ${error} did not connect`); 
})
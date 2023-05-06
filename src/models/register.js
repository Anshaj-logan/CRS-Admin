const mongoose =require('mongoose')


const schema=mongoose.Schema
const registerSchema=new schema({
    name :{type:String}, 
    department:{type:String},
    year:{type:String},
    Email:{type:String},
    Contact:{type:String},
    SSLC_Score:{type:String},
    PLusTwo_Score:{type:String},
    Degree_Percentage:{type:String},
    NumberofBacklogs:{type:String},
    CV:{type:String},
    Action:{type:String}, 

})
const registermodel=mongoose.model('register_tb',registerSchema)
module.exports=registermodel

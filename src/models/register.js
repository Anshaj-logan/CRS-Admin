const mongoose =require('mongoose')


const schema=mongoose.Schema
const registerSchema=new schema({
    name :{type:String}, 
    department:{type:String},
    login_id:{type:mongoose.Types.ObjectId,ref:"login_tb"},
    email:{type:String},
    contact:{type:String},
    sslc_score:{type:String},
    plustwo_score:{type:String},
    degree_score:{type:String},
    backlogs:{type:String},
    

})
const registermodel=mongoose.model('register_tb',registerSchema)
module.exports=registermodel

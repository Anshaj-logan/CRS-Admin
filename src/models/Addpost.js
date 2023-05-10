const mongoose =require('mongoose')


const schema=mongoose.Schema
const registerSchema=new schema({
    login_id:{type:mongoose.Types.ObjectId,ref:"login_tb"},
    job_title :{type:String}, 
    descrption:{type:String},
    package:{type:String},
    email:{type:String},
    vaccency:{type:String},
    location:{type:String}
   
    

})
const uploadpostmodel=mongoose.model('uploadpost_tb',registerSchema)
module.exports=uploadpostmodel
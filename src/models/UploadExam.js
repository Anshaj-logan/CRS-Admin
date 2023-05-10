const mongoose =require('mongoose')


const schema=mongoose.Schema
const registerSchema=new schema({
    login_id:{type:mongoose.Types.ObjectId,ref:"login_tb"},
    user_id:{type:mongoose.Types.ObjectId,ref:"register_tb"},
    date:{type:String},
    time:{type:String},
    link:{type:String},
 
    

})
const uploadexammodel=mongoose.model('uploadexam_tb',registerSchema)
module.exports=uploadexammodel
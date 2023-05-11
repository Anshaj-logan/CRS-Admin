const mongoose =require('mongoose')


const schema=mongoose.Schema
const registerSchema=new schema({
    login_id:{type:mongoose.Types.ObjectId,ref:"login_tb"},
    user_id:{type:mongoose.Types.ObjectId,ref:"register_tb"},
    date:{type:String},
    mark:{type:String},
 
    

})
const uploadresultmodel=mongoose.model('uploadresult_tb',registerSchema)
module.exports=uploadresultmodel
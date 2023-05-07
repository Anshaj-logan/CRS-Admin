const mongoose =require('mongoose')


const schema=mongoose.Schema
const registerSchema=new schema({
    company_name :{type:String}, 
    established:{type:String},
    login_id:{type:mongoose.Types.ObjectId,ref:"login_tb"},
    email:{type:String},
    contact:{type:String},
    location:{type:String},
   
    

})
const cmpregistermodel=mongoose.model('cmpregister_tb',registerSchema)
module.exports=cmpregistermodel
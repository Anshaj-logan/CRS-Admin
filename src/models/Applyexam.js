const mongoose =require('mongoose')


const schema=mongoose.Schema
const registerSchema=new schema({
    name :{type:String}, 
    department:{type:String},
    company_id:{type:mongoose.Types.ObjectId,ref:"cmpregister_tb"},
    login_id:{type:mongoose.Types.ObjectId,ref:"login_tb"},
    email:{type:String},
    contact:{type:String},
    
   
    

})
const applyexammodel=mongoose.model('apply_exam_tb',registerSchema)
module.exports=applyexammodel
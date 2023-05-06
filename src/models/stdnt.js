const mongoose =require('mongoose')


const stdschema=mongoose.Schema
const mngstdSchema=new stdschema({
    name :{type:String},
    department:{type:String},
    year:{type:String},
    Email:{type:String},
    SSLC:{type:String},
    PLusTwo:{type:String},
    Degree:{type:String},
    BackPaper:{type:String},
    CV:{type:String},
    BackPaper:{type:String},
    Action:{type:String},  			 	 			
})
const stdmodel=mongoose.model('mngstd_tb',mngstdSchema)


module.exports=stdmodel

const mongoose =require('mongoose')


const ntfcnschema=mongoose.Schema
const addntfcnSchema=new ntfcnschema({
    notification :{type:String},
    date:{type:String},
    
    
})
const addntfcnmodel=mongoose.model('addNtfcn_tb',addntfcnSchema)


module.exports=addntfcnmodel

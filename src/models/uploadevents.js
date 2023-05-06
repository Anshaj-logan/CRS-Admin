const mongoose =require('mongoose')


const upldschema=mongoose.Schema
const upeventSchema=new upldschema({
    name :{type:String},
    date:{type:String},
    time:{type:String},
    venue:{type:String},
    instructions:{type:String},
    brochure:{type:String},
    
})
const upevntmodel=mongoose.model('uploadevent_tb',upeventSchema)


module.exports=upevntmodel

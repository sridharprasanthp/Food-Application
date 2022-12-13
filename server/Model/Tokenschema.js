var mongoose=require('mongoose');


const EmployeeSchema=new mongoose.Schema({
    token:{
        type:String,
    }
});

module.exports=mongoose.model('token',EmployeeSchema);
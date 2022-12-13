var mongoose=require('mongoose');


const DateSchema=new mongoose.Schema({
    empid:{
        type:String,
    },
    date:{
        type:String,
       
    },
    breakfast:{
        type:String,
       
    },
    lunch:{
        type:String,
        
    },
    dinner:{
        type:String,
        
    }
});

module.exports=mongoose.model('food',DateSchema);
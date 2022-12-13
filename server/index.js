var express=require('express');
var app=express();
var mongoose=require('mongoose');
var url='mongodb://127.0.0.1:27017/Food';
var cors=require('cors');
var bodyParser=require('body-parser');
const cookieParser=require('cookie-parser')

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors({credentials:true,origin:"http://172.16.0.137:3000"}));

mongoose.connect(url,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("DB connected")
    }
})

const router=require('./Routes/Route')
app.use('/',router)

app.use("*",(req,res)=>{
    res.send("<h1>404 Not Found</h1>")
})
app.listen(3001,()=>{
    console.log("server is listening port 3001")
})
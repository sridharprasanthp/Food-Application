const employee=require("../Model/EmployeeSchema");
const food=require('../Model/DateSchema');
const jwt = require('jsonwebtoken');
const { findByIdAndUpdate } = require("../Model/EmployeeSchema");
const JWT_SECRET_KEY = "myKey";
// var bcrypt=require('bcryptjs');
const SignUp=(req,res)=>{
    
    employee.findOne({email:req.body.email},(err,employees)=>{
        if(employees){
            res.json({message:"User Already Exist"})
        }
        else{
            // const hasedpassword=bcrypt.hashSync(req.body.password);
            const employeedata= new employee({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
            });
            employeedata.save();
            res.json({message:"Added Successfully"})
        }
    })
}

const Login=(req,res)=>{
    employee.findOne({email:req.body.email},(err,employee)=>{
        if(employee){
            // const comparepassword=bcrypt.compareSync(req.body.password,employee.password);
            if(req.body.password===employee.password){
                const token = jwt.sign({ id: employee._id }, JWT_SECRET_KEY, { expiresIn: "1d" })
                res.cookie(String(employee._id),token,{
                    path:"/",
                    expires:new Date(Date.now()+1000*1800),
                    httpOnly:true,
                    sameSite:'lax'
                })
                res.json({ message: "Successfully Login", user: employee, token })
                console.log(employee.id)
            }
            else{
                res.json({message:"Wrong Credentials"}) 
            }
        }
        else{
            res.json({message:"User Not Found"})
        }
      
    })
   
}

const user=(req,res,next)=>{
const cookies=req.headers.cookie;
const token=cookies.split('=')[1]
console.log(token);
// const header = req.headers['authorization'];
// // console.log(header);
// const token = header.split(" ")[1];
if (!token) {
    res.json("No Token Found");
}
jwt.verify(String(token), JWT_SECRET_KEY, (err, employee) => {
    if (err) {
        res.json("Invalid Token")
    }
    console.log(employee.id);
    req.id = employee.id
});
next()
}


const get=async(req,res)=>{
    const userid=req.id
    console.log(req.id)
    let users;
    try{
        users=await employee.findById(userid);
    }
    catch(err){
        return new Error(err)
    }
   if(!users){
    res.json("user not found")
   }
    return res.json(users);
}


const refresh=(req,res,next)=>{
    const cookies=req.headers.cookie;
    const prevtoken=cookies.split('=')[1]   
    if(!prevtoken) {
        return res.status(400).json({message:"token not found"})
    }
    jwt.verify(String(prevtoken), JWT_SECRET_KEY, (err, employee) => {
        if (err) {
            return res.status(403).json({message:"Authentication failed"})
        }
       res.clearCookie(`${employee.id}`);
       req.cookies[`${employee.id}`]=""
       const token=jwt.sign({id:employee.id},JWT_SECRET_KEY,{expiresIn:"1d"});
       res.cookie(String(employee._id),token,{
        path:"/",
        expires:new Date(Date.now()+1000*600),
        httpOnly:true,
        sameSite:'lax'
    })
    req.id = employee.id
    next()
    });
  
}

const logout=(req,res)=>{
    const cookies=req.headers.cookie;
    const prevtoken=cookies.split('=')[1]   
    if(!prevtoken) {
        return res.status(400).json({message:"token not found"})
    }
    jwt.verify(String(prevtoken), JWT_SECRET_KEY, (err, employee) => {
        if (err) {
            return res.status(403).json({message:"Authentication failed"})
        }
       res.clearCookie(`${employee.id}`);
       req.cookies[`${employee.id}`]=""
       return res.status(200).json({message:"Successfully Logout"})
    });
}

const orderfood=(req,res)=>{
    food.findOne({date:req.body.date,empid:req.body.empid},(err,foods)=>{
        if(foods){
            res.json({message:"Already Ordered"})
        }
        else{
            const data=new food({
                empid:req.body.empid,
                date:req.body.date,
                breakfast:req.body.breakfast,
                lunch:req.body.lunch,
                dinner:req.body.dinner
            });
            data.save();
            res.json({message:"Successfully Ordered",done:data});
        }
    
        })
       
        }


const getorderedfood=async(req,res)=>{
    const datas=await food.find();
    res.json(datas)
}


const getfoodsbysearch=async(req,res)=>{
    const datas=await food.find({date:"11/21/2022"});
    res.json(datas)
}


const getoneorderedfood=async(req,res)=>{
    const datas=await food.findById(req.params.id);
    res.json(datas)
}


const getonedata=async(req,res)=>{
    const datas=await food.findById(req.params.id);
    res.json(datas)
}

const aggregate=async(req,res)=>{
    const data =await employee.aggregate(
        [{$lookup:{from:"foods",localField:"password",foreignField:"empid",as:"date"}}]
        );
        res.json(data)
}


const updatefood=async(req,res)=>{
    const data=await food.findByIdAndUpdate(req.params.id)
    data.breakfast=req.body.breakfast
    data.lunch=req.body.lunch
    data.dinner=req.body.dinner
    data.save();
    res.json({message : "Updated Successfully"})
}

exports.SignUp=SignUp;
exports.Login=Login;
exports.user=user;
exports.get=get;
exports.refresh=refresh;
exports.logout=logout;
exports.orderfood=orderfood;
exports.getorderedfood=getorderedfood;
exports.getonedata=getonedata;
exports.updatefood=updatefood;
exports.getoneorderedfood=getoneorderedfood;
exports.aggregate=aggregate;
exports.getfoodsbysearch=getfoodsbysearch;

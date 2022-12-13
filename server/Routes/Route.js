var express = require('express');
var router = express.Router();
// var employee=require('../Model/EmployeeSchema');
const { SignUp, Login, user, get, logout, refresh, orderfood, getorderedfood,getonedata,getoneorderedfood, updatefood,aggregate,getfoodsbysearch } = require("../Controllers/controllers")


// router.get('/',(req,res)=>{
//     res.json("Hello")
// });
// router.get('/all',async(req,res)=>{
//     const data=await employee.find();
//     res.json(data);
// });

router.post('/signup', SignUp);

router.post('/login', Login);

router.get('/user', user, get)

// router.get('/refresh', refresh, user, get);

router.get('/logout', user, logout);

router.post('/orderfood', orderfood)

router.get('/getorderedfood', getorderedfood);

router.get('/getonedata/:id',getonedata);

router.get('/getoneorderedfood/:id',getoneorderedfood)

router.get('/aggregate',aggregate)


router.get('/getfoodsbysearch',getfoodsbysearch)


router.patch('/updatefood/:id', updatefood)


// router.delete('/:id',async(req,res)=>{
// await employee.findByIdAndDelete(req.params.id);
// res.json({message:"Deleted Successfully"})
// });

module.exports = router;
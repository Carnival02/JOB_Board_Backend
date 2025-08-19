const { Router }=require('express');

const jwt=require('jsonwebtoken');
const {JWT_ADMIN_PASSWORD}=require('../config')
const { adminModel,jobModel }=require('../db');
const { adminAuthMiddleware }=require('../middlewares/adminAuth');

const adminRoute=Router();

adminRoute.post('/SignUp',async function(req,res){

    // const username=req.body.username;
    // const password=req.body.password;
    // const name=req.body.name;
    const{email,name,password}=req.body;
    await adminModel.create({
        email:email,
        name:name,
        password:password
    })

    res.status(200).json({
        message:"You are singed in Successfully"
    })

    
})

adminRoute.post('/SignIn',function(req,res){

    res.json({
        message:"You are DOne"
    })
})

adminRoute.post('/CreateJob',function(req,res){

    res.json({
        message:"You are DOne"
    })
})

adminRoute.put('/editJob',function(req,res){

    res.json({
        message:"You are DOne"
    })
})

adminRoute.get('/job',function(req,res){

    res.json({
        message:"You are DOne"
    })
})

module.exports={
    adminRoute: adminRoute

}
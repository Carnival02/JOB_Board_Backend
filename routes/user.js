const { Router }=require('express');
// const { use } = require('react');
const jwt=require('jsonwebtoken');
const{ JWT_USER_PASSWORD }=require('../config');
const {userModel,appliedJobModel,jobModel}=require('../db');
const { userAuthMiddleware }=require('../middlewares/userAuth');
const { Types } = require("mongoose");
// const { use } = require('react');
const userRoutes=Router();

userRoutes.post('/Signup',async function(req,res){

    try{
        const {email,name,password}=req.body;

        const User= await userModel.create({
            email:email,
            name:name,
            password:password
        })
        
        res.json({
            message:"Your account created Successfully( Ban gya aaccount bhai )"
        })
    }catch(err){
        console.log(err);
        res.json({
            message:"Nhi bana aacount boss "
        })
        
    }
    


})

userRoutes.post('/signIn',async function(req,res){
    
    try{
        const {email,password}=req.body;

        const userss= await userModel.findOne({
        email:email,
        password:password
        })

        if(userss){
            const token=jwt.sign({
                id:userss._id
            },JWT_USER_PASSWORD)

            res.json({
                token:token
            })
        }else{
            res.status(400).json({
                message:"Kuch to galat hai bhai Tere me"
            })
        }
    
    }catch(err){
        console.log(err);
        res.json("Bhai code ke L lag gye SignIN me")
        
    }
    
    
 
})

userRoutes.post('/apply/:jobId',userAuthMiddleware,async function(req,res){
    
    try{
        const{jobId}=req.params;
          if (!Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ message: "Invalid jobId" });
            }

        const validId=await jobModel.findById(jobId).select('_id')
        if(validId){
            const appliedJob=await appliedJobModel.findOneAndUpdate(
                { userID: req.userId, jobId: jobId },     
                  { applied: true },                        
                 { upsert: true, new: true } 
            )
            res.json({
                message:"Naukri ke liye applied ho gya",
                applicationID:appliedJob._id
            })
        }else{
            res.json({
                message:"Job Id galat hai bhi (shi naukri dekh)"
            })
        }

    }catch(err){
        console.log(err);
        res.json({
            message:"Applied Job endpoint Fatt gya"
        })
        
    }

   
   
})

userRoutes.get('/appliedJob',userAuthMiddleware,async function(req,res){

    try{
        
        
      console.log(req.userId);
      
      const appliedJobs=await appliedJobModel.find({
        userID:req.userId,
        applied:true
      })
     if(appliedJobs){
        res.json({
            message:"all Jobs",
            appliedJobs:appliedJobs
        })
        
        }else{
            res.json({
                message:"Apply to kr bhai "
            })
        }

    }catch(err){
        console.log(err);
        res.json({
            message:"Le aa gya Error"
        })
        
    }
})

module.exports={
    userRoutes: userRoutes

}
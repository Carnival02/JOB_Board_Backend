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

adminRoute.post('/SignIn',async function(req,res){

    const{email,password}=req.body;
    
    const admin=await adminModel.findOne({
        email:email,
        password:password
    })

    if(admin){
        const token=jwt.sign({
            id:admin._id
        },JWT_ADMIN_PASSWORD);

        res.json({
            token:token
        })

    }else{
        res.status(403).json({
            message:"Incorrect hai bhai dekh le dhayn se"
        })
    }

    

})

adminRoute.post('/CreateJob',adminAuthMiddleware,async function(req,res){

    try{
        const adminId=req.userID;
        const {title,description,openingNumber,skills,salary}=req.body;
        const job=await jobModel.create({
            title:title,
            description:description,
            openingNumber:openingNumber,
            skills:skills,
            salary:salary,
            createdBy:adminId

        })
        res.status(200).json({
            message:"Job Created Done",
            jobId:job._id

        })


    }catch(err){
        console.log(err);
        res.json({
            message:"Kuch gadbad ho chuki hai boss"
        })
        
    }



})

adminRoute.put('/editJob',async function(req,res){
    try{
        const adminId=req.userID;
        const {jobId,title,description,openingNumber,skills,salary}=req.body;

        const updatedJob=await jobModel.updateOne({
            _id:jobId,
            createdBy:adminId},
            {
            title:title,
            description:description,
            openingNumber:openingNumber,
            skills:skills,
            salary:salary,
            // createdBy: req.adminId  

        })
        res.status(200).json({
            message:"JOb updated"
        })
    }
    catch(err){
        console.log(err);
        res.status(403).json({
            message:"Update ruk gya bhai tera thik kar usko"
        })
        
    }

})

adminRoute.get('/job',async function(req,res){

    const adminId=req.userID;

    const jobss=await jobModel.find({
        createdBy:adminId
    });
    res.json({
        message:"All the Jobs",
        jobs:jobss
    })

})

adminRoute.delete('/deleteJob',async function(req,res){

    try{
        const adminId=req.userID;
        const title=req.body;

        const deletedJob= await jobModel.deleteOne({
            createdBy:adminId
        },{
            title:title
        })

        res.status(200).json({
            message:"Job deleted Successfully",
            deletedJob:deletedJob
        })
    }
    catch(err){
        console.log(err);
        res.json({
            message:"Error aagya bhai mere"
        })
        
    }
})



module.exports={
    adminRoute: adminRoute

}
const { Router }=require('express');
// const { use } = require('react');

const userRoutes=Router();

userRoutes.post('/Signup',function(req,res){
    res.json({
        message:"You are SignedUp"
    })
})

userRoutes.post('/signIn',function(req,res){
    res.json({
        message:"U are signed Up"
    })
})

userRoutes.put('/apply',function(req,res){
    res.json({
        message:"You applied for a Job"
    })
})

userRoutes.get('/appliedJob',function(req,res){
    res.json({
        message:"These are the Applied Job"
    })
})

module.exports={
    userRoutes: userRoutes

}
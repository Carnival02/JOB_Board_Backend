const { Router }=require('express');

const adminRoute=Router();

adminRoute.post('/SignUp',function(req,res){

    res.json({
        message:"You are DOne"
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
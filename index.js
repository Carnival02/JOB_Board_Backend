require('dotenv').config();
const express=require("express");
const jwt=require("jsonwebtoken");
const { z }=require("zod");
const mongoose=require("mongoose");

const app=express();
app.use(express.json());

const {userRoutes}=require("./routes/user");
const {adminRoute}=require("./routes/admin");
// const { default: mongoose } = require('mongoose');

app.use('/api/v1/admins',adminRoute);
app.use('/api/v1/users',userRoutes);



async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000);
    console.log("App is listening ");
    
}

main();
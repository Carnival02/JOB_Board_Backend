require('dotenv').config();
const express=require("express");
const jwt=require("jsonwebtoken");
const { z }=require("zod");

const app=express();
app.use(express.json());

const {userRoutes}=require("./routes/user");
const {adminRoute}=require("./routes/admin");

app.use('/api/v1/admins',adminRoute);
app.use('/api/v1/users',userRoutes);



app.listen(3000);


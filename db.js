const mongoose=require("mongoose");
const { email, string } = require("zod");

const Schema=mongoose.Schema;

const ObjectID=mongoose.Types.ObjectId;

const userSchema=new Schema({
    email: { type: String,unique:true},
    name:string,
    password:string,

})

const adminSchema=new Schema({
    email:{type :string,unique:true},
    name:String,
    password:String
})

const appliedJobSchema=new Schema({
    title:string,
    applied:{type:Boolean}

})
const job=new Schema({
    title:String,
    description:String,
    openingNumber:Number,
    skills:String,
    Salary:Number

})

const userModel=mongoose.model("user",userSchema);
const adminModel=mongoose.model("admin",adminSchema);
const jobModel=mongoose.model("job",job);
const appliedJobModel=mongoose.model("appliedJob",appliedJobSchema);

module.exports={
    userModel,
    adminModel,
    jobModel,
    appliedJobModel
}
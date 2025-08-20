const mongoose=require("mongoose");
const { email, string, boolean } = require("zod");

const Schema=mongoose.Schema;
// const { Types } = mongoose;
const ObjectID=Schema.Types.ObjectId;

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
    userID:ObjectID,
    jobId:{type:ObjectID,ref:"job"},
    applied:boolean

})
const job=new Schema({
    title:String,
    description:String,
    openingNumber:Number,
    skills:String,
    salary:Number,
    createdBy: ObjectID

})

const userModel=mongoose.model("user",userSchema);
const adminModel=mongoose.model("admin",adminSchema);
const jobModel=mongoose.model("jobs",job);
const appliedJobModel=mongoose.model("appliedJob",appliedJobSchema);

module.exports={
    userModel,
    adminModel,
    jobModel,
    appliedJobModel
}
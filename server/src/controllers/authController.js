import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import generateId from "../utils/generateId.js";

import {
sendOTPEmail
} from "../services/mailService.js";


// ================= REGISTER =================

export const registerUser =
async(req,res)=>{

try{

const{
name,
dob,
email,
phone,
password
}=req.body;

const existingUser=
await User.findOne({
email
});

if(existingUser){

return res.status(400)
.json({
message:
"User already exists"
});

}

const hashedPassword=
await bcrypt.hash(
password,
10
);

const user=
await User.create({

name,

dob,

email,

phone,

password:
hashedPassword,

userId:
generateId(),

balance:
10000

});

res.status(201)
.json({

message:
"Registration successful",

user

});

}catch(error){

console.log(error);

res.status(500)
.json({
message:
error.message
});

}

};


// ================= LOGIN =================

export const loginUser =
async(req,res)=>{

try{

const{
email,
password
}=req.body;

const user=
await User.findOne({
email
});

if(!user){

return res.status(400)
.json({
message:
"User not found"
});

}

const isMatch=
await bcrypt.compare(
password,
user.password
);

if(!isMatch){

return res.status(400)
.json({
message:
"Invalid credentials"
});

}

const token=
jwt.sign(

{
id:user._id
},

process.env.JWT_SECRET,

{
expiresIn:"7d"
}

);

res.json({

token,

user:{

id:user._id,

name:user.name,

email:user.email,

userId:user.userId,

balance:user.balance

}

});

}catch(error){

console.log(error);

res.status(500)
.json({
message:
error.message
});

}

};


// ================= FORGOT PASSWORD =================

export const forgotPassword =
async(req,res)=>{

try{

const{
email
}=req.body;

console.log(
"EMAIL RECEIVED:",
email
);

const user=
await User.findOne({
email
});

console.log(
"FOUND USER:",
user
);

if(!user){

return res.status(404)
.json({
message:
"User not found"
});

}

const otp=
Math.floor(
100000+
Math.random()*900000
).toString();

console.log(
"OTP:",
otp
);

user.resetOtp=otp;

user.resetOtpExpire=
Date.now()+
300000;

await user.save();

console.log(
"OTP SAVED"
);

await sendOTPEmail(
email,
otp
);

console.log(
"MAIL SENT"
);

res.json({

message:
"OTP sent successfully"

});

}catch(error){

console.log(
"FORGOT PASSWORD ERROR:",
error
);

res.status(500)
.json({

message:
error.message

});

}

};


// ================= RESET PASSWORD =================

export const resetPassword =
async(req,res)=>{

try{

const{

email,

otp,

newPassword

}=req.body;

const user=
await User.findOne({
email
});

if(!user){

return res.status(404)
.json({
message:
"User not found"
});

}

if(user.resetOtp!==otp){

return res.status(400)
.json({
message:
"Invalid OTP"
});

}

if(
user.resetOtpExpire<
Date.now()
){

return res.status(400)
.json({
message:
"OTP expired"
});

}

const hashedPassword=
await bcrypt.hash(
newPassword,
10
);

user.password=
hashedPassword;

user.resetOtp=null;

user.resetOtpExpire=null;

await user.save();

res.json({

message:
"Password reset successful"

});

}catch(error){

console.log(error);

res.status(500)
.json({

message:
error.message

});

}

};
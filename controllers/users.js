const Users=require('../models/users');
const asyncHandler = require('../middleware/async');
const bcrypt = require('bcrypt');

// 4.Connection to db
console.log('attempting to connect')

const userSignUp=asyncHandler(async(req,res,next)=>{
    await Users.create(req.body);
    res.status(201).json({status:true,message:"user created successfully"});
})

const getUsers=asyncHandler(async(req,res,next)=>{
    res.json(res.advancedResults); 
})

const updatePassword=asyncHandler(async(req,res,next)=>{
    const newpass=await Users.findOneAndUpdate({email: req.params.email}, {password: req.body.password},{
        new:true,
        runValidators: true
    })
    res.json(newpass);
})
const userSignin=asyncHandler(async(req,res,next)=>{
    const user=await Users.findOne({email: req.body.email});
    console.log("login details"+user);

    //type1 compare without models middleware method
    const matchfine= await bcrypt.compare(req.body.password,user.password);
    
    //type2 compare with model middleware(methods)
    const matchmethod2 = await user.matchtype2(req.body.password);

    //type3 compare with model middleware(statics)
    const matchmethod3 = await Users.matchtype3(req.body.password,user.password);

    // console.log(matchfine);
    // console.log(matchmethod2);
    // console.log(matchmethod3);
    if(matchfine)
    {
        let token = await user.generateToken();
        // console.log(token);
        res.json({status:true,message:"SignIn successfull",token,role:user.typeUser,userid:user._id});
    }
    else
    {
        res.json({status:false,message:"invalid username / password"});
    }
})

module.exports={userSignUp,getUsers,updatePassword,userSignin};
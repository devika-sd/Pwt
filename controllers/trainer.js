const Users=require('../models/users');
const asyncHandler = require('../middleware/async');
const bcrypt = require('bcrypt');

// 4.Connection to db
console.log('attempting to connect')

const getAllUsers=asyncHandler(async(req,res,next)=>{
    const userData= await Users.find({typeUser:'user'});
    if(req.query.select)
    {
        const userData= await Users.find({typeUser:'user'}).select(req.query.select);
    }
    if(req.query.sort)
    {
        const userData= await Users.find({typeUser:'user'}).sort(req.query.sort);
    }
    res.json(userData);
})

const getuserbyId=asyncHandler(async(req,res,next)=>{
    const userData= await Users.findOne({_id:req.params._id});
    res.json(userData);
})

const addWorkouts=asyncHandler(async(req,res,next)=>{
    var workout={_id:req.body.workouts,title:req.body.title,cbpm:req.body.cbpm,summary:req.body.summary};
    let user = await Users.findOneAndUpdate({_id:req.body._id},{$addToSet:{workouts:workout}},{
        new: true,
        runValidators: true
    })
    res.json({success:true, data: user});
})

module.exports={getAllUsers,getuserbyId,addWorkouts};
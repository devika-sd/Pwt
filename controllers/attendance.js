// Req, res operations

const Attendance = require('../models/attendance')
const asyncHandler = require('../middleware/async')
// 4.Connection to db
console.log('attempting to connect');

const outAttendance =asyncHandler(async (req,res,next) => {
        const newpass=await Attendance.findOneAndUpdate({_id: req.params.id}, {out: new Date()},{
            new:true,
            runValidators: true
        })
        res.json(newpass);
    
});

const inAttendance =asyncHandler(async (req,res,next) => {
        let users={_id:req.body.user};
       const login = await Attendance.create({user:users});
       console.log("attendance given",login)
        res.json({message:"success",data:login});
});

module.exports = {inAttendance,outAttendance}
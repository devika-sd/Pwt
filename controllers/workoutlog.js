const WorkoutLog = require('../models/workoutlog');


const asyncHandler = require('../middleware/async')
// 4.Connection to db
console.log('attempting to connect')

const endworkoutlog =asyncHandler(async (req,res,next) => {
        const endworkout=await WorkoutLog.findOneAndUpdate({_id: req.params.id}, {end: new Date(),calories:req.body.calories},{
            new:true,
            runValidators: true
        })
        res.json(endworkout);
    
});

const startworkoutlog =asyncHandler(async (req,res,next) => {
        let users={_id:req.body.user};
        let workouts={_id:req.body.workout}
       const start = await WorkoutLog.create({user:users,workout:workouts});
       console.log("workout starts",start)
        res.json({message:"success",data:start});
});
const getWorkoutLog =asyncHandler(async (req,res,next) => {
    res.json(res.advancedResults); 
});

module.exports={startworkoutlog,endworkoutlog,getWorkoutLog};
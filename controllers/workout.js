// Req, res operations

const Workout = require('../models/workout')
const asyncHandler = require('../middleware/async')
// 4.Connection to db
console.log('attempting to connect')

const fetchAllWorkouts =asyncHandler(async (req,res,next) => {
        res.json(res.advancedResults); 
});

const addWorkouts =asyncHandler(async (req,res,next) => {
       await Workout.create(req.body);
        res.json({message:"success"});
});

module.exports = {fetchAllWorkouts,addWorkouts}
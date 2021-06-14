const express=require('express');
const router=express.Router();
const {startworkoutlog,endworkoutlog,getWorkoutLog} =require('../controllers/workoutlog');
const {protect} = require('../middleware/auth');
var advancedFind =require('../middleware/Advancedfind');
const WorkoutLog = require('../models/workoutlog');


router.route('/')
.post(protect,startworkoutlog)

router.route('/:id')
.put(protect,endworkoutlog)

router.route('/')
.get(protect,advancedFind(WorkoutLog),getWorkoutLog);

module.exports=router;
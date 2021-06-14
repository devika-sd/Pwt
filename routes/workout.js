

var express = require('express')
var app = express()
var router = express.Router()
const {protect} = require('../middleware/auth');
var advancedFind =require('../middleware/Advancedfind');
var Workout = require('../models/workout');


const workoutController = require('../controllers/workout')

router.route('/')
.get(protect,advancedFind(Workout),workoutController.fetchAllWorkouts)
.post(protect,workoutController.addWorkouts)

// Fetch the data -- Http GET
// router.get('/', workoutController.fetchAllWorkouts)
// Send the data to server - Http POST
// router.post('/', workoutController.addWorkouts)

module.exports = router
//Schema & Model - structure

const mongoose = require('mongoose');


// 2. Create a schema
const Schema = mongoose.Schema;
const workoutlogSchema = new Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
  },
  workout: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'pwt',
    required:true
  },
   start:{
       type: Date, 
       default: Date.now
    },
    end:{
        type: Date,
    },
    calories:{
      type:Number
    }
});

// 3. Model from Schema (object from schema)
const WorkoutLog = mongoose.model('workoutlog', workoutlogSchema);

module.exports = WorkoutLog;
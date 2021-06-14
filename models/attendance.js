//Schema & Model - structure

const mongoose = require('mongoose');


// 2. Create a schema
const Schema = mongoose.Schema;
const attendanceSchema = new Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
  },
   in: {
       type: Date,
       default: Date.now
   },
   out:{
       type: Date, 
   }
});

// 3. Model from Schema (object from schema)
const Attendance = mongoose.model('attendance', attendanceSchema);

module.exports = Attendance;
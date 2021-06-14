const express=require('express');
const app= express();
const cors=require('cors');
require('dotenv').config();
require('colors');
const workoutroute=require('./routes/workout');
const workoutlogroute=require('./routes/workoutlog');
const usersroute=require('./routes/users');
const trainerroute=require('./routes/trainer');
const attendanceroute=require('./routes/attendance');
const errorHandler=require('./middleware/errorhandler');
const databaseConnection=require('./db');

app.use(cors());

app.use(express.json());

databaseConnection();

app.use('/api/v1/workoutlog',workoutlogroute);
app.use('/api/v1/workouts',workoutroute);
app.use('/api/v1/users',usersroute);
app.use('/api/v1/trainer',trainerroute);
app.use('/api/v1/attendance',attendanceroute);


app.use(errorHandler);

app.listen(process.env.APP_PORT,()=>{
    console.log(`listening to the port ${process.env.APP_PORT}`.green)
})
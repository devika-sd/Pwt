const express=require('express');
const router=express.Router();
const {inAttendance,outAttendance} =require('../controllers/attendance');
const {protect} = require('../middleware/auth');

router.route('/')
.post(protect,inAttendance)

router.route('/:id')
.patch(protect,outAttendance)

module.exports=router;
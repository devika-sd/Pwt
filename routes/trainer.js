const express=require('express');
const router=express.Router();
const {getAllUsers,getuserbyId,addWorkouts}=require('../controllers/trainer');
const {protect,authorize} = require('../middleware/auth');

router.route('/users')
.get(protect,authorize('trainer','admin'),getAllUsers)
.put(protect,authorize('trainer'),addWorkouts)

router.route('/:_id')
.get(protect,getuserbyId)

module.exports=router;
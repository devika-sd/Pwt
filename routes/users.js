const express=require('express');
const router=express.Router();
const {userSignUp,getUsers,updatePassword,userSignin}=require('../controllers/users');
const {protect,authorize} = require('../middleware/auth');
var advancedFind =require('../middleware/Advancedfind');
const Users=require('../models/users');


router.route('/')
.get(protect,authorize('trainer','admin'),advancedFind(Users),getUsers);

router.route('/login')
.post(userSignin);

router.route('/signup')
.post(userSignUp);

router.route('/:email')
.patch(updatePassword)

module.exports=router;
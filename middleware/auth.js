const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');

const protect=asyncHandler(async (req,res,next)=>{
   const auth= req.headers.authorization;
   if(auth)
   {
        const token=auth.split(' ')[1];
        const user= await jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!user) throw new Error('Invalid User');
        req.user=user;
        next();
   }
   else{
    res.sendStatus(403);
   }
})
const authorize=(...roles)=>{
   return (req,res,next)=>{
      console.log(req.user.typeUser);
      if(roles.includes(req.user.typeUser))
      {
         next();
      }
      else
      {
         res.sendStatus(403);
      }
   }
}
module.exports={protect,authorize};
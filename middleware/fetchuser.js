const jwt = require('jsonwebtoken');
const JWT_sectret="Mynameissamirkumar";
const fetchuser=(req,res,next)=>{
    // get the user from jwt token
   const token=req.header('auth_token');
   if(!token)
   {
    return res.status(401).json({success:false, message:"access denied" });
   }

   const data=jwt.verify(token,JWT_sectret);
   req.user=data.user
   

    next();
}
module.exports=fetchuser;
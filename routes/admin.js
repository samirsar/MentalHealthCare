const express=require('express');

const router=express.Router();
const Myadmin=require('../models/Admin')// import User database as Myuser

const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

//importing middleware 

const fetchuser = require('../middleware/fetchuser');

const JWT_sectret="Mynameissamirkumar";
const jwt = require('jsonwebtoken');


//creating A new doctor 
router.post('/createadmin',[
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
],

async (req,res)=>{

    const errors =   validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, message:"some error has been occured" });
    }
    const temp=await Myadmin.findOne({
        email:req.body.email
      })
  
      if(temp)
      {   
  
         return res.send({success:false,message:"This email is already exist"});
  
      }
      const salt = await bcrypt.genSaltSync(10);
   var securepassword = await bcrypt.hashSync(req.body.password, salt);
 
      await Myadmin.create({
        name: req.body.name,
        password:securepassword,
        email:req.body.email,
        category:req.body.category,

      }).then(user => {
        const data={
          user:{
            id:user.id
          }
        }
        var auth_token = jwt.sign(data, JWT_sectret);
        
        res.send({success:true,
          auth_token})
      });




}
)
// doctor signup has been ended




// loging doctor start
router.post('/login',[
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
  ],
  
  
  async (req,res)=>{
  
    console.log(req.body)
  
  const errors =   validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({"success":false, message:"Please enter correct email and password" });
    }
    const user=await Myadmin.findOne({
      email:req.body.email
    })
  // if no match username and password
    if(!user)
    {   
  
       return res.send({
         "success":false,
         "msg":"please enter correct credential"
       });
  
    }
  
  
    let comparepassword=bcrypt.compareSync(req.body.password, user.password); // true
    if(!comparepassword)
    {
      return res.status(400).json({"success":false, message:"Your email and password is incorrect" });
    }
    else
    {
      const data={
        user:{
          id:user.id
        }
      }
      var auth_token = jwt.sign(data, JWT_sectret);
      
      res.send({
        success:true,
  
        auth_token})
    }
    
  
  })

  //login end


  //get doctor data using auth token

  router.post('/getadmin',fetchuser,
  
  async (req,res)=>{
    try {

      userId=req.user.id;
      const user=await Myadmin.findById(userId).select("-password");
      console.log(user);

      res.send(user);
      
    } catch (error) {
      return res.status(401).json({"success":false, message:"access denied" });
      
    }
  
    
  }
  
  )
module.exports=router;
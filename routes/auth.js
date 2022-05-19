const express=require('express');

const router=express.Router();
const Myuser=require('../models/User')// import User database as Myuse


const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

//importing middleware 

const fetchuser = require('../middleware/fetchuser');

const JWT_sectret="Mynameissamirkumar";
const jwt = require('jsonwebtoken');


//creating A new user 
router.post('/createuser',[
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
],

async (req,res)=>{

    const errors =   validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, message:"some error has been occured" });
    }
    const temp=await Myuser.findOne({
        email:req.body.email
      })
  
      if(temp)
      {   
  
         return res.send({success:false,message:"This email is already exist"});
  
      }
      const salt = await bcrypt.genSaltSync(10);
   var securepassword = await bcrypt.hashSync(req.body.password, salt);
 
      await Myuser.create({
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
// user signup has been ended




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
    const user=await Myuser.findOne({
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

  router.post('/getuser',fetchuser,
  
  async (req,res)=>{
    try {

      userId=req.user.id;
      const user=await Myuser.findById(userId).select("-password");
      console.log(user);

      res.send(user);
      
    } catch (error) {
      return res.status(401).json({"success":false, message:"access denied" });
      
    }
  
    
  }
  
  )

router.get('/logout',(req,res)=>{

    // obj=JSON.parse(localStorage.getItem('Mytoken'));
    // console.log(obj);
    res.send({
      "msg":"successfull logout",
    })

});
router.post('/:id',
  
  
  async (req,res)=>{
    let obj=await Myuser.findById(
      req.params.id
    );
    if(obj==null)
    {
      res.send({
        success:false,
        "msg":"pateint not found ,some error occured"
      })
    }
    res.send(
      {
        success:true,
        data:obj
      }
      
    );
     

  }
  
  )


module.exports=router;
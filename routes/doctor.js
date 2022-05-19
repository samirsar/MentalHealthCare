const express=require('express');

const router=express.Router();

const MyDoctor=require('../models/Doctor');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

//importing middleware 

const fetchuser = require('../middleware/fetchuser');

const JWT_sectret="Mynameissamirkumar";
const jwt = require('jsonwebtoken');


//creating A new doctor 
router.post('/createdoctor',[
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
],

async (req,res)=>{

    const errors =   validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, message:"some error has been occured" });
    }
    const temp=await MyDoctor.findOne({
        email:req.body.email
      })
  
      if(temp)
      {   
  
         return res.send({success:false,message:"This email is already exist"});
  
      }
      const salt = await bcrypt.genSaltSync(10);
   var securepassword = await bcrypt.hashSync(req.body.password, salt);
 
      await MyDoctor.create({
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
    const user=await MyDoctor.findOne({
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

  router.post('/getdoctor',fetchuser,
  
  async (req,res)=>{
    try {

      userId=req.user.id;
      const user=await MyDoctor.findById(userId).select("-password");
      console.log(user);

      res.send(user);
      
    } catch (error) {
      return res.status(401).json({"success":false, message:"access denied" });
      
    }
  
    
  }
  
  )
  router.post('/viewdoctor',
  [
  
    body('text').isLength({ min: 3 }),
  ],
  
  async (req,res)=>{
    console.log(req.body)
  
    const errors =   validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({"success":false, message:"At least enter 3 character" });
      }
    
    
      // const temp=await MyDoctor.findOne({
      //   email:req.body.email,
      //   password:req.body.password
      // })

      const temp=await MyDoctor.find({
        name:req.body.text
      }).select("-password")

      if(!temp)
      {   
    
         return res.send({
           "success":false,
           "msg":"Any doctor not found"
         });
    
      }
    
      let obj=temp;
      res.send({
        success:true,
        data:obj
        

      });

  }
  
  )
  router.post('/getalldoctor',
  
  
  async (req,res)=>{
    console.log("hii");
   
   
    
      let obj=await MyDoctor.find().select("-password")
      
      res.send({
        success:true,
        data:obj
        

      });

  }
  
  )
  router.post('/editdoctor',
  
  
  async (req,res)=>{

    if(req.body.flag){
    
    
    let temp=await MyDoctor.updateOne({_id:req.body.id},{
      $set:{
        varified:req.body.flag
      }
    }
      
      );
      res.send(temp);
  }
    if(req.body.meet_link){
    
    
    let temp=await MyDoctor.updateOne({_id:req.body.id},{
      $set:{
        meet_link:req.body.meet_link
      }
    }
      
      );
      res.send(temp);

  }

    
    
    
  }
  
  )
  router.post('/:id',
  
  
  async (req,res)=>{
    let obj=await MyDoctor.findById(
      req.params.id
    ).select("-password");
    if(obj==null)
    {
      res.send({
        "msg":"doctor not found ,some error occured"
      })
    }
    res.send(obj);
     

  }
  
  )




module.exports=router;
const express=require('express');
const { db } = require('../models/QuestionAnswer');

const router=express.Router();

const Unknowuser=require('../models/QuestionAnswer');

router.post('/createunknownuser',

async (req,res)=>{

    console.log(req.body);

    const temp=await Unknowuser.find({mydetail:req.body.mydetail});
    
    if(temp!=null)
    {
            await Unknowuser.deleteMany()
    }
    
    const user=new Unknowuser(req.body);


    user.save();

    res.send({
        success:true,
        msg:"Detain has been send to database",
        
    })
    

}
)
router.post('/findunknownuser',

async (req,res)=>{

    console.log(req.body);

    const temp=await Unknowuser.findOne({mydetail:req.body.mydetail});

    if(temp!=null)
    {
        res.send({
            success:true,
            data:temp
        })
    }
    else
    {
        res.send({
            success:false,
            msg:"Ohho some error has been occured"
        })
    }

}
)

module.exports=router;

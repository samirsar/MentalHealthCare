const express=require('express');
const router=express.Router();

const Verification =require('../models/AdminConnection');

router.post('/newverification',
async (req,res)=>{
    console.log(req.body);
    const user=await Verification(req.body);
    user.save();

    res.send({
        success:true,
        msg:"Successfully sent your message"
    })
}
)

router.post('/verification',async(req,res)=>{
    console.log(req.body);

    let temp=await Verification.find({user_id:req.body.user_id});

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
            success:false
        })
    }


    

}) 
router.post('/editadminconnection',async(req,res)=>{
    
    let temp=await Verification.updateOne({_id:req.body.id},

        {
            $set:{
                varified:req.body.flag
            }
        }
        
        
        )
        res.send(temp);
})

module.exports=router;
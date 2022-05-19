const express=require('express');
const router=express.Router();

const notification=require('../models/PatientConnection')

router.post('/notification',(req,res)=>{
    console.log(req.body);
    const notification1=notification(req.body);
    notification1.save();
    res.send({
        success:true,
        msg:"Has been added successfully"
    })

})
router.post('/findnotification',async (req,res)=>{
    console.log(req.body.user_id);


    let temp=await notification.find({user_id:req.body.user_id});
    console.log(temp);
    if(temp!=null)
    {
        res.send({
            success:true,
            msg:"Successfully fetching all notification",
            data:temp
            
        })
    }
    else
    {
        res.send({
            success:false,
            msg:"Not found any nofication"
        })
    }
    

})
router.post('/editnotification',
async (req,res)=>{
    let temp=await notification.findOne({_id:req.body.message_id});
    if(temp!=null)
    {
        
         await notification.updateOne({_id:req.body.message_id},{
             $set:{
                 notification:{
                     flag:0,
                     msg:temp.notification.msg
                     
                 }
             }
         })

         res.send({
             success:true,
             msg:"Successfull edited",
            
         })
    }
    else
    {
        res.send({
            success:false,
            msg:"Some error has been occured"
        })
    }
}
)

module.exports=router;
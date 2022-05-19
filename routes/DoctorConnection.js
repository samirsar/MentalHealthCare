const express=require('express');
const router=express.Router();

const Appointment=require('../models/DoctorConnection');


router.post('/newappointment',async(req,res)=>{
    console.log(req.body);

    const user=await Appointment(req.body);
    user.save();
    res.send({
        success:true,
        msg:"succefully sent your message"
    })

}) 
router.post('/appointment',async(req,res)=>{
    console.log(req.body);

    let temp=await Appointment.find({user_id:req.body.user_id});

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

router.post('/editappointment',async(req,res)=>{
    console.log(req.body);

    let temp=await Appointment.findOne({_id:req.body.message_id});

    if(temp!=null)
    {
        await Appointment.updateOne({_id:req.body.message_id},{
            $set:{
                appointment:{
                    flag:req.body.flag,
                    data:temp.appointment.data
                }
            }
        })
        res.send({
            success:true,
            msg:"Marked as read"
        })
    }
    else
    {
        res.send({
            success:false,
            msg:"Some error has been occured"
        })
    }

})
router.post('/editnotification',async(req,res)=>{
    console.log(req.body);

    let temp=await Appointment.findOne({_id:req.body.message_id});

    if(temp!=null)
    {
        await Appointment.updateOne({_id:req.body.message_id},{
            $set:{
                notification:{
                    flag:req.body.flag,
                    msg:temp.notification.msg
                }
            }
        })
        res.send({
            success:true,
            msg:"Marked as read"
        })
    }
    else
    {
        res.send({
            success:false,
            msg:"Some error has been occured"
        })
    }

})

module.exports=router;

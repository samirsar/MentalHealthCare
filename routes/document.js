const express=require('express');
const router=express.Router();

const Uploaddocument=require('../models/document')
const multer=require('multer')

const Storage=multer.diskStorage({
    destination:"upload",
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    },
})

const upload=multer({
    storage:Storage

}).single('testImage');

router.post('/upload',
async (req,res)=>{

    
    
    upload(req,res,async(err)=>{
        if(err){
            console.log("hii",req.body)
            console.log(err);
            console.log("bye")
            res.send({
                msg:"Not submitted"
            })
        }
        else
        {
            // console.log(req)
            const temp=await Uploaddocument.findOne({user_id:req.body.user_id});
            if(temp!=null)
         {
             console.log("Kya be kya kar raha",temp)
         }

            const newImage= new Uploaddocument({
                user_id:req.body.user_id,
            
                document:req.file.filename
            })
            newImage.save().then(()=>{
                res.send("succefully upload")
            })
        }
    })

    
}
)
router.post('/getdocument',async (req,res)=>{

    console.log(req.body)

    const temp=await Uploaddocument.find({user_id:req.body.user_id});
     
        if(temp.length!=0)
        {

            res.send({
                success:true,
                msg:"FInd",
                data:temp
            })
        }
        else
        {
            console.log("hii")
            res.send({
                success:false,
                msg:"Not found"
            })
        }


    

}
)
router.post('/deletedocument',async (req,res)=>{

    console.log(req.body)

    const temp=await Uploaddocument.deleteOne({_id:req.body._id});

    res.send({
        success:true,
        msg:"succefully deleted your  selected document document"
    })
     
        


    

}
)
router.post('/getalldocument',async (req,res)=>{

    console.log(req.body)

    const temp=await Uploaddocument.find();
     
        if(temp.length!=0)
        {

            res.send({
                success:true,
                msg:"FInd",
                data:temp
            })
        }
        else
        {
            console.log("hii")
            res.send({
                success:false,
                msg:"Not found"
            })
        }


    

}
)
module.exports=router
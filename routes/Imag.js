const express=require('express');
const router=express.Router();

const UploadImage=require('../models/Image')
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
            await UploadImage.deleteMany({user_id:req.body.user_id});
            const temp=await UploadImage.findOne({user_id:req.body.user_id});
            if(temp!=null)
         {
             console.log("Kya be kya kar raha",temp)
         }

            const newImage= new UploadImage({
                user_id:req.body.user_id,
                // image:{
                //     data:req.file.filename,
                // contentType:'image/jpg'
                // }
                image:req.file.filename
            })
            newImage.save().then(()=>{
                res.send("succefully upload")
            })
        }
    })

    
}
)
router.post('/getimage',async (req,res)=>{

    console.log(req.body)

    const temp=await UploadImage.find({user_id:req.body.user_id});
     
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
router.post('/getallimage',async (req,res)=>{

    console.log(req.body)

    const temp=await UploadImage.find();
     
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
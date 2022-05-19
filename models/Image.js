const mongoose=require('mongoose')
  const { Schema } = mongoose;

  const ImageSchema=new Schema({
      user_id:{
          type:String,
          required:true
      },
    //   image:{
    //       data:Buffer,
    //       contentType:String,
          
    //   },
       image:{
           type:String
       },
      date:{
          type:Date,
          default:Date.now()
      }

  })

  const Upload=mongoose.model('UploadImage',ImageSchema);
  module.exports=Upload;
const mongoose=require('mongoose')
  const { Schema } = mongoose;

  const ImageSchema=new Schema({
      user_id:{
          type:String,
          required:true
      },
    
       document:{
           type:String
       },
      date:{
          type:Date,
          default:Date.now()
      }

  })

  const Upload=mongoose.model('Uploaddocument',ImageSchema);
  module.exports=Upload;
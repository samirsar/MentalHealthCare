const mongoose=require('mongoose')
  const { Schema } = mongoose;

  const ConnectionSchema=new Schema({
      user_id:{
          type:String,
          required:true
      },
      notification:{
          type:Object,
          required:true
      },
      date:{
          type:Date,
          default:Date.now()
      }

  })

  const connection=mongoose.model('PatientConnection',ConnectionSchema);
  module.exports=connection;
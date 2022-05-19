const mongoose=require('mongoose')
  const { Schema } = mongoose;

  const AdminConnectionSchema=new Schema({
      user_id:{
          type:String,
          required:true
      },
      varified:{
          type:Number,
          default:0
      },
      verification:{
          type:Object,
          required:true
      },
      date:{
          type:Date,
          default:Date.now()
      }

  })

  const Adminconnection=mongoose.model('AdminConnection',AdminConnectionSchema);
  module.exports=Adminconnection;
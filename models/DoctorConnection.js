const mongoose=require('mongoose')
  const { Schema } = mongoose;

  const DoctorConnectionSchema=new Schema({
      user_id:{
          type:String,
          required:true
      },
      appointment:{
          type:Object,
          default:{
              flag:1
          }
      },
      notification:{
          type:Object,
          default:{
              flag:1
          }
      },
      date:{
          type:Date,
          default:Date.now()
      }

  })

  const Doctorconnection=mongoose.model('DoctorConnection',DoctorConnectionSchema);
  module.exports=Doctorconnection;
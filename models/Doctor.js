const mongoose=require('mongoose')
  const { Schema } = mongoose;

  const DoctorSchema=new Schema({

    name:{
        type:String,
        required:true,
       },
       email:{
 type:String,
 required:true,
       },
       password:{
 type:String,
 required:true,
       },
       date:{
             type:Date,
             default:Date.now(),
       },
       specialist:{
           type:String,
           default:"Unknown"
       },
       about:{
           type:String,
           require:"Unknown"
       },
       varified:{
           type:Number,
           default:0
       },
       mobile:{
           type:String,
           require:"Unknown"
       },
       category:{
           type:String,
           required:true
       },
       meet_link:{
           type:String,
           default:"Not found any link"
       }

  })
  const Doctor=mongoose.model('MyDoctor',DoctorSchema);
  module.exports=Doctor;
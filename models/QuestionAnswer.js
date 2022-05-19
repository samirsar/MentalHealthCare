const mongoose=require('mongoose')
  const { Schema } = mongoose;

  const QuestionAnswerSchema=new Schema({
    
    mydetail:{
        type:Object,
        required:true
    },
    myproblem:{
        type:Object,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
      
  })

  const user=mongoose.model('Unknowuser',QuestionAnswerSchema);
  module.exports=user;
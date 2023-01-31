const mongoose = require('mongoose');


const mognoUrl="mongodb://localhost:27017/Healthworld?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
// const mognoUrl="mongodb+srv://Samir7:Y7vHd8P1RLKwSZWd@cluster0.qrayz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//  const mognoUrl=process.env.database;


const connectToMongo=()=>{
    // mongoose.connect(mognoUrl,()=>{
    //     console.log("Mongoose connect successfully");
    // })
    mongoose.connect(mognoUrl, {useNewUrlParser: true});
         mongoose.connection.once('open', function(){
         console.log('Conection has been made!');
             }).on('error', function(error){
          console.log('Error is: ', error);
           });
}

module.exports=connectToMongo;
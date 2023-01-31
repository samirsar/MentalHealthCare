const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});

const connectToMongo=require('./db');

const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors=require('cors');

connectToMongo();

app.use(express.json());// it's called mildleware
app.use(cors())
app.use('/static',express.static('upload'))


app.get('/',(req,res)=>{
    res.send("hii what about you");
})
app.use('/api/auth',require('./routes/auth'));
app.use('/image',require('./routes/Imag'));
app.use('/document',require('./routes/document'));
app.use('/api/doctor',require('./routes/doctor'));
app.use('/api/admin',require('./routes/admin'));
app.use('/api/connection',require('./routes/Connection'));
app.use('/api/doctorconnection',require('./routes/DoctorConnection'));
app.use('/api/adminconnection',require('./routes/adminconnection'));
app.use('/unknownuser', require('./routes/QuestionAnswer'));



if ( process.env.NODE_ENV == "production"||process.env.NODE_ENV === 'staging'){

    app.use(express.static("Frontend/build"));

    const path=require('path');
    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, 'Frontend/build', 'index.html'));
    });

}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

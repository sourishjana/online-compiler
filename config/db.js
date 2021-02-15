const mongoose=require('mongoose')
const config=require('config')
const url=config.get('mongoURI')

const uri = url; // production
//const uri="mongodb://127.0.0.1:27017/DSADB" // development

/* mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:false
}); 
git remote add origin https://github.com/sourishjana/DSA-Expert-Project-Admin-Backend.git
git branch -M main
git push -u origin main

//"mongoURI":"mongodb://127.0.0.1:27017/todoooDB",
*/

const connectDB = async()=>{
    try{
        await mongoose.connect(uri,{ useUnifiedTopology: true, useNewUrlParser:true, useCreateIndex:true, useFindAndModify:false })
        console.log("Mongodb connected ...")
    }catch(err){
        console.log(err.message)
        // Exit process with failure 
        process.exit(1)
    }
}

module.exports = connectDB
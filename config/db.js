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
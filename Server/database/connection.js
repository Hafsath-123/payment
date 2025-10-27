const { default: mongoose } = require("mongoose");


function RunServer(){
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log("mongoose is connected")
    
    }catch(error){
        console.log(error.message);
    }
}
module.exports = RunServer

// AJWVuH2JWeBiZ164
const { default: mongoose } = require("mongoose");


const productSchema= new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    description:String,
    image:String,  //e.g '/uploades/filename.jpg
},{timestamps:true});

module.exports=mongoose.model("product",productSchema);
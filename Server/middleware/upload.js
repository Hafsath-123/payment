const multer = require("multer");
const Path =require("path");



const storage=multer.diskStorage({
    destination:function(req,file,cd){
        cd(null,"uploads/");

    },
    filename:function (req,file,cd) {
        const uniqueName=Date.now() + Path.extname(file.originalname);
        cd(null,uniqueName);
    },
});

const fileFilter=(req,file,cd)=>{
    const allowedTypes=["image/jpeg","image/png","image/webp"];
    if(allowedTypes.includes(file.mimetype)){
        cd(null,true);
    }else{
        cd(new Error("Only JPG,PNG,WEBP  files are allowed"),false);
    }   
};

const upload =multer({storage,fileFilter});
module.exports=upload;

const Product =require("../model/product")

// @desc add a new product with image
// @route POST /api/products add

exports.addProduct=async(req,res)=>{
    try{
        const {name,price,description}=req.body;
        const imagePath=req.file ? `uploads/${req.file.filename}`:"";

        const product=new Product({
            name,
            price,
            description,
            image:imagePath,
        });

        await product.save();
        res.status(201).json(product);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"failed to create product"});
    }

};

// @desc Get all product
// @route Get /api/products

exports.getAllProducts=async(req,res)=>{
    try{
        const products=await Product.find().sort({createdAt:-1});
        res.json(products);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"failed to fetch products"});


    }
}
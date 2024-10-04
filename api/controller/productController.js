import {authorizeAdmin,isAuthenticated} from "../middleware/authMiddlewae.js"
import catchAsycError from "../middleware/catchAsycError.js"
import Product from "../model/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const addProduct = catchAsycError(async(req,res,next)=>{
   try {
    const { name, description, price, category, quantity, brand } = req.fields;
    // Validation
    switch (true) {
        case !name:
          return res.json({ error: "Name is required" });
        case !brand:
          return res.json({ error: "Brand is required" });
        case !description:
          return res.json({ error: "Description is required" });
        case !price:
          return res.json({ error: "Price is required" });
        case !category:
          return res.json({ error: "Category is required" });
        case !quantity:
          return res.json({ error: "Quantity is required" });
      }
      const product = new Product({ ...req.fields });
      await product.save();
      res.json(product);
   } catch (error) {
    console.log(error);
    res.status(400).json(error.message)
    
   }
})
export const updateProduct = catchAsycError(async(req,res,next)=>{
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    // Validation
    switch (true) {
        case !name:
          return res.json({ error: "Name is required" });
        case !brand:
          return res.json({ error: "Brand is required" });
        case !description:
          return res.json({ error: "Description is required" });
        case !price:
          return res.json({ error: "Price is required" });
        case !category:
          return res.json({ error: "Category is required" });
        case !quantity:
          return res.json({ error: "Quantity is required" });
      }
    const product = await Product.findByIdAndUpdate(req.params.id,{...req.fields}, {new : true})
    await product.save()
    res.status(200).json(product)
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message)
  }
})


export const deleteProduct = catchAsycError(async(req,res,next)=>{
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    res.status(200).json("product deleted")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" }) 
  }
})

export const fetchProduct = catchAsycError(async(req,res,next)=>{
 try {
   const pageSize = 6;
   const keyword = req.query.keyword ? {
    name : {
      $regex : req.query.keyword,
      $options : "i"
    },
   }: {}
   const count = await Product.countDocuments({...keyword})
   const products =await Product.find({...keyword}).limit(pageSize)
   res.status(200).json({
    products,
    page : 1,
    pages : Math.ceil(count/pageSize),
    hasMore : false
   })

 } catch (error) {
  console.log(error);
  res.status(500).json({error :"internal server error"})
  
 }
})

export const fetchProductById = catchAsycError(async(req,res,next)=>{
 try {
   const product = await Product.findById(req.params.id)
   if (product) {
   return res.status(200).json(product)
   }else{
    return next(new ErrorHandler("product not found", 404))
   }
   
 } catch (error) {
  console.log(error);
  res.status(500).json({error :"internal server error"})
 }
})

export const fetchProducts = catchAsycError(async(req,res,next)=>{
try {
    const products = await Product.find({})
    .populate("category")
    .limit(12)
    .sort({createAt: -1})
    res.status(200).json(products)
} catch (error) {
  console.log(error);
  res.status(500).json({error :"internal server error"})
}
})

export const addProductReview = catchAsycError(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

export const fetchTopProduct = catchAsycError(async(req,res,next)=>{
 try {
   const product = await Product.find({}).sort({rating : -1}).limit(4)
   res.status(200).json(product)
 
 } catch (error) {
  console.error(error);
  res.status(400).json(error.message);
 }
})

export const fetchNewProduct = catchAsycError(async(req,res,next)=>{
  try {
    const product = await Product.find({}).sort({_id : -1}).limit(5)
    res.status(200).json(product)
  } catch (error) {
    console.error(error);
  res.status(400).json(error.message);
  }
 
})
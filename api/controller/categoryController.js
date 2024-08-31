import catchAsycError from "../middleware/catchAsycError.js";
import Category from "../model/categoryModel.js";
import ErrorHandler from "../utils/errorHandler.js";


export const createCategory = catchAsycError(async(req,res,next)=>{
    const {name} = req.body;
    if (!name) {
        return next(new ErrorHandler("Name is required",400))
    }
    const existedCategory = await Category.findOne({name})
    if (existedCategory) {
        return next(new ErrorHandler("Category with that name already exist",400))
    }

    const newCategory = await new Category({name}).save()
    res.status(200).json({newCategory})
})

export const updateCategory = catchAsycError(async(req,res,next)=>{
const {name} = req.body;
const {categoryId} = req.params;
const category = await Category.findOne({_id : categoryId})
if (!category) {
    return next(new ErrorHandler("Category not found with that id",400))
}
category.name = name
const updatedCategory = await category.save()
res.status(200).json({updatedCategory})
})

export const removeCategory = catchAsycError(async(req,res,next)=>{
    const {categoryId} = req.params;
    const removed = await Category.findByIdAndDelete(categoryId)
    res.status(200).json(removed)
})

export const listCategory = catchAsycError(async(req,res,next)=>{
    const category = await Category.find({})
    res.status(200).json({category})
})

export const readCategory = catchAsycError(async(req,res,next)=>{
    const category = await Category.findOne({ _id: req.params.id });
    res.json(category);
})
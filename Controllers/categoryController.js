import slugify from "slugify";
import categoryModel from "../Models/categoryModel.js";

// create category controller
export const createCategoryController = async (req, res) => {
    try{
        const {name} = req.body;
        if(!name){
            return res.status(401).send({
                success: false,
                message: "Name is Required"
            })
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success: false,
                message: "Category already exists"
            })
        }
        const category = await new categoryModel({name, slug: slugify(name)}).save();
        res.status(200).send({
            success:true,
            message:'New Category Successfully added',
            category
        })
    }catch(err){
        console.log("error is", err.message);
        res.status(500).send({
            success: false,
            message : "Error occur while creating a category",
            err
        })
    }
}

// update category controller
export const updateCategoryController = async (req, res) => {
    try{
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true } );
        res.status(200).send({
            success:true,
            message: "category successfully updated successfully",
            category
        })
    }catch(err){
        console.log("error is ",err.message);
        res.status(500).send({
            success: false,
            message: "Error while Applying category",
            err
        })
    }
}

// get all category controller
export const getCategoryController = async(req, res) => {
    try{
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: 'get all category successfully',
            category
        })
    }catch(err){
        console.log("error is ", err.message) ;
        res.status(500).send({
            success: false,
            message : "Error While get All category",
            err
        })
    }
}

// get single category

export const singleCategoryController =async (req, res) => {
    try{
        const category = await categoryModel.findOne({slug: req.params.slug });
        res.status(200).send({
            success: true,
            message : "successfully get the single category",
            category
        })
    }catch(err){
        console.log("error is ", err.message);
        res.status(500).send({
            success: false,
            message : "error while taking single category",
            err
        })
    }
}

// delete category 

export const deleteCategoryController = async(req, res) => {
    try{
        const {id} = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "deleted category successfully..",
            category
        })
    }catch(err){
        console.log("error is ", err.message); 
        res.status(500).send({
            success:false,
            message: "Error While deleting the category",
            err
        })
    }
}
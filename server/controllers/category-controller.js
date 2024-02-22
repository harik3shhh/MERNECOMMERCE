const slugify  = require("slugify");
const categoryModel = require("../models/category-model");

const createCategoryController = async(req, res) => {
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({message: "Category Name is required"});
        }

        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(409).send({
                success: false,
                message: "Category Already Exists",
            });
        }

        const category = await new categoryModel({name, slug:slugify(name),}).save();
        res.status(201).send({
            success: true,
            message: "New Category Created",
            category
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in category",
            error

        })
    }
};

const updateCategoryController = async(req, res) =>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new:true});

        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error from Update Controller",
            error,
        });
    }
};

const categoryController = async(req, res) =>{
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All Categories List",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting all categories",
            error
        });
    }
}

const singleCategoryController = async(req, res) => {
    try {
        const {slug} = req.params;
        const category = await categoryModel.findOne({slug});
        res.status(200).send({
            success: true,
            message: "Get single category successfully",
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting single category",
            error
        });
    }
};

const deleteCategory = async(req, res)=>{
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false, 
            message: "Error while deleting category",
            error,

        });
    }
}


module.exports = {createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategory};
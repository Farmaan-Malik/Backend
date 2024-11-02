import mongoose from "mongoose";
import { Product } from "../models/product-model.js";


export const getProducts = async (req,res)=>{
    try{
        const products = await Product.find({})
        res.status(201).json({success: true, data: products} )
    }catch(error){
        res.status(500).json({success: false, message: "Falji goyi"})
    }
}

export const createProduct =  async (req,res)=>{
    const product = req.body
    if (!product.name || !product.price || !product.image) {
        return res.status(401).json({success: false, message : "Please fill all the fields"})
    }
    const newProduct = new Product(product)
    try{
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct})
    } catch(error){
        res.status(500).json({success: false, message : "Server error"})
    }
}

export const deleteProduct = async (req,res)=>{
    const {id} = req.params;
    try { 
        await Product.findByIdAndDelete(id)
        res.status(201).json({success: true, message: "Product deleted"})
    }catch(error){
        res.status(401).json({success:false,message:"Product not found"})
    }
}

export const updateProduct = async (req,res)=>{

    const {id}= req.params;
    const product = req.body
   
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Id"})
    }
    try{
       const updateProduct =  await Product.findByIdAndUpdate(id,product,{new: true})
        res.status(201).json({success: true, data:updateProduct})
    } catch(error){
        res.status(500).json({success: false, message : "Server error"})
    }
}
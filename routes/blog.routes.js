const express = require("express")
const blogRouter = express.Router()
const {BlogModel} = require("../model/blog.model")
const jwt = require("jsonwebtoken")

blogRouter.get("/",async(req,res)=>{
    const token =  req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token,"society")
    try {
        if(decoded){
          
            const blogs = await BlogModel.find({"userID":decoded.userID})
            res.status(200).send(blogs)
        }
    } catch (error) {
        res.status(400).send({"msg":error.message}) 
    }
})

blogRouter.post("/addblog",async(req,res)=>{
    try {
        const blogs = new BlogModel(req.body)
        await blogs.save()
        res.status(200).send({"msg":"blog has been added"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

blogRouter.delete("/delete/:blogID",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token,"society")
    const blogID = req.params.blogID
    const req_id = decoded.userID
    const blog =await BlogModel.findOne({_id:blogID})
    const userID_in_blog = blog.userID
  
    try {
        if(req_id===userID_in_blog){
            await BlogModel.findByIdAndDelete({_id:blogID})
            res.status(200).send({"msg":"Blog has been deleted"})
        }
    } catch (error) {
        res.status(400).send({"msg":"Not Authorised"})
    }
})

module.exports =  {blogRouter}
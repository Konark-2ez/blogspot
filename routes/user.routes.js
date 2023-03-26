const express  =require("express")
const userRouter = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {UserModel} = require("../model/user.model")

//signup
userRouter.post("/register",async(req,res)=>{
    const {name,email,password,location,age,mobile} = req.body
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            const user = new UserModel({name,email,password:hash,location,age,mobile})
            await user.save()
            res.status(200).send({"msg":"Registration Completed"})       
        })
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

//login

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        console.log(user._id)
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    res.status(200).send({"msg":"Login Successful","token":jwt.sign({"userID":user._id},"society")})

                }
                else{
                    res.status(400).send({"msg":"Wrong Password"})
                }
            })
        }
        else{
            res.status(400).send({"msg":"User doesnot exist please check"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

//get user
userRouter.get("/",async(req,res)=>{
    try {
        const user = await UserModel.find()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports = {userRouter}
const express = require("express")
const mongoose =require("mongoose")
const {connection} = require("./config/db")
const cors = require("cors")
require("dotenv").config()
const {userRouter} = require("./routes/user.routes")
const {auth} = require("./middleware/auth.middleware")
const {blogRouter} =require("./routes/blog.routes")
const app = express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/member",userRouter)
app.use(auth)
app.use("/blogs",blogRouter)

app.listen(process.env.PORT,async()=>{
    console.log("Connecting to DB")
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running At ${process.env.PORT}`)
})
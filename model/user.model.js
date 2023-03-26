const mongoose = require("mongoose")

//userSchema

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    location:String,
    age:Number,
    mobile:String
},{
    versionKey:false
}
)

const UserModel = mongoose.model("member",userSchema)

module.exports = {UserModel}

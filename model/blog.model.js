const mongoose = require("mongoose")

//userSchema

const blogSchema = mongoose.Schema({
    title : String,
    blog:String,
    date:Date,
    userID:String
},{
    versionKey:false
}
)

const BlogModel = mongoose.model("blog",blogSchema)

module.exports = {BlogModel}



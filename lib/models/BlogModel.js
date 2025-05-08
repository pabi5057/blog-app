import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
   title:{
    type:String,
    required:true
   },
    description:{
     type:String,
     required:true
    },
    category:{
     type:String,
     required:true
    },
    author:{
     type:String,
     required:true
    },
    image:{
        type:String,
        required:true
    },
    author_img:{
        type:String,
        default:"author_img.png",
        required:true,

    },
    date:{
        type:Date,
        default:Date.now()
    },
});

const BlogModel= mongoose.models.blog || mongoose.model("blog",blogSchema);
export default BlogModel;
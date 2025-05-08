import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";

const { NextResponse } = require("next/server");
import {writeFile} from "fs/promises";
const fs = require("fs");


const loadDB = async () => {
      await connectDB();
};
loadDB().catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

export async function GET(request) {
    const blogId=request.nextUrl.searchParams.get("id");
    if(blogId){
        const blog=await BlogModel.findById(blogId);
        return NextResponse.json({ blog});
    }else{
        const blogs=await BlogModel.find({});
        return NextResponse.json({ message: "GET request successful",blogs});
    }
   

}

// Helper: Upload file to Cloudinary using buffer
const uploadToCloudinary = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: "blogs" }, (error, result) => {
      if (error) return reject(error);
      resolve(result.secure_url);
    }).end(buffer);
  });
};


export async function POST(request) {
  const formData = await request.formData();

  const imageFile = formData.get("image");

let imageUrl="";
if(imageFile && typeof imageFile ==="object"){
  imageUrl = await uploadToCloudinary(imageFile);
}

  const authorImg = formData.get("authorImg"); 
  const blogData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    author: formData.get("author"),
    image: imageUrl,
    author_img: authorImg || "", 
  };

  await BlogModel.create(blogData);
  return NextResponse.json({ message: "Blog Added", success: true });
}


//handle delete blog
export async function DELETE(request){
  const blogId=request.nextUrl.searchParams.get("id");
  const blog=await BlogModel.findById(blogId);
 // fs.unlink(`./public/${blog.image}`,()=>{})
  await BlogModel.findByIdAndDelete(blogId);
  return NextResponse.json({ message: "Blog Deleted", success: true });
}

export async function PUT(request) {
  const formData = await request.formData();
  const blogId = formData.get("id");
  const blog = await BlogModel.findById(blogId);
  const blogData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
  };

  const authorImg = formData.get("authorImg");
  if (authorImg) {
    blogData.author_img = authorImg;
  }

  const image = formData.get("image");

  if (image && typeof image.arrayBuffer === "function") {
    try {
      const imageUrl = await uploadToCloudinary(image);
      blogData.image = imageUrl;
    } catch (error) {
      return NextResponse.json({ message: "Error uploading image", success: false });
    }
  }


  await BlogModel.findByIdAndUpdate(blogId, blogData);
  return NextResponse.json({ message: "Blog Updated", success: true });
}

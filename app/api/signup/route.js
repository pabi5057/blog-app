import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

const { connectDB } = require("@/lib/config/db");
const { User } = require("@/lib/models/User");
const bcrypt = require("bcrypt");

// Helper: Upload file to Cloudinary using buffer
const uploadToCloudinary = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
  
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "jobs" }, (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }).end(buffer);
    });
  };

export async function POST(req){
    const formData=await req.formData();

    const fullname=formData.get("fullname");
    const email=formData.get("email");
    const password=formData.get("password");
    const imageFile=formData.get("image");

    let imageUrl = "";

    if (imageFile && typeof imageFile === "object") {
      imageUrl = await uploadToCloudinary(imageFile);
    }

    await connectDB();
    const existingUser=await User.findOne({email}); 
    if(existingUser){
        return NextResponse.json({message:"User already exists"}, {status:409}); 
    }
    const hashedPassword=await bcrypt.hash(password, 10);
    const newUser=new User({
        fullname,
        email,
        password:hashedPassword,
        image:imageUrl,
    });
    await newUser.save();
    return NextResponse.json({message:"user created successfully", user:newUser}, {status:201});

}

export async function GET(req){
  try {
    const users=await User.find({});

    return NextResponse.json({mssage:"Fetche all users",users},{status:200});
    
  } catch (error) {
    console.log(error);
  }

}
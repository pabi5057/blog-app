"use client";

import { assets } from "@/Assets/Assets/assets";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function page() {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Technology",
        author: "Alex Bennett",
        authorImg: "/author_img.png",

    });

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("author", data.author);
        formData.append("authorImg", data.authorImg);
        formData.append("image", image);

        const response = await axios.post('/api/blog', formData);
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error("error" || response.data.message);
        }

        setData({
            title: "",
            description: "",
            category: "Technology",
            author: "Alex Bennett",
            authorImg: "/author_img.png",
        })
        setImage(false);


    }

    return (

                    <>
                        <form className="pt-5 px-5 sm:pt-12 sm:pl-16" onSubmit={handleSubmit}>
                            <p className="text-xl">Upload Thumbnail</p>
                            <label htmlFor="image">
                                <Image src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" width={140} height={140} className="mt-4 rounded-lg" />
                            </label>
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                            <p className="text-xl mt-4">Blog title</p>
                            <input name="title" onChange={handleChange} value={data.title} className="w-full sm:w-[500px] mt-4 px-4 py-3 border" type="text" placeholder="Type here " required />
                            <p className="text-xl mt-4">Blog Description</p>
                            <textarea name="description" onChange={handleChange} value={data.description} className="w-full sm:w-[500px] mt-4 px-4 py-3 border" type="text" placeholder="write content here" required />
                            <p className="text-xl mt-4">Blog category</p>
                            <select className="w-40  mt-4 px-4 py-3 border text-gray-500" name="category" onChange={handleChange} value={data.category} id="" required>
                                <option value="Technology">Technology</option>
                                <option value="Startup">Startup</option>
                                <option value="Lifestyle">Lifestyle</option>
                            </select>
                            <br />
                            <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">ADD</button>


                        </form>
                    </>
    );
}

export default page;
"use client"
import { blog_data } from "@/Assets/Assets/assets";
import BlogItem from "./BlogItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader, SyncLoader } from "react-spinners";


function BlogList() {
    const [menu, setMenu] = useState("All");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        const response = await axios.get('/api/blog');
        setBlogs(response.data.blogs);
        setLoading(false);
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div>
            <div className="flex justify-center gap-6 my-10">
                <button onClick={() => setMenu("All")} className={menu === "All" ? "bg-black text-white py-1 px-4 rounded-2xl" : ""}>All</button>
                <button onClick={() => setMenu("Technology")} className={menu === "Technology" ? "bg-black text-white py-1 px-4 rounded-2xl" : ""}>Technology</button>
                <button onClick={() => setMenu("Startup")} className={menu === "Startup" ? "bg-black text-white py-1 px-4 rounded-2xl" : ""}>Startup</button>
                <button onClick={() => setMenu("Lifestyle")} className={menu === "Lifestyle" ? "bg-black text-white py-1 px-4 rounded-2xl" : ""}>Lifestyle</button>

            </div>
            <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
                {
                    loading ? (
                        <div className="flex justify-center items-center col-span-2">
                            <SyncLoader color="#000000" size={15} margin={5} speedMultiplier={1.5} />
                        </div>
                    )
                        : (
                            <>
                                {
                                    blogs.filter((item) => menu === "All" ? true : item.category === menu).map((item, index) => {
                                        return <BlogItem item={item} id={item._id} key={index} />

                                    })
                                }
                            </>
                        )

                }

            </div>
        </div>
    );
}

export default BlogList;
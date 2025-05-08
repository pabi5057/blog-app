"use client";

import { assets } from "@/Assets/Assets/assets";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

function EditModal({ open, handleClose, item, fetchBlogs }) {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        title: item.title,
        description: item.description,
        category: item.category,
        author: "Alex Bennett",
        authorImg: "/author_img.png",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("id", item._id);
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("category", data.category);
            formData.append("author", data.author);
            formData.append("authorImg", data.authorImg);

            if (image) {
                formData.append("image", image);
            }

            const response = await axios.put(`/api/blog`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                fetchBlogs();
                handleClose();
            } else {
                toast.error(response.data.message || "An error occurred");
            }
        } catch (error) {
            console.error("Update Error:", error);
            toast.error("Failed to update the blog.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30"></div>
                <div
                    id="crud-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[50] flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Edit The Blog
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={handleClose}
                                >
                                    <IoClose />
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <form className="p-4 md:p-5" onSubmit={handleEdit}>
                                <p className="text-sm font-bold mb-2">Upload Thumbnail</p>
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                      <Image
                                                src={item.image}
                                                alt="Thumbnail"
                                                width={140}
                                                height={140}
                                                className="mt-4 rounded-lg"
                                            />
                                        <label htmlFor="image">
                                            <Image
                                                src={
                                                    image
                                                        ? URL.createObjectURL(image)
                                                        :assets.upload_area
                                                }
                                                alt="Thumbnail"
                                                width={140}
                                                height={140}
                                                className="mt-4 rounded-lg"
                                            />
                                        </label>
                                        <input
                                            onChange={(e) => setImage(e.target.files[0])}
                                            type="file"
                                            id="image"
                                            hidden
                                        />
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="title"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={data.title}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            placeholder="Enter title"
                                            required
                                        />
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="category"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Category
                                        </label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={data.category}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            required
                                        >
                                            <option value="Technology">Technology</option>
                                            <option value="Startup">Startup</option>
                                            <option value="Lifestyle">Lifestyle</option>
                                        </select>
                                    </div>

                                    <div className="col-span-2">
                                        <label
                                            htmlFor="description"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows="4"
                                            value={data.description}
                                            onChange={handleChange}
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            placeholder="Enter blog description..."
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 ${loading ? "opacity-60 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {loading ? "Updating..." : "Update Blog"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
        </>
    );
}

export default EditModal;

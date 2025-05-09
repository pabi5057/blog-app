"use client";

import BlogTableItem from "@/components/AdminComponents/BlogTableItem";
import DeleteModal from "@/components/AdminComponents/DeleteModal";
import EditModal from "@/components/AdminComponents/EditModal";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SyncLoader } from "react-spinners";

function page() {
    const [blogs, setBlogs] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const fetchBlogs = async () => {
        const response = await axios.get('/api/blog');
        setBlogs(response.data.blogs);
        setLoading(false)
    }

    const handleDeleteModal = (id) => {
        setDeleteId(id);
        setDeleteOpen(true);
    }

    const handleDeleteClose = () => {
        setDeleteOpen(false);
        setDeleteId(null);
    }

    const handleOpen = (item) => {
        setSelectedBlog(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedBlog(null);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);



    return (
        <>
            {
                loading ? (
                    <div className="flex justify-center items-center col-span-10 mt-52">
                        <SyncLoader color="#000000" size={15} margin={5} speedMultiplier={1.5} />
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col  pt-5 px-5 sm:pt-12 sm:pl-16">
                            <h1 className="text-2xl font-semibold">All blogs</h1>
                            <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4  border border-gray-400 scrollbar-hide ">
                                <table className="w-full text-sm text-left text-gray-500 ,n">
                                    <thead className="text-sm  text-gray-700 text-left  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 hidden sm:block">
                                                Author Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Blog Title
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            blogs.map((item, index) => {
                                                return <BlogTableItem item={item} key={index} title={item.title} author={item.author} id={item._id} date={item.date} fetchBlogs={fetchBlogs} handleOpen={() => handleOpen(item)} handleDeleteModal={() => handleDeleteModal(item._id)} session={session} />
                                            })

                                        }

                                    </tbody>
                                </table>

                            </div>

                        </div>
                    </>
                )
            }
            {
                open && (
                    <EditModal open={open} handleClose={handleClose} item={selectedBlog} fetchBlogs={fetchBlogs} />
                )
            }
            <DeleteModal open={deleteOpen} handleClose={handleDeleteClose} id={deleteId} fetchBlogs={fetchBlogs} />
        </>
    );
}

export default page;
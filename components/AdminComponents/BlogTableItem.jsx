import { assets } from "@/Assets/Assets/assets";
import Image from "next/image";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";


function BlogTableItem({item, authorImg, title, author, id, date,fetchBlogs,handleOpen,handleDeleteModal }) {
    
    return (
        <>
        <tr className="bg-white border-b">
            <th scope="row" className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <Image src={authorImg ? authorImg : assets.profile_icon} alt="" width={40} />
                <p>{author ? author : "No author"}</p>

            </th>
            <td className="px-6 py-4">
                {title ? title : "no title"}
            </td>
            <td className="px-6 py-4">
                {date ? new Date(date).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                }).replace(/ /g, " ") : "no date"}
            </td>
            <td className="px-6 py-4" >
                <div className="flex items-center gap-2 cursor-pointer">
                   <MdDelete onClick={()=>handleDeleteModal(id)}/><MdEdit onClick={()=>handleOpen(item)}/>
                </div>
            </td>

        </tr>

     
        </>
    );
}

export default BlogTableItem;
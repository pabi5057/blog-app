import { assets } from "@/Assets/Assets/assets";
import Image from "next/image";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";


 function BlogTableItem({item, authorImg, title, author, id, date,fetchBlogs,handleOpen,handleDeleteModal,session }) {
    const isAuthor = String(session?.user?.id) === String(item?.user?._id);
    return (
        <>
        <tr className="bg-white border-b">
            <th scope="row" className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <Image src={item.user.image ? item.user.image : assets.profile_icon} alt="" width={40} height={40} />
                <p>{item.user.fullname ? item.user.fullname : "No author"}</p>

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
            {isAuthor ? (
          <div className="flex items-center gap-2 cursor-pointer">
            <MdDelete
              className="text-[1.5rem] text-red-600"
              onClick={handleDeleteModal}
            />
            <MdEdit
              className="text-[1.5rem] text-blue-600"
              onClick={handleOpen}
            />
          </div>
        ) : (
          <span className="text-gray-400 italic">No actions</span>
        )}
            </td>

        </tr>

     
        </>
    );
}

export default BlogTableItem;
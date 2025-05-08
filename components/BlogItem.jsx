'use client';

import { motion } from "framer-motion";
import { assets } from "@/Assets/Assets/assets";
import Image from "next/image";
import Link from "next/link";

function BlogItem({ item }) {
    return (
        <div className="group max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px] hover:shadow-black overflow-hidden">
            <Link href={`/blogs/${item._id}`}>
                <motion.div
                    className="overflow-hidden border-b border-black"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                >
                    <Image
                        src={item.image}
                        alt=""
                        width={400}
                        height={400}
                        className="object-cover w-full h-auto transition-transform duration-500"
                    />
                </motion.div>
            </Link>
            <p className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm">{item.category}</p>
            <div className="p-5">
                <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">{item.title}</h5>
                <p className="mb-3 text-sm tracking-tight text-gray-700">{item.description}</p>
                <Link href={`/blogs/${item.id}`} className="inline-flex items-center py-2 font-semibold text-center ">
                    Read more <Image src={assets.arrow} alt="" width={12} className="ml-2" />
                </Link>
            </div>
        </div>
    );
}

export default BlogItem;
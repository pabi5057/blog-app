import { assets } from "@/Assets/Assets/assets";
import Image from "next/image";
import Link from "next/link";

function Sidebar() {
    return (
        <div className="flex flex-col bg-white ">
            <div className="px-2 sm:pl-14 py-3 border border-black">
                <Link href="/">
                <Image src={assets.logo} width={120} alt="" />
                </Link>
            </div>
            <div className="w-28 sm:w-80  sm:min-h-full min-h-full relative py-12 border border-black  from-gray-100 to-gray-200">
                <div className="w-[50%] sm:w-[80%] absolute left-6">
                <Link href='/admin' className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px] shadow-black hover:scale-95">
                        <Image src={assets.dashboard} alt="" width={28} /><p className="hidden sm:block">Dashboard</p>
                    </Link>
                    <Link href='/admin/addProduct' className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px] shadow-black hover:scale-95">
                        <Image src={assets.add_icon} alt="" width={28} /><p className="hidden sm:block">Add Blogs</p>
                    </Link>
                    <Link href='/admin/blogList' className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px] shadow-black hover:scale-95">
                        <Image src={assets.blog_icon} alt="" width={28} /><p className="hidden sm:block">Blog Lists</p>
                    </Link>
                    <Link href='/admin/subscriptions' className="mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px] shadow-black hover:scale-95">
                        <Image src={assets.email_icon} alt="" width={28} /><p className="hidden sm:block">Subscriptions</p>
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Sidebar;
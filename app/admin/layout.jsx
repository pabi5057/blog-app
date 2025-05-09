import { assets } from "@/Assets/Assets/assets";
import Sidebar from "@/components/AdminComponents/Sidebar";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { authOptions } from "../api/auth/[...nextauth]/route";
import SessionProviderWrapper from "@/components/AdminComponents/SessionProviderWrapper";

export default async  function Layout({ children }) {
    const session = await getServerSession(authOptions);
    return (
        <>
            <div className="flex">
                <ToastContainer theme="dark"/>
                <Sidebar />
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between w-full  h-[4rem]  py-3 max-h-[60px] @min-xs:h-[50px] px-12 border-b border-black ">
                        <h3 className="font-medium">Admin Panel</h3>
                        <Image src={session?.user?.image||assets.profile_icon} alt="" width={40} height={40} className="rounded-full"/>

                    </div>
                    <SessionProviderWrapper session={session}>
                    {children}
                    </SessionProviderWrapper>
                </div>
            </div>
        </>
    )
}
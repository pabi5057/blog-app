"use client";
import { useState } from "react";
import { assets } from "@/Assets/Assets/assets";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { signOut } from "next-auth/react";
import Link from "next/link";


function Header({session}) {
    const [email, setEmail] = useState("");

    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);

            const res = await axios.post('/api/email', formData);
             if (res.data.success) {
                toast.success(res.data.message);
                setEmail("");
            }
            else {
                toast.error("error" || res.data.message);
            }
    }

    return (
        <div className="px-5 py-5 md:px-12 lg:px-28">
            <div className="flex justify-between items-center">
                <Image src={assets.logo} alt="logo" width={140} className="w-[130px] sm:w-auto " />
                <div className="flex ">
                    {
                        session
                        ?<button onClick={()=>{
                            signOut({callbackUrl:"http://localhost:3000/"})
                        }} className="mr-3 px-4 py-2 w-24 xs:w-18 sm:w-28 md:w-40 lg:w-40 bg-black text-white border rounded-lg">Logout</button>
                        :<Link href="/signup" className="mr-8 p-2 w-40 sm:w-28 bg-black text-white border rounded-lg text-center">SignUp</Link>
                    }
                    {
                        session &&(  <Link href="/admin/addProduct" className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 
                            border border-solid border-black shadow-[-7px_7px_0px] shadow-black">Get Started <Image src={assets.arrow} alt="" /></Link>)
                    }
              
                </div>
            </div>
            <div className="text-center my-18">
                <h1 className="text-3xl font-medium sm:text-5xl">Latest Blogs</h1>
                <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">Lorem Ipsum is simply dummt text of the printinf and typetesting industry.Lorem Ipsum has been the industry's standard dummy text ever.</p>
                <form onSubmit={handleSubmit} className="flex justify-between max-w-[500px] mx-auto mt-10 scale-75 sm:scale-100 border border-black shadow-[-7px_7px_0px] shadow-black">
                    <input type="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-4 outline-none" />
                    <button type="submit" className="border-1 border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white">Subscribe</button>
                </form>

            </div>


        </div>
    );
}

export default Header;
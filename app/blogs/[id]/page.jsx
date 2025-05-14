"use client";

import { assets, blog_data } from "@/Assets/Assets/assets";
import Footer from "@/components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import 'aos/dist/aos.css';
import AOS from 'aos';

function Page({ params }) {
    const [data, setData] = useState(null);
    const { id } = use(params);

    const fetchBlogData=async ()=>{
        const response=await axios.get('/api/blog',{
            params:{
                id:id
            }
        });
        setData(response.data.blog);
    }

    useEffect(()=>{
        fetchBlogData();
    },[]);

    useEffect(() => {
        AOS.init({
          duration: 2000, 
          once: true,   
        });
      }, []);

    return (
        data ? <>
            <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
                <div className="flex justify-between items-center">
                    <Link href="/">
                       <Image  src={assets.logo} alt="" width={180} className="w-[130px] sm:w-auto" />
                    </Link>
                    <Link href="/admin/addProduct" className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 
                border border-solid border-black shadow-[-7px_7px_0px] shadow-black">Get Started <Image src={assets.arrow} alt="" /></Link>
                </div>
                <div className="text-center my-24">
                    <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">{data.title}</h1>
                    <Image src={data?.user?.image} alt="" width={60} height={60} className="mx-auto mt-6 border border-white rounded-full" />
                    <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">{data?.user?.fullname}</p>
                </div>
            </div>
            <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
                <Image data-aos="zoom-in" src={data.image} className="border-4 border-white" width={1280} height={720} alt=""/>
                <h1 className="my-8 text-[26px] font-semibold">Introduction:</h1>
                <p className="">{data.description}</p>
                <h3 className="my-5 text-[18px] font-semibold">Step 1: Self-Reflection and goal Setting</h3>
                <p className="my-3 ">Befor you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflecting on your values, aspirations, and long-term goals.</p>
                <p className="my-3 ">Befor you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflecting on your values, aspirations, and long-term goals.</p>
                
                <h3 className="my-5 text-[18px] font-semibold">Step 2: Self-Reflection and goal Setting</h3>
                <p className="my-3 ">Befor you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflecting on your values, aspirations, and long-term goals.</p>
                <p className="my-3 ">Befor you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflecting on your values, aspirations, and long-term goals.</p>
                
                <h3 className="my-5 text-[18px] font-semibold">Step 3: Self-Reflection and goal Setting</h3>
                <p className="my-3 ">Befor you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflecting on your values, aspirations, and long-term goals.</p>
                <p className="my-3 ">Befor you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflecting on your values, aspirations, and long-term goals.</p>
                 
                <h3 className="my-5 text-[18px] font-semibold">Conclusion:</h3>
                <p className="my-3 ">Manage your lifestyle is a journey that requires commitment and self-awareness. By following this step-by-step guide, You can take control of your life and make 
                    meaningful changes that lead to a more fulfilling and balanced existence. Remember that it's okay to seek support from friends, family, or professionals along the way. Embrace the 
                    process, and you'll find yourself on a path to a healthier and happier lifestyle.
                </p>
                <div className="my-24">
                    <p className="text-black font-semibold my-4">Share this article on social media</p>
                    <div className="flex">
                        <Image src={assets.facebook_icon} alt="" width={50} className="mr-5 cursor-pointer hover:scale-130 " />
                        <Image src={assets.twitter_icon} alt="" width={50}  className="mr-5 cursor-pointer hover:scale-130" />
                        <Image src={assets.googleplus_icon} alt="" width={50} className="mr-5 cursor-pointer hover:scale-130" />
                    </div>
                </div>
            </div>
            <Footer/>
        </> : <></>
    );
}

export default Page;
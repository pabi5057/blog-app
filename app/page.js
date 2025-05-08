import BlogItem from "@/components/BlogItem";
import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
   <>
   <ToastContainer theme="dark" />
     <Header session={session}/>
     <BlogList/>
     <Footer/>
   </>
  );
}

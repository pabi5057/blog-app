"use client";

import SubscriptionTableItem from "@/components/AdminComponents/SubscriptionTableItem";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";


function page() {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEmails = async () => {
        const response = await axios.get('/api/email');
        setEmails(response.data.emails);
        setLoading(false);
    }

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

    useEffect(() => {
        fetchEmails();
    }, []);

    return (
        <>
            {
                loading ? (
                    <div className="flex justify-center items-center col-span-2 mt-40">
                        <SyncLoader color="#000000" size={15} margin={5} speedMultiplier={1.5} />
                    </div>
                ) : (
                    <>
                        <div className="flex-1  pt-5 px-5 sm:pt-12 sm:pl-16">
                            <h1>All Subscriptions</h1>
                            <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4  border border-gray-400 scrollbar-hide ">
                                <table className="w-full text-sm text-left text-gray-500 ">
                                    <thead className="text-xs text-ledt text-gray-700 uppercase bg-gray">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Email Subscription</th>
                                            <th scope="col" className="px-6 py-3 hidden sm:block">Date</th>
                                            <th scope="col" className="px-6 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            emails.map((item, index) => {
                                                return <SubscriptionTableItem email={item.email} date={item.Date} key={index} id={item._id} />
                                            })
                                        }
                                    </tbody>

                                </table>

                            </div>

                        </div>
                    </>
                )
            }
        </>

    );
}

export default page;
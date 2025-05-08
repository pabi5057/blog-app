import { assets } from "@/Assets/Assets/assets";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

function SubscriptionTableItem({ email, date, id }) {
    const router=useRouter()
    const handleDelete = async () => {
        const res = await axios.delete(`/api/email?id=${id}`);
        const data = await res.data;
        if (data.success) {
            toast.success("Email Deleted");
            router.refresh();
        } else
            toast.error("Error deleting email");
    }

    return (
        <tr className="bg-white border-b">
            <th scope="row" className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap">

                <p>{email ? email : "No email"}</p>

            </th>
            <td className="px-6 py-4">
                {date ? new Date(date).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                }).replace(/ /g, " ") : "no date"}
            </td>
            <td className="px-6 py-4" onClick={handleDelete} >
                X 
            </td>

        </tr>
    );
}

export default SubscriptionTableItem;
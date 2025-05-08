
import { IoTrash } from "react-icons/io5";
import { toast } from "react-toastify";

export default function DeleteModal({open,handleClose,id,fetchBlogs}) {
        const handleDelete = async () => {
            const res = await fetch(`/api/blog?id=${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Blog Deleted");
                fetchBlogs();
                handleClose();
            } else {
                toast.error("Error deleting blog");
            }
        }
  return (
    <>
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"></div>

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Are you sure you want to delete this blog?
              </h2>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

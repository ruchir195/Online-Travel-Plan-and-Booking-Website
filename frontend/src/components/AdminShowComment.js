import React, { useState, useEffect } from 'react'

const AdminShowComment = () => {

  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        const host = "http://localhost:5000";
        const response = await fetch(`${host}/api/home/getComment`, {
          method: "GET"
        });

        if (!response.ok) {
          throw new Error("Failed to fetch comment data");
        }

        const commentData = await response.json();
        console.log(commentData);
        setCommentData(commentData.commentData);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchCommentData();
  }, []);

  const deleteHandler = async (commentId) => {
    try {
      const host = "http://localhost:5000";
      const response = await fetch(`${host}/api/admin/deleteComment/${commentId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }
  
      // If deletion is successful, you might want to update the comment data state
      // to reflect the changes without having to make an additional request.
      setCommentData((prevCommentData) =>
        prevCommentData.filter((comment) => comment._id !== commentId)
      );
      console.log("Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };
  


return (
  <div className='bg-gray-100'>
    {/* <div>Show User Details</div> */}
    <div className='w-4/5 mx-auto my-10 h-[35rem] overflow-y-auto'>
      <div className='mx-auto'>
        <table className="w-full table-fixed border border-gray-200 divide-y divide-gray-200">
          <thead className="sticky top-0 bg-gray-50 z-10">
            <tr className='border border-gray-200'>
              <th scope="col" className=" w-24 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                Comment Id
              </th>
              <th scope="col" className=" w-1/5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                User Name
              </th>
              <th scope="col" className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                Comment
              </th>
              <th scope="col" className="w-1/5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {commentData && commentData.map((comment, index) => (
              <tr key={comment.id} className="nameSearch">
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">{comment.userName}</td>
                <td className="px-6 py-4  border-r border-gray-200">{comment.comment}</td>
                <td className="px-6 py-4 whitespace-nowrap"><button className="text-white bg-indigo-400  mb-3 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-500 rounded text-lg" onClick={() => deleteHandler(comment._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>


)
}

export default AdminShowComment
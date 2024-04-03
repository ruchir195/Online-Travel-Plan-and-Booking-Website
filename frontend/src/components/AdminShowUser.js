import React, { useState, useEffect } from 'react';

const AdminShowUser = () => {
    // Define userData state and setter function
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const host = "http://localhost:5000";
                const response = await fetch(`${host}/api/admin/showUser`, {
                    method: "GET"
                });

                if (!response.ok) {
                    throw new Error("failed to fetch user data");
                }

                const userData = await response.json();
                console.log(userData.users);
                // Update userData state with the fetched data
                setUserData(userData);
            } catch (error) {
                console.log("Error fetching data: ", error);
            }
        }

        // Call the function to fetch user data
        fetchUserData();
    }, []);


    return (
        <div className=' bg-gray-100'>
            {/* <div>Show User Details</div> */}
            <div className='w-4/5 mx-auto my-10 h-[35rem] overflow-y-auto'>
                <div className='mx-auto'>
                    <table className="w-full border border-gray-200 divide-y px-5 divide-gray-200">
                        <thead className="sticky top-0 border border-gray-200 bg-gray-50 z-10">
                            <tr className='border border-gray-200'>
                                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                    User Id
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                    User Name
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                    Email Id
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mobile No.
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {userData && userData.users && userData.users.map((user, index) => (
                                <tr key={user.id} className="nameSearch">
                                    <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">{user.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                                </tr>
                            ))}
                           
                        </tbody>

                    </table>
                </div>
            </div>
        </div>

    )
}

export default AdminShowUser;

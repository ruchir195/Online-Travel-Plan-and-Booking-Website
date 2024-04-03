import React, { useState, useEffect } from 'react';


const AdminTravelerUserDetails = () => {

    // Define userData state and setter function
    const [travelerData, setTravelerData] = useState([]);

    useEffect(() => {
        const fetchTravelerData = async () => {
            try {
                const host = "http://localhost:5000";
                const response = await fetch(`${host}/api/admin/showTraveler`, {
                    method: "GET"
                });

                if (!response.ok) {
                    throw new Error("failed to fetch traveler data");
                }

                const travelerData = await response.json();
                console.log(travelerData);
                // Update userData state with the fetched data
                setTravelerData(travelerData);
            } catch (error) {
                console.log("Error fetching data: ", error);
            }
        }

        // Call the function to fetch user data
        fetchTravelerData();
    }, []);



    return (
        <div className=' bg-gray-100'>
            <div>Show Traveler Details</div>
            <div className='px-14 mx-auto my-10 h-[35rem] overflow-y-auto'>
                <div className='mx-auto'>
                    <table className="w-full border border-gray-200 divide-y px-5 divide-gray-200">
                        <thead className="sticky top-0 border border-gray-200 bg-gray-50 z-10">
                            <tr className='border border-gray-200'>
                                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                    Traveler Id
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                    Traveler Data
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                    Place Name
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                    Starting Date
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                                    Duration
                                </th>
                                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Cost
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-black">
                            {travelerData && travelerData.travelerDetails && travelerData.travelerDetails.map((traveler, index) => {
                                const formData = JSON.parse(traveler.travelerFormData);
                                return (
                                    <tr key={index} className="nameSearch">
                                        <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                                            {/* Displaying adult information */}
                                            {formData.adults && formData.adults.map((adult, adultIndex) => (
                                                <div key={adultIndex}>
                                                    <h2 className='mt-10 text-lg font-semibold'>{`Adult ${adultIndex + 1}:`}</h2>
                                                    <p>{`Name: ${adult.name} ${adult.lname}`}</p>
                                                    <p>{`Email: ${adult.email}`}</p>
                                                    <p>{`Date of Birth: ${adult.dob}`}</p>
                                                    <p>{`Mobile: ${adult.mobile}`}</p>
                                                    <p>{`Adhar No.: ${adult.adharNo}`}</p>
                                                    <p>{`Address: ${adult.address}`}</p>
                                                    {/* Include other fields like email, mobile, etc. */}
                                                </div>
                                            ))}
                                            {formData.children && formData.children.map((child, childIndex) => (
                                                <div key={childIndex}>
                                                    <h2 className='mt-10 text-lg font-semibold'>{`child ${childIndex + 1}:`}</h2>
                                                    <p>{`Name: ${child.name} ${child.lname}`}</p>
                                                    <p>{`Email: ${child.email}`}</p>
                                                    <p>{`Date of Birth: ${child.dob}`}</p>
                                                    <p>{`Mobile: ${child.mobile}`}</p>
                                                    <p>{`Adhar No.: ${child.adharNo}`}</p>
                                                    <p>{`Address: ${child.address}`}</p>
                                                </div>
                                            ))}
                                            {formData.seniors && formData.seniors.map((senior, seniorIndex) => (
                                                <div key={seniorIndex}>
                                                    <h2 className='mt-10 text-lg font-semibold'>{`senior ${seniorIndex + 1}:`}</h2>
                                                    <p>{`Name: ${senior.name} ${senior.lname}`}</p>
                                                    <p>{`Email: ${senior.email}`}</p>
                                                    <p>{`Date of Birth: ${senior.dob}`}</p>
                                                    <p>{`Mobile: ${senior.mobile}`}</p>
                                                    <p>{`Adhar No.: ${senior.adharNo}`}</p>
                                                    <p>{`Address: ${senior.address}`}</p>
                                                </div>
                                            ))}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">{traveler.placeName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">{new Date(traveler.startingDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">{traveler.duration}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{traveler.totalCost}</td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminTravelerUserDetails
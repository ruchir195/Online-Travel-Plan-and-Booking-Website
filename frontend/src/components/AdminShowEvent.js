import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';

const AdminShowEvent = () => {
  // Define userData state and setter function
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const host = "http://localhost:5000";
        const response = await fetch(`${host}/api/admin/showEvent`, {
          method: "GET"
        });

        if (!response.ok) {
          throw new Error("failed to fetch event data");
        }

        const eventData = await response.json();
        console.log(eventData.placeDetails);
        // Update userData state with the fetched data
        setEventData(eventData.placeDetails);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }

    // Call the function to fetch user data
    fetchEventData();
  }, []);


  const deleteHandler = async (placeId) => {
    try {
        const host = "http://localhost:5000";
        const response = await fetch(`${host}/api/admin/deletePlace/${placeId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete place");
        }

        // If deletion is successful, you might want to update the comment data state
        // to reflect the changes without having to make an additional request.
        setEventData((prevEventData) =>
            prevEventData.filter((place) => place._id !== placeId)
        );
        console.log("Place deleted successfully");
    } catch (error) {
        console.error("Error deleting Place:", error.message);
    }
};



  return (
    <div className='w-full bg-gray-100'>
      {eventData ? (
        <div>
          {/* <div>Show Event Details</div> */}
          <div className='w-full px-5  my-10 h-[35rem] overflow-y-auto'>
            <div className='mx-auto'>
              <table className="w-full border border-gray-200 divide-y px-5 divide-gray-200">
                <thead className="sticky top-0 border border-gray-200 bg-gray-50 z-10">
                  <tr className='border border-gray-200'>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      Id
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      Package Name
                    </th>
                    <th scope="col" className=" w-1/5 px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      Places Name
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase border-r border-gray-200 tracking-wider">
                      Time Duration
                    </th>
                    {/* <th scope="col" className="px-6 w-1/2 mx-36 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      Place Content
                    </th> */}
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      Adult Cost
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      Child Cost
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      Senior citizon cost
                    </th>

                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      Hotel Name
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      Area
                    </th>
                    {/* <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      places Details
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      Days details
                    </th> */}
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DELETE
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {eventData && eventData.map((place, index) => (
                    <tr key={place.id} className="nameSearch">
                      <td className="px-6 py-4  border-r border-gray-200">{index + 1}</td>
                      <td className="px-6 py-4  border-r border-gray-200">{place.placeName}</td>
                      <td className="px-6 py-4  border-r border-gray-200">{place.placesName}</td>
                      <td className="px-6 py-4 border-r">{place.duration}</td>
                      {/* <td className="px-6 py-4 w-1/2 mx-20 whitespace-wrap  border-r border-gray-200"><div className=' mx-20'> {place.placeContent}</div>
                       </td> */}
                      <td className="px-6 py-4  border-r border-gray-200">
                        {place.adultCost}</td>
                      <td className="px-6 py-4 border-r">{place.childCost}</td>
                      <td className="px-6 py-4  border-r border-gray-200">
                        {place.seniorCost}</td>
                      <td className="px-6 py-4 border-r">{place.hotelName}</td>
                      <td className="px-6 py-4 border-r">{place.area}</td>
                      {/* <td className="px-6 py-4  border-r border-gray-200">

                        {place.placesInfo}</td>
                      <td className="px-6 py-4  border-r border-gray-200">
                        {place.details}</td> */}
                      <td className=""> <button className={`text-white bg-indigo-400 border-0 mx-10 mb-3 py-2 px-10 focus:outline-none hover:bg-indigo-500 rounded text-lg `}onClick={() => deleteHandler(place._id)}  >Delete</button></td>
                    </tr>
                  ))}

                </tbody>

              </table>


              {/* <div class="container mx-auto px-4 py-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-lg font-semibold mb-2">Package Name</h3>
                <p class="text-gray-600 mb-4">Package Details</p>
                <ul class="text-gray-600 mb-4">
                  <li>Place Name: Place Details</li>
                  <li>Time Duration: X days</li>
                  <li>Adult Cost: $X</li>
                  <li>Child Cost: $X</li>
                  <li>Senior Citizen Cost: $X</li>
                  <li>Hotel Name: Hotel Details</li>
                  <li>Area: Area Details</li>
                  <li>Places Details: Details</li>
                  <li>Days Details: Details</li>
                </ul>
                <div class="flex justify-end">
                  <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">Edit</button>
                </div>
              </div>
            </div> 
          </div>*/}

            </div>
          </div>
        </div>

      )
        : (
          <span className=' justify-center mx-auto items-center align-middle'><Spinner /></span>
        )}
    </div>
  )
}

export default AdminShowEvent


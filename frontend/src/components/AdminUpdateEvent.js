import React, { useEffect, useState } from 'react';

const AdminUpdateEvent = ({ selectedPlace }) => {
  const [placeDetails, setPlaceDetails] = useState({
    placeName: '',
    placesName: '',
    duration: '',
  });

  console.log(selectedPlace);

  // Fetch place details from the database based on the selected place
  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const host = "http://localhost:5000";

        const response = await fetch(`${host}/api/admin/${selectedPlace}`, {
          method: "GET"
        });
        if (!response.ok) {
          throw new Error('Failed to fetch place details');
        }
        const placeData = await response.json();
        console.log(placeData);
        setPlaceDetails(placeData.place);
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };

    fetchPlaceDetails();
  }, [selectedPlace]);

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlaceDetails({
      ...placeDetails,
      [name]: value,
    });
  };

  const [activeStep1, setActiveStep1] = useState(1);


  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        placesName: placeDetails.placesName,
        duration: placeDetails.duration,
      };

      console.log("Request Data:", requestData);
      localStorage.setItem("placeName", placeDetails.placeName);
      localStorage.setItem("placesName", placeDetails.placesName);
      localStorage.setItem("duration",placeDetails.duration);


      // Make sure to change the API endpoint to match your backend route
      const host = "http://localhost:5000";
      const response = await fetch(`${host}/api/admin/${selectedPlace}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });


      setActiveStep1(2)

      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        throw new Error('Failed to update place details');
      }

      console.log('Place details updated successfully');
    } catch (error) {
      console.error('Error updating place details:', error);
    }
  };










  const [placeDetails2, setPlaceDetails2] = useState({
    placeName: '',
    placesName: '',
    duration: '',
    placeContent: '',
    adultCost: '',
    childCost: '',
    seniorCost: '',
    hotelName: '',
    area: ''
  });

  const [dayFields, setDayFields] = useState([
    { details: '' }, // Initialize with an empty day field
  ]);

  // places
  const [placesFields, setPlacesFields] = useState([
    { placesInfo: '' }, // Initialize with an empty day field
  ]);


  // Fetch place details from the database based on the selected place
  useEffect(() => {
    const fetchPlaceDetails2 = async () => {
      try {
        const host = "http://localhost:5000";

        const response = await fetch(`${host}/api/admin/placeDetails/${selectedPlace}`, {
          method: "GET"
        });
        if (!response.ok) {
          throw new Error('Failed to fetch place details');
        }
        const placeData = await response.json();
        console.log(placeData);
        setPlaceDetails2(placeData.place);
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };

    fetchPlaceDetails2();
  }, [selectedPlace]);


  // Function to handle form field changes
  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setPlaceDetails2({
      ...placeDetails2,
      [name]: value,
    });
  };



  // Function to handle form submission
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      const requestData2 = {
        placesName: placeDetails2.placesName,
        duration: placeDetails2.duration,
        placeContent: placeDetails2.placeContent,
        adultCost: placeDetails2.adultCost,
        childCost: placeDetails2.childCost,
        seniorCost: placeDetails2.seniorCost,
        hotelName: placeDetails2.hotelName,
        area: placeDetails2.area,
      };

      console.log("Request Data:", requestData2);


      // Make sure to change the API endpoint to match your backend route
      const host = "http://localhost:5000";
      const response = await fetch(`${host}/api/admin/placeDetails/${selectedPlace}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData2),
      });


      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        throw new Error('Failed to update place details');
      }

      console.log('Place details updated successfully');
    } catch (error) {
      console.error('Error updating place details:', error);
    }
  };



  return (
    <div className="container">
      {activeStep1 === 1 && (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 className="px-10 py-5 text-xl">Event Page update Information</h2>
          <hr />
          <div className="container my-4 flex">
            <div className="lg:w-1/2 md:w-1/2 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
              <div className="relative mb-4">
                <label htmlFor="placeName" className="leading-7 text-sm text-gray-600">
                  Place Name:
                </label>
                <input
                  type="text"
                  id="placeName"
                  name="placeName"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="e.g. Goa"
                  value={placeDetails.placeName}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="placesName" className="leading-7 text-sm text-gray-600">
                  Places Name:
                </label>
                <input
                  type="text"
                  id="placesName"
                  name="placesName"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="e.g. panaji + North Goa + South Goa"
                  value={placeDetails.placesName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative">
                <label htmlFor="duration" className="leading-7 text-sm text-gray-600">
                  Duration:
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="e.g. 10 days / 9 nights"
                  value={placeDetails.duration}
                  onChange={handleInputChange}
                />
              </div>

            </div>
            {/* <div className="lg:w-2/6 md:w-1/2 mx-auto items-center justify-center rounded-lg flex flex-col w-full mt-10 md:mt-0">
            <img
              src="../images/Event-Forms.png"
              alt=""
              className="size-96 w-full object-cover object-center rounded hidden sm:block"
            />
          </div> */}
          </div>
          <button className={`text-white bg-indigo-400 border-0 mx-10 mb-3 py-2 px-10 focus:outline-none hover:bg-indigo-500 rounded text-lg`} type="submit">
            Next
          </button>
        </form>
      )}


      {activeStep1 === 2 && (
        <div className='container flex justify-center mx-auto  '>
          <div className="container mx-auto">
            <form onSubmit={handleSubmit2} encType='multipart/form-data'>
              <h2 className='px-8 py-5 text-xl'>Place page Information</h2>
              <hr />
              <div className="container my-4">
                <div className="lg:w-1/2 md:w-1/2  rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
                  <div className="relative mb-4">
                    <label htmlFor="placeName" className="leading-7 text-sm ">Place Name :</label>
                    <input
                      type="text"
                      id="placeName"
                      name="placeName"
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="e.g.Goa" required
                      value={localStorage.getItem("placeName")}
                      onChange={handleInputChange2}
                      readOnly />
                  </div>

                  <div className="relative mb-4">
                    <label htmlFor="placesName" className="leading-7 text-sm ">Places Name :</label>
                    <input type="text" id="placesName" name="placesName" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="e.g. panaji + North Goa + South Goa"
                      required
                      value={localStorage.getItem("placesName")}
                      onChange={handleInputChange2} 
                      readOnly/>
                  </div>

                  <div className="relative mb-4">
                    <label htmlFor="duration" className="leading-7 text-sm ">Duration :</label>
                    <input type="text" id="duration" name="duration" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="e.g. 10 days / 9 nights"
                      required
                      value={localStorage.getItem("duration")}
                      onChange={handleInputChange2} 
                      readOnly/>
                  </div>


                  <div className="relative mb-4">
                    <label htmlFor="placeContent" className="leading-7 text-sm ">Place Content :</label>
                  </div>
                  <textarea name="placeContent" id="placeContent" cols="60" rows="10" required
                    value={placeDetails2.placeContent}
                    onChange={handleInputChange2}>
                  </textarea>

                  <div className="relative my-4">
                    <label htmlFor="adultCost" className="leading-7 text-sm ">Adult Cost :</label>
                    <input type="text" id="adultCost" name="adultCost" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Rs. 5000"
                      required
                      value={placeDetails2.adultCost}
                      onChange={handleInputChange2} />
                  </div>

                  <div className="relative mb-4">
                    <label htmlFor="childCost" className="leading-7 text-sm ">Child Cost :</label>
                    <input type="text" id="childCost" name="childCost" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Rs. 3000"
                      required
                      value={placeDetails2.childCost}
                      onChange={handleInputChange2}
                    />
                  </div>

                  <div className="relative mb-4">
                    <label htmlFor="seniorCost" className="leading-7 text-sm ">Senior Cost :</label>
                    <input type="text" id="seniorCost" name="seniorCost" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Rs. 2000"
                      required
                      value={placeDetails2.seniorCost}
                      onChange={handleInputChange2} />
                  </div>


                  {/* places details */}
                  {/* <div className="container my-4">
                    {placesFields.map((placesField, index) => (
                      <div key={index} className="rounded-lg py-3 flex flex-col w-full mt-10 md:mt-0">
                        <h2 className='py-3 text-lg font-medium'>{localStorage.getItem("places") ? localStorage.getItem("places").split(" + ")[index] : ""}</h2>
                        <div className="relative mb-4 flex">
                          <div className='flex flex-col'>
                            <textarea
                              id={`place-${index}`}
                              name="placesInfo"
                              className="bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 leading-8 transition-colors duration-200 ease-in-out resize-none"
                              rows={3}
                              cols={60}
                              value={placesField.placesInfo}
                              onChange={(e) => handleInputChange2(e, index)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div> */}



                  {/* days details */}
                  {/* Render dayFields */}
                  {/* <div className="container my-4 flex">
                    {dayFields.map((dayField, index) => (
                      <div key={index} className="rounded-lg py-3 flex flex-col w-full mt-10 md:mt-0">
                        <h2 className='py-3'>Day {index + 1}</h2>
                        <div className="relative mb-4 flex flex-col">
                          <textarea
                            id={`details-${index}`}
                            name="details"
                            className="bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 leading-8 transition-colors duration-200 ease-in-out resize-none"
                            rows={3}
                            cols={60}
                            value={dayField.details}
                            onChange={(e) => handleInputChange2(e, index)}
                          />
                        </div>
                      </div>
                    ))}
                  </div> */}

                  <div className="relative mb-4">
                    <label htmlFor="hotelName" className="leading-7 text-sm ">Hotel Name :</label>
                    <input type="text" id="hotelName" name="hotelName" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="e.g. Taj Hotel"
                      required
                      value={placeDetails2.hotelName}
                      onChange={handleInputChange2} />
                  </div>



                  <div className="relative mb-4">
                    <label htmlFor="area" className="leading-7 text-sm ">Area :</label>
                    <input type="text" id="area" name="area" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="e.g. C-224 Alkapuri, goa"
                      required
                      value={placeDetails2.area}
                      onChange={handleInputChange2} />
                  </div>






                </div>


              </div>
              <button className="text-white bg-indigo-400 mx-10 mb-3 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-500 rounded text-lg">Submit</button>
            </form>
          </div>
        </div>
      )}


    </div>
  );
};

export default AdminUpdateEvent;

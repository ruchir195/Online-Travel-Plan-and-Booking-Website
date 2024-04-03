import React, { useState, useEffect } from 'react';
import Place from './Place';
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { FaEdit } from 'react-icons/fa';


const Event = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]); // Initialize state with an empty array


  useEffect(() => {
    const fetchData = async () => {
      try {
        const host = "http://localhost:5000";
        const response = await fetch(`${host}/api/place/event`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },

        });
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data1 = await response.json();
        // console.log("Data fetched:", data1); // Log the fetched data to inspect its format

        if (!data1) {
          // console.log("token expire");
          toast.error("Your Token has expired... login again", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            rtl: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            localStorage.clear();
            navigate("/login");
          }, 7000);
        } else {
          // console.log("in data");
          setEvents(data1.eventData); // Once the data is fetched, set it to the state variable
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function to fetch data when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once, equivalent to componentDidMount

  console.log("Events:", events); // Log the events array just before the return statement



  // date picker
  const [startingCity, setStartingCity] = useState('Ahmedabad');
  const [destination, setDestination] = useState('Goa');
  const [departureDate, setDepartureDate] = useState(null);
  const [error, setError] = useState('');
  const [packages, setPackages] = useState([]);


  const handleStartingCityChange = (event) => {
    setStartingCity(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };


  const handleDateChange = (date) => {
    setDepartureDate(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      startingCity: startingCity,
      destination: destination,
      departureDate: departureDate
    };

    console.log("data.destination: ", destination);

    try {
      const response = await fetch('http://localhost:5000/api/place/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        setError("No package Found");
        return; // Exit early if response is not okay
      }

      const responseData = await response.json();
      console.log("response ", responseData);

      setPackages(responseData.startingCityPlace);
      console.log(packages); // Handle the response from the server
    } catch (error) {
      console.error('There was an error!', error); // Handle errors
    }
  };

  useEffect(() => {
    console.log('Updated packages:', packages);
  }, [packages]); // This effect runs whenever packages changes






  // Render the component
  return (
    <div>

      <section className=" body-font">
        <header class="text-gray-600 body-font">
          <form onSubmit={handleSubmit}>
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
              <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                <div className="relative mb-4 mr-5">
                  <label htmlFor="starting" className="leading-7 text-sm px-3 text-gray-600">Starting From:</label>
                  <select
                    id="starting"
                    name="starting"
                    className="w-full  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={startingCity}
                    onChange={handleStartingCityChange}
                  >
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Vadodara">Vadodara</option>
                    <option value="Surat">Surat</option>
                    <option value="Rajkot">Rajkot</option>
                    <option value="Jamnagar">Jamnagar</option>
                    <option value="Bhavnagar">Bhavnagar</option>
                  </select>
                </div>

                <div className="relative mb-4 mr-5">
                  <label htmlFor="destination" className="leading-7 px-3 text-sm text-gray-600">Going to:</label>
                  <select
                    id="destination"
                    name="destination"
                    className="w-full  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={destination}
                    onChange={handleDestinationChange}
                  >
                    <option value="Goa">Goa</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Kasol">Kasol</option>
                    <option value="Manali">Manali</option>
                    <option value="Kashmir">Kashmir</option>
                    <option value="kerla">kerla</option>
                  </select>
                </div>

                <div className="mb-4 mr-5">
                  <label htmlFor="departureDate" className="leading-7 px-3 text-sm text-gray-600">Selected Date:</label>
                  <DatePicker
                    selected={departureDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    className="form-input mt-1 block w-full px-3"
                    placeholderText="Select a date"
                    monthsShown={2} // Show two months at a time
                    minDate={new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)}
                  />
                </div>
              </nav>
              <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Search</button>
            </div>
          </form>
        </header>
        <h2 className="container text-2xl px-8 pt-12 pb-2  mx-auto">Events</h2>
        <div className='container px-8 mx-auto'><h2 className=" h-1 w-20  bg-indigo-400 rounded"></h2></div>
        <div className="container px-5 pt-6 pb-24 mx-auto">

          <div className="flex flex-wrap -m-4  mx-5">
            {error && <p>{error}</p>}
            {/* {Array.isArray(events) ? (
              events.map((event =>
                <div className="p-8 md:w-1/3">
                  <div className="h-full border-2 border-gray-300 border-opacity-60 rounded-lg overflow-hidden">
                    {event.image ? (
                      <img className=" h-60 w-full object-cover object-center" src={require(`../ImagesUpload/${event.imageName}`)} alt="blog" />
                    ) : (
                      <span>Image is not available</span>
                    )}
                    <div className="p-6">
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3"> {event.placeName}</h1>
                      <p className="leading-relaxed mb-1">{event.placesName}</p>
                      <div className="flex items-center flex-wrap ">
                        {event.duration}
                      </div>
                    </div>
                    <div className="mb-3 mx-3">
                      <button className="text-white bg-indigo-400 border-0 py-1 px-5 focus:outline-none hover:bg-indigo-500 rounded text-lg"><Link to={`/placeDetails/${event._id}`} >Booking</Link></button>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <span className=' justify-center mx-auto items-center align-middle'><Spinner /></span>
            )} */}

            {Array.isArray(packages) && packages.length > 0 ? (
              packages.map((pkg) => (
                <div className="p-8 md:w-1/3" key={pkg._id}>
                  <div className="h-full border-2 border-gray-300 border-opacity-60 rounded-lg overflow-hidden">
                    {pkg.image ? (
                      <img className=" h-60 w-full object-cover object-center" src={require(`../ImagesUpload/${pkg.imageName}`)} alt="blog" />
                    ) : (
                      <span>Image is not available</span>
                    )}

                    <div className="p-6">
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{pkg.placeName}</h1>
                      <p className="leading-relaxed mb-1">{pkg.placesName}</p>
                      <div className="flex items-center flex-wrap">
                        {pkg.duration}
                      </div>
                    </div>
                    <div className="mb-3 mx-3">
                      <button className="text-white bg-indigo-400 border-0 py-1 px-5 focus:outline-none hover:bg-indigo-500 rounded text-lg">
                        <Link to={`/placeDetails/${pkg._id}`}>Booking</Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              Array.isArray(events) ? (
                events.map((event) => (
                  <div className="p-8 md:w-1/3">
                    <div className="h-full border-2 border-gray-300 border-opacity-60 rounded-lg overflow-hidden">
                      {event.image ? (
                        <img className=" h-60 w-full object-cover object-center" src={require(`../ImagesUpload/${event.imageName}`)} alt="blog" />
                      ) : (
                        <span>Image is not available</span>
                      )}
                      <div className="p-6">
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3"> {event.placeName}</h1>
                        <p className="leading-relaxed mb-1">{event.placesName}</p>
                        <div className="flex items-center flex-wrap ">
                          {event.duration}
                        </div>
                      </div>
                      <div className="mb-3 mx-3">
                        <button className="text-white bg-indigo-400 border-0 py-1 px-5 focus:outline-none hover:bg-indigo-500 rounded text-lg">
                          <Link to={`/placeDetails/${event._id}`} >Booking</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <span className=' justify-center mx-auto items-center align-middle'><Spinner /></span>
              )
            )}










          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </section>
    </div >




  );
};

export default Event;

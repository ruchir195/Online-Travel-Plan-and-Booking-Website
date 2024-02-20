import React, { useState, useEffect } from 'react';
import Place from './Place';
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';


const Event = () => {
  const [events, setEvents] = useState([]); // Initialize state with an empty array


  useEffect(() => {
    const fetchData = async () => {
      try {
        const host = "http://localhost:5000";
        const response = await fetch(`${host}/api/place/event`, {
          method: "GET",

        });
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data1 = await response.json();
        // console.log("Data fetched:", data); // Log the fetched data to inspect its format
        setEvents(data1); // Once the data is fetched, set it to the state variable
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function to fetch data when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once, equivalent to componentDidMount

  console.log("Events:", events); // Log the events array just before the return statement



  // Render the component
  return (
    <div>

      <section className=" body-font">
        <h2 className="container text-2xl px-8 pt-12 pb-2  mx-auto">Events</h2>
        <div className='container px-8 mx-auto'><h2 className=" h-1 w-20  bg-yellow-400 rounded"></h2></div>
        <div className="container px-5 pt-6 pb-24 mx-auto">

          <div className="flex flex-wrap -m-4">
            {Array.isArray(events.eventData) ? (
              events.eventData.map((event =>
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
                    <button className="text-white bg-yellow-400 border-0 py-1 px-5 focus:outline-none hover:bg-yellow-500 rounded text-lg"><Link to={`/placeDetails/${event.placeName}`} >Booking</Link></button>
                    </div>
                  </div>
                  
                </div>
              ))
            ) : (
              <span className=' justify-center mx-auto items-center align-middle'><Spinner/></span>
            )}
          </div>
        </div>
      </section>
    </div >




  );
};

export default Event;

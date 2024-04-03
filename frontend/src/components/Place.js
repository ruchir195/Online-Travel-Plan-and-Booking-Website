import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '../components/placecss.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { FaEdit } from 'react-icons/fa';
import Spinner from './Spinner';


const Place = () => {

  const navigate = useNavigate();
  const [places, setplaces] = useState([]); // Initialize state with an empty array
  const [activeStep, setActiveStep] = useState(1);
  // const { placeName } = useParams();
  const {id} = useParams();

  console.log("placeId",id);

  const [modal1Open, setModal1Open] = useState(false);
  const [activeStep1, setActiveStep1] = useState(1);

  const openModal = () => {
    // localStorage.setItem("propertyFor", propertyFor);
    setModal1Open(true);
  };

  const onlycloseModal1 = () => {
    setActiveStep1(1)
    setModal1Open(false);
  };

  const [startDate, setStartDate] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);

  // Function to disable certain dates dynamically
  const disableDates = (dates) => {
    setDisabledDates(dates);
  };

  const handleStartDateChange = date => {
    setStartDate(date);
  };

  // Calculate the date before today
  const yesterday = addDays(new Date(), 5);

  const maxChildren = 4;
  const maxAdult = 4;
  const maxSenior = 4;


  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [seniors, setSeniors] = useState(0);
  // const [simpleRooms, setSimpleRooms] = useState(0);
  // const [bestRooms, setBestRooms] = useState(0);

  const handleIncrement = (type) => {
    switch (type) {
      case 'adults':
        setAdults(adults + 1);
        break;
      case 'children':
        setChildren(children + 1);
        break;
      case 'seniors':
        setSeniors(seniors + 1);
        break;
      default:
        break;
    }
  };

  const handleDecrement = (type) => {
    switch (type) {
      case 'adults':
        if (adults > 0) setAdults(adults - 1);
        break;
      case 'children':
        if (children > 0) setChildren(children - 1);
        break;
      case 'seniors':
        if (seniors > 0) setSeniors(seniors - 1);
        break;
      default:
        break;
    }
  };





  const calculateTotalCost = () => {
    const adultCost = places.placeData.adultCost; // Cost per adult
    const childCost = places.placeData.childCost;  // Cost per child
    const seniorCost = places.placeData.seniorCost; // Cost per senior



    const totalCost = adults * adultCost + children * childCost + seniors * seniorCost
    localStorage.setItem("totalCost", totalCost);
    localStorage.setItem("adultCost", adultCost);
    localStorage.setItem("childCost", childCost);
    localStorage.setItem("seniorCost", seniorCost);

    return totalCost;
  };




  const [isChecked, setIsChecked] = useState(false); // State to track checkbox checked status

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked); // Update checkbox state when it's changed
  };

  const handleNextButtonClick = () => {
    // localStorage.setItem("placeName", places.placeName)
    localStorage.setItem("startingDate", startDate.toDateString())
    localStorage.setItem("EndingDate", calculateEndDate(startDate, parseInt(places.placeData.duration.charAt(0))).toDateString())
    localStorage.setItem("Duration", places.placeData.duration)
    localStorage.setItem("adults", adults);
    localStorage.setItem("children", children);
    localStorage.setItem("senior", seniors);
    navigate("/customerDetails")
  };


  const [coordinates, setCoordinates] = useState(null);
  const [mapUrl, setMapUrl] = useState('');


  useEffect(() => {
    const placeName = localStorage.getItem("placeName");
    // console.log(placeName) // Replace 'Goa' with your desired place name

    getCoordinates(placeName);
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  useEffect(() => {
    if (coordinates) {
      const latitude = coordinates.lat;
      const longitude = coordinates.lon;
      const mapSrc = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d201441.96708587015!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1672041324000!5m2!1sen!2sin`;
      setMapUrl(mapSrc);
    }
  }, [coordinates]);

  function getCoordinates(placeName) {
    const apiKey = 'pk.2befa8c7f3a74220784051760467576f';
    const apiUrl = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(placeName)}&format=json`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const latitude = data[0].lat;
          const longitude = data[0].lon;
          setCoordinates({ lat: latitude, lon: longitude });
        } else {
          setCoordinates(null);
        }
      })
      .catch(error => console.error('Error fetching geocoding data:', error));
  }




  useEffect(() => {
    const fetchData = async () => {
      try {
        const host = "http://localhost:5000";
        const response = await fetch(`${host}/api/place/placeDetails/${id}`, {
          method: "GET",

        });
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data1 = await response.json();
        console.log("Data fetched:", data1); // Log the fetched data to inspect its format
        setplaces(data1); // Once the data is fetched, set it to the state variable
        localStorage.setItem("placeName", data1.placeData.placeName);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function to fetch data when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once, equivalent to componentDidMount

  console.log("Places:", places); // Log the events array just before the return statement
  // console.log("PlacesDetails:", places.placeData.placesDetails[0]);
  let index = 0;
  function myFunction(index) {
    var dots = document.getElementById("dots" + index);
    var moreText = document.getElementById("more" + index);
    var btnText = document.getElementById("myBtn" + index);

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";

    }
  }

  


  function calculateEndDate(startDate, durationInDays) {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationInDays);
    return endDate;
  }



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <div className="container-lg">
        {places.placeData ? (
          <div className="img_width">
            <img className=" w-full block" src={require(`../ImagesUpload/${places.placeData.img2Name}`)} alt="blog" style={{ height: "600px" }} />
            <div className="container mb-5 py-20 mx-auto">
              <div className="placeImgCont">
                <div className="mx-5 mt-5 mb-5">
                  <div id="carouselExampleFade" className="carousel slide carousel-fade placeCarouse"
                    data-bs-ride="carousel">
                    <Slider {...settings}>
                      <div className=" h-full">
                        <img
                          src={require(`../ImagesUpload/${places.placeData.img3Name}`)}
                          alt="Slide 1"
                          className="w-full object-cover object-center"
                          style={{ height: "450px" }}
                        />
                      </div>
                      <div className="flex items-center justify-center h-full">
                        <img
                          src={require(`../ImagesUpload/${places.placeData.img4Name}`)}
                          alt="Slide 2"
                          className="w-full object-cover object-centerl"
                          style={{ height: "450px" }}
                        />
                      </div>
                      <div className="w-full">
                        <img
                          src={require(`../ImagesUpload/${places.placeData.img5Name}`)}
                          alt="Slide 3"
                          className="w-full object-cover object-center"
                          style={{ height: "450px" }}
                        />
                      </div>
                    </Slider>
                  </div>
                </div>

                <div className="my-5 py-5 px-8 mx-16 w-full">
                  <div className="card-body">
                    <h5 className="card-title text-2xl"><b>

                      {places.placeName}

                    </b></h5>
                    {/* Assuming places.placeData is an array */}
                    <p className='py-3'>
                      {places.placeData.placeContent.slice(0, 600)}
                      <span className="dots" id={`dots${index}`}>...</span>
                      <span className="more" id={`more${index}`}>
                        {places.placeData.placeContent.slice(600, places.placeData.placeContent.length)}
                      </span>
                      <button onClick={() => myFunction(index)} className="myBtn text-indigo-600 hover:text-oreange-700" id={`myBtn${index}`}>
                        Read more
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-gray-600 body-font ">
                <div className='container px-5 py-24 flex'>
                  <div className='w-3/5'>
                    <div className="flex flex-col">
                      <div className="flex  flex-wrap pb-10">
                        <Link className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none ${activeStep === 1 ? "bg-gray-100 border-indigo-500 text-indigo-500" : ""}  tracking-wider rounded-t`} onClick={() => setActiveStep(1)}>
                          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24" >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          </svg>Overview
                        </Link>
                        <Link className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none ${activeStep === 2 ? "bg-gray-100 border-indigo-500 text-indigo-500" : ""} border-gray-200 hover:text-gray-900 tracking-wider rounded-t`} onClick={() => setActiveStep(2)}>
                          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                          </svg>Itinerary
                        </Link>
                        <Link className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none ${activeStep === 3 ? "bg-gray-100 border-indigo-500 text-indigo-500" : ""} border-gray-200 hover:text-gray-900 tracking-wider rounded-t`} onClick={() => setActiveStep(3)}>
                          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24" >
                            <circle cx="12" cy="5" r="3"></circle>
                            <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                          </svg>Cost
                        </Link>
                        <Link className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none ${activeStep === 4 ? "bg-gray-100 border-indigo-500 text-indigo-500" : ""} border-gray-200 hover:text-gray-900 tracking-wider rounded-t`} onClick={() => setActiveStep(4)}>
                          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>Map
                        </Link>
                      </div>
                      {/* <img className="xl:w-1/4 lg:w-1/3 md:w-1/2  block mb-10 object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" /> */}
                      {activeStep && (
                        <div className="flex flex-col w-full px-10">
                          <h1 className="text-xl font-medium title-font mb-4 text-gray-900">
                            {activeStep === 1 && 'Overview'}
                            {activeStep === 2 && 'Itinerary'}
                            {activeStep === 3 && 'Cost'}
                            {activeStep === 4 && 'Map'}
                          </h1>
                          <p className="leading-relaxed text-base pb-12">
                            {activeStep === 1 &&
                              <section className="text-gray-600 body-font">
                                <div className="py-10">
                                  {places.placeData && places.placeData.placesDetails ? (
                                    places.placeData.placesDetails.map((detail, detailIndex) => (
                                      <div className="flex items-center lg:w-3/4  border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                                        {/* <div className="sm:w-36 sm:h-32 h-20 w-32 sm:mr-10 inline-flex items-center justify-center  bg-indigo-100 text-indigo-500 flex-shrink-0">
                                          <img src="../images/g5.jpg" alt="" srcSet="" />
                                        </div> */}
                                        <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                                          {/* <h2 className="text-gray-900 text-lg title-font font-medium mb-2">{ localStorage.getItem("places") ? localStorage.getItem("places").split(" + ")[detailIndex] : "" }</h2> */}

                                          <h2 className="text-gray-900 text-lg title-font font-medium mb-2">{places.placeData.placesName.split(" + ")[detailIndex]}</h2>
                                          <p className="leading-relaxed text-base">{detail.placesInfo}</p>
                                          <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                              <path d="M5 12h14M12 5l7 7-7 7"></path>
                                            </svg>
                                          </a>
                                        </div>
                                      </div>
                                    ))
                                  )
                                    : (
                                      <span className=' justify-center mx-auto items-center align-middle'><Spinner /></span>
                                    )}


                                </div>
                              </section>}
                            {activeStep === 2 &&
                              <section className="text-gray-600 body-font">
                                <div className="container px-5 py-7 mx-auto flex flex-wrap">
                                  <div className="flex flex-wrap w-full">
                                    <div className="md:pr-10 md:py-6">
                                      {places.placeData && places.placeData.dayDetails ? (
                                        places.placeData.dayDetails.map((detail, detailIndex) => (
                                          <div className="flex relative pb-12">
                                            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                              <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                            </div>
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                              </svg>
                                            </div>
                                            <div className="flex-grow pl-4">
                                              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Day {detailIndex + 1}</h2>
                                              <p className="leading-relaxed">{detail.details}</p>
                                            </div>
                                          </div>
                                        ))
                                      )
                                        : (
                                          <span className=' justify-center mx-auto items-center align-middle'><Spinner /></span>
                                        )}




                                    
                                    </div>
                                  </div>
                                </div>
                              </section>}
                            {activeStep === 3 &&
                              <section className="text-gray-600 body-font">
                                <div className="py-2">
                                  <span className='py-7 text-xl font-semibold'>Package Include Item</span>
                                  <div className="flex flex-wrap pt-2  sm:mb-2 -mx-2">
                                    <div className="p-2 sm:w-1/2 w-full">
                                      <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                          <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">Accommodation</span>
                                      </div>
                                    </div>
                                    <div className="p-2 sm:w-1/2 w-full">
                                      <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                          <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">Meals</span>
                                      </div>
                                    </div>
                                    <div className="p-2 sm:w-1/2 w-full">
                                      <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                          <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">Transportation</span>
                                      </div>
                                    </div>
                                    <div className="p-2 sm:w-1/2 w-full">
                                      <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                          <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">Sightseeing</span>
                                      </div>
                                    </div>
                                    <div className="p-2 sm:w-1/2 w-full">
                                      <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                          <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">Activities</span>
                                      </div>
                                    </div>
                                    <div className="p-2 sm:w-1/2 w-full">
                                      <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                          <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">Tour Guide</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="py-5">
                                  <span className='py-7 text-xl font-semibold'>Package Exclude Item</span>
                                  <div className="flex flex-wrap pt-2  sm:mb-2 -mx-2">
                                    <div className="p-2 sm:w-1/2 w-full">
                                      <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                          <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">Personal Expenses</span>
                                      </div>
                                    </div>
                                    <div className="p-2 sm:w-1/2 w-full">
                                      <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                          <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">Optional Activities</span>
                                      </div>
                                    </div>
                                    <div className="p-2 sm:w-1/2 w-full">
                                      <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                          <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">Travel Insurance</span>
                                      </div>
                                    </div>
                                    <div className="p-2 sm:w-1/2 w-full">
                                      <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                          <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">Event Tickets</span>
                                      </div>
                                    </div>
                                    <div className="p-2 sm:w-1/2 w-full">
                                      <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                          <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                        <span className="title-font font-medium">Medical Expenses</span>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              </section>}
                            {activeStep === 4 &&
                              <div className="putmap mb-5 ">
                               

                                <div>
                                  {mapUrl && <iframe src={mapUrl} width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" />}
                                </div>


                              </div>}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className=' w-3/4 py-20'>
                      
                      <div >
                        <h1 className=' font-bold text-2xl py-1'>Hotel Details </h1>
                        <div>
                        <h1 className=' font-semibold text-xl py-3'>Hotel Name: {places.placeData.hotelName}</h1>
                        
                      </div>
                        <p className=''>The deluxe room offers a comfortable stay with a king-sized bed, ideal for up to 2 adults. Guests can enjoy a scenic city view from their room. The room comes equipped with a private bathroom featuring a shower, air conditioning, a flat-screen TV with cable channels, high-speed Wi-Fi, a work desk, a mini fridge, a coffee/tea maker, a hairdryer, and an iron with an ironing board. Additional services include daily housekeeping, 24-hour room service, and laundry service. For safety, the room is equipped with electronic door locks, smoke detectors, fire sprinklers, emergency lighting, and an in-room safe for valuables. Accessibility features such as wheelchair-accessible rooms and elevators are available. Non-smoking rooms and pet-friendly rooms are also available upon request. Check-in time is at 3:00 PM, and check-out time is at 12:00 PM. Parking is available on-site, with additional charges may apply.</p>
                      </div>
                    </div>
                  </div>


                  <div className='container relative' style={{ width: "25rem" }}>
                    <div className='sticky top-16 left-0 ' >
                      <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">Group Discount Available</span>
                      <div className="card my-14 px-7 py-5 " >
                        <div className="card-body py-3">

                          <div className='flex py-5 '>
                            <p className='pr-7'><p>From</p><i className="fa-solid fa-indian-rupee-sign text-xl"></i>&nbsp;
                              <strong className=" text-xl">
                                {places.placeData.adultCost}

                              </strong>
                              /Adult
                            </p>
                            <p className='px-8'><p>From</p><i className="fa-solid fa-indian-rupee-sign  text-xl"></i>&nbsp;
                              <strong className=" text-xl">
                                {places.placeData.childCost}

                              </strong>
                              /Child
                            </p>


                          </div>
                          {/* <div className=' pb-7'>
                            <p className=''><p>From</p><i className="fa-solid fa-indian-rupee-sign  text-xl"></i>&nbsp;
                              <strong className=" text-xl">
                                {places.placeData.seniorCost}

                              </strong>
                              /Senior Citizon
                            </p>
                          </div> */}


                          <button className="btn my-3 mx-auto btn-primary btn_book bg-indigo-400 hover:bg-indigo-500 text-white rounded px-24 py-3 w-auto " onClick={() => { openModal(); }}>Check Availability</button>

                          <div className='pt-5'>Need help with booking? <Link className=' text-indigo-500 hover:text-indigo-600'>Send us A Message</Link> </div>


                          {modal1Open && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                              <div className="bg-white  rounded-lg w-2/3 h-3/4">
                                <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                                  <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                                    Booking Package
                                  </span>
                                  <button
                                    onClick={onlycloseModal1}
                                    className="text-white font-bold text-xl px-3"
                                  >
                                    ✕
                                  </button>

                                </div>
                                <div className="text-gray-600 body-font">
                                  <div className='container px-5 flex py-3'>
                                    <div className="px-5 py-5 mx-auto  flex flex-wrap ">
                                      <div>
                                        <div className="flex mx-auto flex-wrap mb-5">
                                          <div className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium px-2  inline-flex items-center leading-none ${activeStep1 === 1 ? "bg-gray-100 border-indigo-500 text-indigo-500" : ""}  tracking-wider rounded-t`} >
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24" >
                                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                            </svg>Date And Time
                                          </div>
                                          <div className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium px-2  inline-flex items-center leading-none ${activeStep1 === 2 ? "bg-gray-100 border-indigo-500 text-indigo-500" : ""}  tracking-wider rounded-t`} >
                                            <svg fill="none" stroke="currentColor" className="w-5 h-5 mr-3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                            </svg>Package Type
                                          </div>
                                          <div className={`sm:px-6 py-3 w-1/2 sm:w-auto  justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none ${activeStep1 === 3 ? "bg-gray-100 border-indigo-500 text-indigo-500" : ""}  tracking-wider rounded-t`} >
                                            <svg fill="none" stroke="currentColor" className="w-5 h-5 mr-3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                              <circle cx="12" cy="5" r="3"></circle>
                                              <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                                            </svg>Hotel Service
                                          </div>

                                        </div>
                                      </div>



                                      {activeStep1 && (
                                        <div className="flex flex-col w-full px-10">
                                          <h1 className="text-xl font-medium title-font mb-4 text-gray-900">
                                            {activeStep1 === 1 && ''}
                                            {activeStep1 === 2 &&
                                              <div className='flex flex-row'>
                                                <div className='flex-grow px-3'>Travellers</div>
                                                {/* <div className=' flex-shrink-0 px-10'>Quanity</div> */}
                                              </div>}

                                            {activeStep1 === 3 && 'Hotel Service'}

                                          </h1>
                                          <p className="leading-relaxed text-base  pb-12">
                                            {activeStep1 === 1 &&
                                              <div>
                                                <div className='mx-auto justify-center ' style={{ display: 'flex', alignItems: 'center' }}>
                                                  <DatePicker
                                                    selected={startDate}
                                                    onChange={handleStartDateChange}
                                                    minDate={new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)} // Set minimum selectable date to today
                                                    excludeDates={[yesterday, ...disabledDates]} // Hide the day before today and any other disabled dates
                                                    inline
                                                  />
                                                  <FaEdit style={{ marginLeft: '10px', cursor: 'pointer' }} />
                                                </div>

                                                <div className='flex py-6 '>
                                                  <div className="p-2 w-full">
                                                    <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={onlycloseModal1}>Back</button>
                                                  </div>
                                                  <div className="p-2 w-full">
                                                    <button disabled={!startDate} className=" flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={() => setActiveStep1(2)}>Next</button>
                                                  </div>
                                                </div>
                                              </div>}
                                            {activeStep1 === 2 &&
                                              <div className="text-gray-600 body-font">
                                                <div className=" px-5 py-10">
                                                  <div className=" flex flex-col sm:flex-row  items-start">
                                                    <h1 className="py-3 text-xl font-medium title-font  text-gray-500">Adult</h1>
                                                    <div className=" flex-grow flex px-2  mb-4 items-center">
                                                      {/* <div className="relative">
                                                        <select className=" rounded border appearance-none border-gray-300 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-2 pr-10 mt-2">
                                                          
                                                            <option>4 Person</option>
                                                            <option>7 person</option>
                                                            <option>10 person</option>
                                                          

                                                        </select>
                                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                                          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                            <path d="M6 9l6 6 6-6"></path>
                                                          </svg>
                                                        </span>
                                                      </div> */}
                                                    </div>
                                                    {/* <span className="text-gray-500">Childrens</span> */}
                                                    <span className='py-3 px-2 font-medium text-xl'>{places.placeData.adultCost}/person</span>
                                                    <div className="flex-shrink-0  border-2 py-2 text-indigo-500  focus:outline-none px-1   rounded border-indigo-500 text-xl mt-10 sm:mt-0">
                                                      <button onClick={() => handleDecrement('adults')} className={`px-5 text-indigo-500 text-2xl ${adults === 0 ? 'cursor-not-allowed opacity-50' : ''}`}>⎯</button>
                                                      {adults}
                                                      <button className={`px-5 text-indigo-500 text-2xl ${adults === maxAdult ? 'cursor-not-allowed opacity-50' : ' '}`} onClick={() => handleIncrement('adults')} >＋</button>
                                                    </div>
                                                  </div>

                                                  <div className=" flex flex-col sm:flex-row  items-start py-2">
                                                    <h1 className="flex-grow py-3 text-xl font-medium title-font text-gray-500">Child</h1>
                                                    <span className='py-3 px-2 font-medium text-xl'>{places.placeData.childCost}/person</span>
                                                    <div className="flex-shrink-0  border-2 py-2 text-indigo-500  focus:outline-none  rounded border-indigo-500 text-xl mt-10 sm:mt-0">
                                                      <button onClick={() => handleDecrement('children')} className={`px-5 mr-2 text-indigo-500 text-2xl font-bold ${children === 0 ? 'cursor-not-allowed opacity-50' : ''}`}>⎯</button>
                                                      {children}
                                                      <button onClick={() => handleIncrement('children')} className={`px-5 text-indigo-500 text-2xl ${children === maxChildren ? 'cursor-not-allowed opacity-50' : ''}`}>＋</button>
                                                    </div>
                                                  </div>

                                                  {/* <div className=" flex flex-col sm:flex-row  items-start">
                                                    <h1 className="flex-grow py-3  text-xl font-medium title-font text-gray-500">Senior Citizon</h1>
                                                    <span className='py-3 px-2 font-medium text-xl'>{places.placeData.seniorCost}/person</span>
                                                    <div className="flex-shrink-0  border-2 py-2 text-indigo-500  focus:outline-none  rounded border-indigo-500 text-xl mt-10 sm:mt-0">
                                                      <button onClick={() => handleDecrement('seniors')} className={`px-5 mr-2 text-indigo-500 text-2xl font-bold ${seniors === 0 ? 'cursor-not-allowed opacity-50' : ''}`}>⎯</button>
                                                      {seniors}
                                                      <button onClick={() => handleIncrement('seniors')} className={`px-5 text-indigo-500 text-2xl ${seniors === maxSenior ? 'cursor-not-allowed opacity-50' : ''}`}>＋</button>
                                                    </div>
                                                  </div> */}
                                                </div>
                                                <div className='flex py-8 '>
                                                  <div className="p-2 w-full">
                                                    <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={() => setActiveStep1(1)}>Back</button>
                                                  </div>
                                                  <div className="p-2 w-full">
                                                    <button disabled={adults + children + seniors === 0} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={() => setActiveStep1(3)}>Next</button>
                                                  </div>
                                                </div>
                                              </div>}
                                            {activeStep1 === 3 &&
                                              <div>
                                                {/* <div className=' flex px-5 py-5'>
                                                  <div className='py-3 px-5'>
                                                    <div className='px-1 pb-10' >Simple Room <span className=' cursor-pointer bg-gray-300 px-1'>?</span></div>
                                                    <div className="border-2 py-2 text-indigo-500  focus:outline-none   rounded border-indigo-500 text-xl mt-10 sm:mt-0">
                                                      <button onClick={() => handleDecrement1('simpleRooms')} className='px-5 mr-2 text-indigo-500 text-2xl font-bold'>⎯</button>
                                                      {simpleRooms}
                                                      <button onClick={() => handleIncrement1('simpleRooms')} className='px-5 text-indigo-500 text-2xl'>＋</button>
                                                    </div>
                                                  </div>

                                                  <div className='py-3 px-5'>
                                                    <div className='px-5 w-36 pb-4'>Best Room for 4 person <span className=' cursor-pointer bg-gray-300 px-1'>?</span></div>
                                                    <div className="border-2 py-2 text-indigo-500  focus:outline-none   rounded border-indigo-500 text-xl mt-10 sm:mt-0">
                                                      <button onClick={() => handleDecrement1('bestRooms')} className='px-5 mr-2 text-indigo-500 text-2xl font-bold'>⎯</button>
                                                      {bestRooms}
                                                      <button onClick={() => handleIncrement1('bestRooms')} className='px-5 text-indigo-500 text-2xl'>＋</button>
                                                    </div>
                                                  </div>


                                                </div> */}

                                                <section className="text-gray-600 body-font">
                                                  <div className="container mx-auto flex px-5 py-10 items-center justify-cente overflow-y-auto h-56 flex-col">
                                                    <img className="lg:w-2/6 md:w-3/6 w-5/6  mb-5 object-cover object-center rounded" alt="hero" src="../images/Picture3.png" />
                                                    <div className="text-center lg:w-2/3 w-full">
                                                      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{places.placeData.hotelName}</h1>
                                                      <p className="mb-8 leading-relaxed">The deluxe room offers a comfortable stay with a king-sized bed, ideal for up to 2 adults. Guests can enjoy a scenic city view from their room. The room comes equipped with a private bathroom featuring a shower, air conditioning, a flat-screen TV with cable channels, high-speed Wi-Fi, a work desk, a mini fridge, a coffee/tea maker, a hairdryer, and an iron with an ironing board. Additional services include daily housekeeping, 24-hour room service, and laundry service. For safety, the room is equipped with electronic door locks, smoke detectors, fire sprinklers, emergency lighting, and an in-room safe for valuables. Accessibility features such as wheelchair-accessible rooms and elevators are available. Non-smoking rooms and pet-friendly rooms are also available upon request. Check-in time is at 3:00 PM, and check-out time is at 12:00 PM. Parking is available on-site, with additional charges may apply.</p>
                                                      <div className="flex justify-center">
                                                        <label className="inline-flex items-center">
                                                          <input
                                                            type="checkbox"
                                                            className="form-checkbox text-indigo-600 h-5 w-5 mx-3"
                                                            onChange={handleCheckboxChange} // Call handleCheckboxChange function when checkbox state changes
                                                            required
                                                          />
                                                         <label for="agreeCheckbox">I agree to above hotel services</label>
                                                        </label>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </section>

                                                <div className='flex py-12 '>
                                                  <div className="p-2 w-full">
                                                    <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={() => setActiveStep1(2)}>Back</button>
                                                  </div>
                                                  <div className="p-2 w-full">
                                                    <button
                                                      disabled={!isChecked} // Disable button if checkbox is not checked
                                                      className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                                      onClick={handleNextButtonClick} // Call handleNextButtonClick function when Next button is clicked
                                                    >
                                                      Proceed to Checkout
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>


                                            }

                                          </p>
                                        </div>
                                      )}

                                    </div>

                                    {activeStep1 && (
                                      <div className='mx-auto'>
                                        <div className=''>
                                          {activeStep1 === 1 && <div>
                                            <div className='py-3'>
                                              <div className=''>Booking Summary</div>
                                              <div className='py-2 font-bold text-xl'>{places.placeName} Trip</div>
                                            </div>

                                            <div className='py-3'>
                                              <div className='border border-indigo-500 w-72'></div>
                                              <div className='border border-indigo-500 mt-10'></div>
                                            </div>

                                            <div className=' right-32'>Toal: Rs. </div>
                                          </div>}



                                          {activeStep1 === 2 &&
                                            <div className=' py-5'>
                                              <div className=''>
                                                <span className='py-1'>Booking Summary</span>
                                                <div className='py-1 font-bold text-xl'>{places.placeName} Trip</div>
                                                <div className='py-2'>{startDate && (
                                                  <div>
                                                    <p>Starting Date: {startDate.toDateString()}</p>
                                                    <p>Ending Date: {calculateEndDate(startDate, parseInt(places.placeData.duration.charAt(0))).toDateString()}</p>
                                                    <p>Duration : {places.placeData.duration}</p>

                                                  </div>
                                                )}</div>
                                              </div>
                                              <div className='py-3'>
                                                <div className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start  title-font font-medium  inline-flex items-center leading-none ${activeStep1 === 2 ? " bg-indigo-500 border-indigo-500 text-white" : ""}  tracking-wider rounded-t`}>Package Pricing</div>
                                                <div className='border border-indigo-500 w-72'></div>
                                                <div className='py-5'>Travelers</div>

                                                {adults !== 0 &&
                                                  <div className='flex px-1 pb-3'>
                                                    <div className=' flex-grow'>{adults} Adult({places.placeData.adultCost}/person) </div>
                                                    <div className=' flex-shrink-0'>{adults * places.placeData.adultCost}</div>
                                                  </div>}

                                                {children !== 0 &&
                                                  <div className='flex px-1 pb-3'>
                                                    <div className='flex-grow'>{children} Child({places.placeData.childCost}/person) </div>
                                                    <div className=' flex-shrink-0'>{children * places.placeData.childCost}</div>
                                                  </div>}

                                                {seniors !== 0 &&
                                                  <div className='flex px-1 pb-5'>
                                                    <div className='flex-grow'>{seniors} Senior Citizon({places.placeData.seniorCost}/person) </div>
                                                    <div className='flex-shrink-0'>{seniors * places.placeData.seniorCost}</div>
                                                  </div>
                                                }



                                                <div className='border border-indigo-500 mt-'></div>
                                              </div>
                                              <div className=' float-right font-semibold text-lg'>Toal Cost: Rs.{calculateTotalCost()}</div>
                                            </div>}


                                          {activeStep1 === 3 &&
                                            <div className=' py-5'>
                                              <div className=''>
                                                <span className='py-1'>Booking Summary</span>
                                                <div className='py-1 font-bold text-xl'>{places.placeName} Trip</div>
                                                <div className='py-2'>{startDate && (
                                                  <div>
                                                    <p>Starting Date: {startDate.toDateString()}</p>
                                                    <p>Ending Date: {calculateEndDate(startDate, parseInt(places.placeData.duration.charAt(0))).toDateString()}</p>
                                                    <p>Duration : {places.placeData.duration}</p>

                                                  </div>
                                                )}
                                                </div>
                                              </div>
                                              <div className='py-3'>
                                                <div className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start  title-font font-medium  inline-flex items-center leading-none ${activeStep1 === 3 ? " bg-indigo-500 border-indigo-500 text-white" : ""}  tracking-wider rounded-t`}>Package Pricing</div>
                                                <div className='border border-indigo-500 w-72'></div>
                                                <div className='py-5'>Travelers</div>
                                                {adults !== 0 &&
                                                  <div className='flex px-1 pb-3'>
                                                    <div className=' flex-grow'>{adults} Adult({places.placeData.adultCost}/person) </div>
                                                    <div className=' flex-shrink-0'>{adults * places.placeData.adultCost}</div>
                                                  </div>}

                                                {children !== 0 &&
                                                  <div className='flex px-1 pb-3'>
                                                    <div className='flex-grow'>{children} Child({places.placeData.childCost}/person) </div>
                                                    <div className=' flex-shrink-0'>{children * places.placeData.childCost}</div>
                                                  </div>}

                                                {seniors !== 0 &&
                                                  <div className='flex px-1 pb-5'>
                                                    <div className='flex-grow'>{seniors} Senior Citizon({places.placeData.seniorCost}/person) </div>
                                                    <div className='flex-shrink-0'>{seniors * places.placeData.seniorCost}</div>
                                                  </div>
                                                }


                                                <div className='border border-indigo-500 mt-'></div>
                                              </div>
                                              <div className=' float-right font-semibold text-lg'>Toal Cost: Rs.{calculateTotalCost()}</div>
                                            </div>}
                                        </div>

                                      </div>
                                    )}
                                  </div>

                                </div>
                              </div>
                            </div>
                          )}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div>
                <section className="text-gray-600 body-font">
                  <div className="container px-5 py-10 mx-auto">
                    <div className="text-center mb-20">
                      <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Place Review</h1>
                      {/* <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug.</p> */}
                      <div className="flex mt-6 justify-center">
                        <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                      </div>
                    </div>
                    <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <div className="flex-grow">
                          <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Ruchir parmar</h2>
                          <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
                          
                        </div>
                      </div>
                      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <div className="flex-grow">
                          <h2 className="text-gray-900 text-lg title-font font-medium mb-3">The Catalyzer</h2>
                          <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
                          
                        </div>
                      </div>
                      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <div className="flex-grow">
                          <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Neptune</h2>
                          <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug VHS try-hard.</p>
                          
                        </div>
                      </div>
                    </div>
                    <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add Review</button>
                  </div>
                </section>
              </div>

            </div>
          </div>
        ) : (
          <span className=' justify-center mx-auto items-center align-middle'><Spinner /></span>
        )}
      </div>
    </div>
  )
}

export default Place
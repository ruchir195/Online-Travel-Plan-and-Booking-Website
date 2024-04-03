import { Link, json } from 'react-router-dom'
import AdminEventPageForm from './AdminEventPageForm'
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import AdminShowUser from './AdminShowUser';
import AdminShowEvent from './AdminShowEvent';
import AdminUpdateEvent from './AdminUpdateEvent';
import AdminShowComment from './AdminShowComment';
import AdminTravelerUserDetails from './AdminTravelerUserDetails';

const Admin = () => {

    const host = "http://localhost:5000";
    const [creditial, setCreditial] = useState({ placeName: "", departureCity: "", placesName: "", duration: "", image: "" });
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const clickHandler = async (e) => {
        const formData = new FormData();
        formData.append('placeName', creditial.placeName);
        formData.append('departureCity', creditial.departureCity);
        formData.append('placesName', creditial.placesName);
        formData.append('duration', creditial.duration);
        formData.append('image', creditial.image);

        // setActiveStep1(2)

        // Api call
        const response = await fetch(`${host}/api/place/event`, {
            method: "POST",
            body: formData,
        });
        const json = await response.json();

        setActiveStep(2)
        setActiveStep1(2)
        // console.log(json.eventData.placesName );
        const tocken = localStorage.getItem('tocken');
        localStorage.setItem("placeName", json.eventData.placeName)
        localStorage.setItem("departureCity", json.eventData.departureCity)
        localStorage.setItem("places", json.eventData.placesName)
        localStorage.setItem("duration", json.eventData.duration)
        localStorage.setItem("placeID", json.eventData._id)
        console.log(json.eventData._id);


        if (tocken) {
            // navigate("/event");
        } else {
            toast.error("Your email has been already used...", {
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
        }
    }


    const onChange = (e) => {
        if (e.target.type === 'file') {
            setCreditial({ ...creditial, image: e.target.files[0] });
        } else {
            setCreditial({ ...creditial, [e.target.name]: e.target.value });
        }
    }





    //second place page data

    const [activeStep, setActiveStep] = useState(1);
    const [activeStep1, setActiveStep1] = useState(1);

    const [creditial2, setCreditial2] = useState({ placeName: "", placesName: "", duration: "", placeContent: "", hotelName: "", area: "", adultCost: "", childCost: "", departureCity: "", flight: "", rflight: "", img2: "", img3: "", img4: "", img5: "" });
    const navigate2 = useNavigate();


    // days 
    const [dayFields, setDayFields] = useState([
        { details: '' }, // Initialize with an empty day field
    ]);



    const handleDayChange = (e, index) => {
        const updatedDayFields = [...dayFields];
        updatedDayFields[index].details = e.target.value;
        setDayFields(updatedDayFields);
    };

    const removeDayField = (index) => {
        const updatedDayFields = [...dayFields];
        updatedDayFields.splice(index, 1);
        setDayFields(updatedDayFields);
    };

    const addDayField = () => {
        const days = localStorage.getItem('duration').charAt(0);
        if (dayFields.length < days) {
            setDayFields([...dayFields, { details: '' }]); // Add a new empty day field
        }
    };



    // places
    const [placesFields, setPlacesFields] = useState([
        { placesInfo: '' }, // Initialize with an empty day field
    ]);

    const handlePlacesChange = (event, index) => {
        const updatedPlacesFields = [...placesFields];
        updatedPlacesFields[index] = { placesInfo: event.target.value };
        setPlacesFields(updatedPlacesFields);
    };

    // const handleImageChange = (event, index) => {
    //     const updatedPlacesFields = [...placesFields];
    //     updatedPlacesFields[index] = { ...updatedPlacesFields[index] };
    //     setPlacesFields(updatedPlacesFields);
    // };






    const addPlaceField = () => {
        const placesString = localStorage.getItem("places");
        const placesArray = placesString.split(" + ");
        if (placesFields.length < placesArray.length) {
            setPlacesFields([...placesFields, { placesInfo: '' }]);
        }
    };

    const removePlaceField = (index) => {
        const updatedPlacesFields = [...placesFields];
        updatedPlacesFields.splice(index, 1);
        setPlacesFields(updatedPlacesFields);
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault(); // Prevent form submission
        const formData = new FormData();

        const placeID = localStorage.getItem("placeID")
        // console.log(placeID)

        formData.append('placeName', creditial2.placeName);
        formData.append('placesName', creditial2.placesName);
        formData.append('duration', creditial2.duration);
        formData.append('placeContent', creditial2.placeContent);
        formData.append('adultCost', creditial2.adultCost);
        formData.append('childCost', creditial2.childCost);
        formData.append('flight', creditial2.flight);
        formData.append('rflight', creditial2.rflight);
        // formData.append('seniorCost', creditial2.seniorCost);
        formData.append('hotelName', creditial2.hotelName);
        formData.append('area', creditial2.area);
        formData.append('img2', creditial2.img2);
        formData.append('img3', creditial2.img3);
        formData.append('img4', creditial2.img4);
        formData.append('img5', creditial2.img5);
        formData.append('placeID', placeID);


        dayFields.forEach((dayField, index) => {
            formData.append(`dayDetails[${index}][details]`, dayField.details);
        });

        placesFields.forEach((placesField, index) => {
            formData.append(`placesDetails[${index}][placesInfo]`, placesField.placesInfo);
        });

        console.log("form data : ", formData);

        // Api call
        const response = await fetch(`${host}/api/place/placeDetails`, {
            method: "POST",
            body: formData,
        });
        const json = await response.json();

        console.log("json = ", json);
        const tocken = localStorage.getItem('tocken');
        if (tocken) {
            navigate2("/home");
        } else {
            toast.error("Your email has been already used...", {
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
        }
    }

    const onChange2 = (e) => {
        if (e.target.type === 'file') {
            // Use the correct key for file inputs
            setCreditial2({ ...creditial2, [e.target.name]: e.target.files[0] });
        } else {
            setCreditial2({ ...creditial2, [e.target.name]: e.target.value });
            if (e.target.name === 'details') {
                setDayFields(Array(parseInt(e.target.value)).fill({ details: '' })); // Create new day fields based on the
            }

            if (e.target.name === 'placesInfo') {
                setPlacesFields(Array(parseInt(e.target.value)).fill({ placesInfo: '' })); // Create new day fields based on the
            }
        }
    }



    // flight

    const [flights, setFlights] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const placeName = localStorage.getItem('placeName');
        const departureCity = localStorage.getItem('departureCity');

        if (!placeName || !departureCity) {
            setError('Place name or departure city is missing.');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/place/flight_details`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ placeName, departureCity })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setFlights(data.flights);
                setError('');
            } catch (error) {
                setError('An error occurred. Please try again.');
                setFlights([]);
            }
        };

        fetchData();
    }, []);

    console.log("Flight : ", flights);



    // return flights
    const [rflights, setrFlights] = useState([]);
    const [error2, setError2] = useState('');

    useEffect(() => {
        const fetchData2 = async () => {
            const placeName = localStorage.getItem('placeName');
            const departureCity = localStorage.getItem('departureCity');

            if (!placeName || !departureCity) {
                setError2('Place name or departure city is missing.');
                return;
            }

            console.log("Frontend1")

            try {
                const response = await fetch(`http://localhost:5000/api/place/rflight_details`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ placeName, departureCity })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log("frontend2");
                setrFlights(data.rflights);
                setError2('');
            } catch (error) {
                setError2('An error occurred. Please try again.');
                setrFlights([]);
            }
        };

        fetchData2();
    }, []);

    console.log("rFlight : ", rflights);



    // admin update event

    const [modal1Open, setModal1Open] = useState(false);

    const openModal = () => {
        // localStorage.setItem("propertyFor", propertyFor);
        setModal1Open(true);
    };

    const onlycloseModal1 = () => {
        setModal1Open(false);
    };


    const [selectedPlace, setSelectedPlace] = useState('');
    const [eventData, setEventData] = useState([]);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const host = "http://localhost:5000";
                const response = await fetch(`${host}/api/admin/admin`, {
                    method: "GET"
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch event data");
                }

                const eventData = await response.json();
                console.log(eventData);
                setEventData(eventData.eventData);
            } catch (error) {
                console.log("Error fetching data: ", error);
            }
        };

        fetchEventData();
    }, []);

    const handlePlaceChange = (event) => {
        setSelectedPlace(event.target.value);
    };

    const [formSubmitted, setFormSubmitted] = useState(false);


    const handleUpdateSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here

        // Close modal1
        setModal1Open(false);
        console.log("Form submitted!");
        // Indicate form submission
        setFormSubmitted(true);


    };



    return (
        <div className='flex'>
            <div className="w-1/5  text-gray-200 body-font bg-blue-950">
                <div className=" h-[43rem] flex flex-wrap ">
                    <div className=" px-7  w-full overflow-hidden   ">
                        <div className=' my-5'>
                            <div className='my-3 text-lg '>Dashbord</div>
                            <div className='py-5'>
                                <div className={`${activeStep === 1 ? ' text-indigo-800 bg-gray-100' : ' '} py-3 cursor-pointer hover:text-gray-400 font-bold px-4`} onClick={() => setActiveStep(1)}>Add Event</div>
                                <div className={`${activeStep === 3 ? ' text-indigo-500 bg-gray-100' : ' '} py-3 cursor-pointer hover:text-gray-400 font-bold px-4`} onClick={() => setActiveStep(3)}>Show User Details</div>
                                <div className={`${activeStep === 4 ? ' text-indigo-500 bg-gray-100' : ' '} py-3 cursor-pointer hover:text-gray-400 font-bold px-4`} onClick={() => setActiveStep(4)}>Show Event</div>
                                <div className={`${activeStep === 5 ? ' text-indigo-500 bg-gray-100' : ' '} py-3 cursor-pointer hover:text-gray-400 font-bold px-4`} onClick={() => setActiveStep(5)}>Show Traveler User details</div>
                                <div className={`${activeStep === 6 ? ' text-indigo-500 bg-gray-100' : ' '} py-3 cursor-pointer hover:text-gray-400 font-bold px-4`} onClick={() => { openModal(); setActiveStep(6) }}>Update Event</div>
                                <div className={`${activeStep === 7 ? ' text-indigo-500 bg-gray-100' : ' '} py-3 cursor-pointer hover:text-gray-400 font-bold px-4`} onClick={() => setActiveStep(7)}>Show Comment</div>
                                {/* <div className={`${activeStep === 7 ? 'pb-3' : ''} cursor-pointer hover:text-gray-400`}>Show Travellers Details</div> */}
                            </div>


                        </div>
                    </div>

                </div>
            </div>
            <div className=' w-4/5 bg-gray-100'>
                <div >
                    <div className=' bg-gray-100'>
                        {activeStep === 1 && (
                            <div className=' h-[43rem] mx-auto  '>

                                <div className="container ">
                                    <form onSubmit={handleSubmit(clickHandler)} encType='multipart/form-data'>
                                        <h2 className=' px-10 py-5 text-xl'>Event Page Information</h2>
                                        <hr />
                                        <div className="container my-4 flex">
                                            <div className="lg:w-1/2 md:w-1/2  rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
                                                <div className="relative mb-4">
                                                    <label htmlFor="placeName" className="leading-7 text-sm text-gray-600">Place Name :</label>
                                                    <input type="text" id="placeName" name="placeName" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="e.g.Goa"
                                                        {...register("placeName", {
                                                            required: "placename is required",
                                                            pattern: {
                                                                value: /[A-Za-z]/,
                                                                message: "Invalid placename",
                                                            },
                                                        })}
                                                        onChange={onChange}
                                                        value={creditial.placeName} />
                                                    <p className="text-sm text-red-500">{errors.placeName?.message}</p>
                                                </div>

                                                <div className="relative mb-4">
                                                    <label htmlFor="departureCity" className="leading-7 text-sm text-gray-600">Departure City:</label>
                                                    <select type="text" id="departureCity" name="departureCity" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="e.g.Goa"
                                                        {...register("departureCity", {
                                                            required: "Departure City is required",
                                                            pattern: {
                                                                value: /[A-Za-z]/,
                                                                message: "Invalid City Name",
                                                            },
                                                        })}
                                                        onChange={onChange}
                                                        value={creditial.departureCity} >

                                                        <option value="Ahmedabad" selected>Ahmedabad</option>
                                                        <option value="Vadodara">Vadodara</option>
                                                        <option value="Surat">Surat</option>
                                                        <option value="Rajkot">Rajkot</option>
                                                        <option value="Jamnagar">Jamnagar</option>
                                                        <option value="bhavnagar">Bhavnagar</option>


                                                    </select>
                                                    <p className="text-sm text-red-500">{errors.departureCity?.message}</p>
                                                </div>

                                                <div className="relative mb-4">
                                                    <label htmlFor="placesName" className="leading-7 text-sm text-gray-600">Places Name :</label>
                                                    <input type="text" id="placesName" name="placesName" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="e.g. panaji + North Goa + South Goa"

                                                        {...register("placesName", {
                                                            required: "place's name is required",
                                                        })}
                                                        onChange={onChange}
                                                        value={creditial.placesName} />
                                                    <p className="text-sm text-red-500">{errors.placesName?.message}</p>
                                                </div>
                                                <div className="relative mb-4">
                                                    <label htmlFor="duration" className="leading-7 text-sm text-gray-600">Duration :</label>
                                                    <input type="text" id="duration" name="duration" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="e.g. 10 days / 9 nights"

                                                        {...register("duration", {
                                                            required: "duration is required",
                                                        })}
                                                        onChange={onChange}
                                                        value={creditial.duration} />
                                                    <p className="text-sm text-red-500">{errors.duration?.message}</p>
                                                </div>
                                                <div className="relative mb-4">
                                                    <label htmlFor="image" className="leading-7 text-sm text-gray-600">Event Page Image :</label>
                                                    <input type="file" id="image" name="image" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"

                                                        {...register("image", {
                                                            required: "image is required",
                                                        })}
                                                        onChange={onChange} />
                                                    <p className="text-sm text-red-500">{errors.image?.message}</p>
                                                </div>

                                            </div>

                                            {/* <div className='lg:w-2/6 md:w-1/2  mx-auto items-center justify-center rounded-lg flex flex-col w-full mt-10 md:mt-0'>
                                                <img src="../images/Event-Forms.png" alt="" srcSet="" className="size-96 w-full object-cover object-center rounded hidden sm:block" />
                                            </div> */}
                                        </div>
                                        <button className={`text-white bg-indigo-400 border-0 mx-10 mb-3 py-2 px-10 focus:outline-none hover:bg-indigo-500 rounded text-lg `}  >Next</button>
                                    </form>
                                </div>


                            </div>
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
                                                    <input type="text" id="placeName" name="placeName" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="e.g.Goa" required
                                                        onChange={onChange2}
                                                        value={creditial2.placeName} />
                                                </div>

                                                <div className="relative mb-4">
                                                    <label htmlFor="placesName" className="leading-7 text-sm ">Places Name :</label>
                                                    <input type="text" id="placesName" name="placesName" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="e.g. panaji + North Goa + South Goa"
                                                        required
                                                        onChange={onChange2}
                                                        value={creditial2.placesName} />
                                                </div>

                                                <div className="relative mb-4">
                                                    <label htmlFor="duration" className="leading-7 text-sm ">Duration :</label>
                                                    <input type="text" id="duration" name="duration" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="e.g. 10 days / 9 nights"
                                                        required
                                                        onChange={onChange2}
                                                        value={creditial2.duration} />
                                                </div>


                                                <div className="relative mb-4">
                                                    <label htmlFor="placeContent" className="leading-7 text-sm ">Place Content :</label>
                                                </div>
                                                <textarea name="placeContent" id="placeContent" cols="60" rows="10" required
                                                    onChange={onChange2}
                                                    value={creditial2.placeContent}>
                                                </textarea>

                                                <div className="relative my-4">
                                                    <label htmlFor="adultCost" className="leading-7 text-sm ">Adult Cost :</label>
                                                    <input type="text" id="adultCost" name="adultCost" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Rs. 5000"
                                                        required
                                                        onChange={onChange2}
                                                        value={creditial2.adultCost} />
                                                </div>

                                                <div className="relative mb-4">
                                                    <label htmlFor="childCost" className="leading-7 text-sm ">Child Cost :</label>
                                                    <input type="text" id="childCost" name="childCost" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Rs. 3000"
                                                        required
                                                        onChange={onChange2}
                                                        value={creditial2.childCost} />
                                                </div>

                                                {/* <div className="relative mb-4">
                                                    <label htmlFor="seniorCost" className="leading-7 text-sm ">Senior Cost :</label>
                                                    <input type="text" id="seniorCost" name="seniorCost" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Rs. 2000"
                                                        required
                                                        onChange={onChange2}
                                                        value={creditial2.seniorCost} />
                                                </div> */}




                                                <div className="relative mb-4">
                                                    {error && <p>{error}</p>}
                                                    {flights.length > 0 && (
                                                        <div>
                                                            <label htmlFor="flight" className="leading-7 text-sm ">Flights:</label>
                                                            {/* <h2>Flights:</h2> */}
                                                            <select id="flight"
                                                                name="flight"
                                                                value={creditial2.flight}
                                                                onChange={onChange2}
                                                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent m-4">
                                                                {flights.map((flight, index) => (
                                                                    <option key={index}>
                                                                        {flight.flight_number} - Departure: {flight.departure_time} - Arrival: {flight.arrival_time}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="relative mb-4">
                                                    {error2 && <p>{error2}</p>}
                                                    {rflights.length > 0 && (
                                                        <div>
                                                            <label htmlFor="rflight" className="leading-7 text-sm ">Return Flights:</label>
                                                            {/* <h2>Flights:</h2> */}
                                                            <select id="rflight"
                                                                name="rflight"
                                                                value={creditial2.rflight}
                                                                onChange={onChange2}
                                                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent m-4">
                                                                {rflights.map((flight, index) => (
                                                                    <option key={index}>
                                                                        {flight.flight_name} - Departure: {flight.departure_time} - Arrival: {flight.arrival_time}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    )}
                                                </div>




                                                {/* places details */}
                                                <div className="container my-4 flex">
                                                    <div className=" rounded-lg  py-3 flex flex-col w-full mt-10 md:mt-0">
                                                        <h2 className='py-3 text-lg font-medium'>places details</h2>

                                                        {placesFields.map((placesField, index) => (
                                                            <div key={index} className="relative mb-4 flex ">
                                                                <div className='flex flex-col'>
                                                                    <div>
                                                                        <label htmlFor={`place-${index}`} className="leading-7 text-sm ">
                                                                            {localStorage.getItem("places") ? localStorage.getItem("places").split(" + ")[index] : ""} :</label>



                                                                    </div>

                                                                    <div className="flex w-full">


                                                                        <textarea
                                                                            id={`place-${index}`}
                                                                            name="placesInfo"
                                                                            className=" bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1  leading-8 transition-colors duration-200 ease-in-out resize-none"
                                                                            rows={3}
                                                                            cols={60}
                                                                            value={placesField.placesInfo}
                                                                            onChange={(e) => handlePlacesChange(e, index)}
                                                                        />


                                                                        {index !== 0 && (
                                                                            <button
                                                                                type="button"
                                                                                className="w-8 h-8 bg-red-500 hover:bg-red-700 text-white font-bold rounded-full ml-4 flex items-center justify-center"
                                                                                onClick={() => removePlaceField(index)}
                                                                            >
                                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                                </svg>
                                                                            </button>
                                                                        )}
                                                                    </div>

                                                                </div>

                                                            </div>
                                                        ))}

                                                        <div className='mx-auto'>
                                                            <button
                                                                type="button"
                                                                className={`text-white bg-indigo-500  hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 font-medium rounded-lg text-sm w-full py-2 px-4 mt-4 `}
                                                                onClick={addPlaceField}
                                                            >
                                                                Add Another Place
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>



                                                {/* days details */}
                                                <div className="container my-4 flex">
                                                    <div className=" rounded-lg  py-3 flex flex-col w-full mt-10 md:mt-0">
                                                        <h2 className='py-3'>Day Details</h2>

                                                        {dayFields.map((dayField, index) => (
                                                            <div key={index} className="relative mb-4 flex flex-col">
                                                                <div>
                                                                    <label htmlFor={`day-${index}`} className="leading-7 text-sm ">Day {index + 1}:</label>
                                                                </div>

                                                                <div className="flex w-full">

                                                                    <textarea
                                                                        id={`details-${index}`}
                                                                        name="details"
                                                                        className=" bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1  leading-8 transition-colors duration-200 ease-in-out resize-none"
                                                                        rows={3}
                                                                        cols={60}
                                                                        value={dayField.details}
                                                                        onChange={(e) => handleDayChange(e, index)}
                                                                    />
                                                                    {index !== 0 && (
                                                                        <button
                                                                            type="button"
                                                                            className="w-8 h-8 bg-red-500 hover:bg-red-700 text-white font-bold rounded-full ml-4 flex items-center justify-center"
                                                                            onClick={() => removeDayField(index)}
                                                                        >
                                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                            </svg>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}

                                                        <div className='mx-auto'>
                                                            <button
                                                                type="button"
                                                                className={`text-white bg-indigo-500  hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 font-medium rounded-lg text-sm w-full py-2 px-4 mt-4`}
                                                                onClick={addDayField}
                                                            >
                                                                Add Another Day
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="relative mb-4">
                                                    <label htmlFor="hotelName" className="leading-7 text-sm ">Hotel Name :</label>
                                                    <input type="text" id="hotelName" name="hotelName" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                        placeholder="e.g. Taj Hotel"
                                                        required
                                                        onChange={onChange2}
                                                        value={creditial2.hotelName} />
                                                </div>



                                                <div className="relative mb-4">
                                                    <label htmlFor="area" className="leading-7 text-sm ">Area :</label>
                                                    <input type="text" id="area" name="area" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                        placeholder="e.g. C-224 Alkapuri, goa"
                                                        required
                                                        onChange={onChange2}
                                                        value={creditial2.area} />
                                                </div>

                                                <div className="relative mb-4">
                                                    <label htmlFor="img2" className="leading-7 text-sm ">Image1 :</label>
                                                    <input type="file" id="img2" name="img2" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                        required
                                                        onChange={onChange2} />
                                                </div>

                                                <div className="relative mb-4">
                                                    <label htmlFor="img3" className="leading-7 text-sm ">Image2 :</label>
                                                    <input type="file" id="img3" name="img3" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                        required
                                                        onChange={onChange2} />
                                                </div>

                                                <div className="relative mb-4">
                                                    <label htmlFor="img4" className="leading-7 text-sm ">Image3 :</label>
                                                    <input type="file" id="img4" name="img4" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                        required
                                                        onChange={onChange2} />
                                                </div>

                                                <div className="relative mb-4">
                                                    <label htmlFor="img5" className="leading-7 text-sm ">Image4 :</label>
                                                    <input type="file" id="img5" name="img5" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                        required
                                                        onChange={onChange2} />
                                                </div>




                                            </div>


                                        </div>
                                        <button className="text-white bg-indigo-400 mx-10 mb-3 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-500 rounded text-lg">Submit</button>
                                    </form>
                                </div>
                                <ToastContainer />
                            </div>
                        )}

                    </div>

                    <div>
                        {activeStep === 3 && (

                            <AdminShowUser />

                        )}

                        {activeStep === 4 && (

                            <AdminShowEvent />

                        )}

                        {activeStep === 5 && (

                            <AdminTravelerUserDetails />

                        )}


                        {activeStep === 6 && (
                            <div>
                                {modal1Open && (
                                    <div>
                                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                                            <div className="bg-white  rounded-lg w-1/3 h-1/3">
                                                <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                                                    <span className="text-2xl text-white flex px-12 justify-center font-medium flex-grow">
                                                        Update Event Information

                                                    </span>
                                                    <button
                                                        onClick={onlycloseModal1}
                                                        className="text-white font-bold text-xl px-3"
                                                    >
                                                        ✕
                                                    </button>

                                                </div>

                                                <div className="modal-body">
                                                    <div className="container mt-3">
                                                        <form onSubmit={handleUpdateSubmit}>
                                                            <div className="mb-3 pt-5 px-5">
                                                                <label htmlFor="placeName" className="form-label px-5 my-10">Place Name:</label>
                                                                <select
                                                                    id="placeName"
                                                                    name="placeName"
                                                                    value={selectedPlace}
                                                                    onChange={handlePlaceChange}
                                                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                >
                                                                    {eventData.map((item, index) => (
                                                                        <option key={index} value={item.placeName}>{item.placeName} ({item.duration})</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="mb-3 py-5 px-5">
                                                                <button
                                                                    type="submit"
                                                                    className="btn btn-primary mx-5 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                                                                >
                                                                    Submit
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                )}
                                <div>

                                    {formSubmitted && (
                                        <AdminUpdateEvent selectedPlace={selectedPlace} />


                                    )}
                                </div>

                            </div>
                        )}

                        {activeStep === 7 && (

                            <AdminShowComment />

                        )}
                    </div>

                </div>
            </div >
        </div >

    )
}

export default Admin
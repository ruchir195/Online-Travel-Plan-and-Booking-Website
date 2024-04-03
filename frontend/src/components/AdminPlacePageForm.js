import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPlacePageForm = () => {
    const host = "http://localhost:5000";
    const navigate = useNavigate();
    const [creditial, setCreditial] = useState({ placeName: "", placesName: "", duration: "", placeContent: "", hotelName: "", area: "", img2: "", img3: "", img4: "", img5: "" });


    // days 
    const [dayFields, setDayFields] = useState([
        { details: '' }, // Initialize with an empty day field
    ]);

    const days = localStorage.getItem('Duration').charAt(0);

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
        if (dayFields.length < days) {
            setDayFields([...dayFields, { details: '' }]); // Add a new empty day field
        }
    };


    // places
    const placesString = localStorage.getItem("places");
    const placesArray = placesString.split(" + ");
    console.log(placesArray.length)

    const [placesFields, setPlacesFields] = useState([
        { placesInfo: ''}, // Initialize with an empty day field
    ]);

    const handlePlacesChange = (event, index) => {
        const updatedPlacesFields = [...placesFields];
        updatedPlacesFields[index] = { placesInfo: event.target.value };
        setPlacesFields(updatedPlacesFields);
    };

    const handleImageChange = (event, index) => {
        const updatedPlacesFields = [...placesFields];
        updatedPlacesFields[index] = { ...updatedPlacesFields[index] };
        setPlacesFields(updatedPlacesFields);
    };

    const addPlaceField = () => {
        if (placesFields.length < placesArray.length) {
            setPlacesFields([...placesFields, { placesInfo: ''}]);
        }
    };

    const removePlaceField = (index) => {
        const updatedPlacesFields = [...placesFields];
        updatedPlacesFields.splice(index, 1);
        setPlacesFields(updatedPlacesFields);
    };


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission
        const formData = new FormData();
        formData.append('placeName', creditial.placeName);
        formData.append('placesName', creditial.placesName);
        formData.append('duration', creditial.duration);
        formData.append('placeContent', creditial.placeContent);
        formData.append('hotelName', creditial.hotelName);
        formData.append('area', creditial.area);
        formData.append('img2', creditial.img2);
        formData.append('img3', creditial.img3);
        formData.append('img4', creditial.img4);
        formData.append('img5', creditial.img5);

        // const filteredDayFields = dayFields.filter((day) => day.details.trim());

        // console.log("filerdays :  ", filteredDayFields.length)
        // if (!filteredDayFields.length) {
        //     alert('Please provide day details!');
        //     return;
        // }

        // const data = JSON.stringify(filteredDayFields.map((day) => ({ details: day.details })))

        // console.log("data : ", data);

        // formData.append('dayDetails', data);

        dayFields.forEach((dayField, index) => {
            formData.append(`dayDetails[${index}][details]`, dayField.details);
        });

        placesFields.forEach((placesField, index) => {
            formData.append(`placesDetails[${index}][placesInfo]`, placesField.placesInfo);
        });




        // Api call
        const response = await fetch(`${host}/api/place/placeDetails`, {
            method: "POST",
            body: formData,
        });
        const json = await response.json();

        console.log(json);
        const tocken = localStorage.getItem('tocken');


        if (tocken) {
            navigate("/home");
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
            // Use the correct key for file inputs
            setCreditial({ ...creditial, [e.target.name]: e.target.files[0] });

        } else {
            setCreditial({ ...creditial, [e.target.name]: e.target.value });
            if (e.target.name === 'details') {
                setDayFields(Array(parseInt(e.target.value)).fill({ details: '' })); // Create new day fields based on the
            }

            if (e.target.name === 'placesInfo') {
                setPlacesFields(Array(parseInt(e.target.value)).fill({ placesInfo: '' })); // Create new day fields based on the
            }
        }
    }












    return (
        <div className='container mx-auto my-5 bg-gray-100'>
            <div className="container mt-3">
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <h2 className='px-8 py-5 text-xl'>Place page Information</h2>
                    <hr />
                    <div className="container my-4">
                        <div className="lg:w-1/2 md:w-1/2  rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
                            <div className="relative mb-4">
                                <label htmlFor="placeName" className="leading-7 text-sm text-gray-600">Place Name :</label>
                                <input type="text" id="placeName" name="placeName" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="e.g.Goa" required
                                    onChange={onChange}
                                    value={creditial.placeName} />
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="placesName" className="leading-7 text-sm text-gray-600">Places Name :</label>
                                <input type="text" id="placesName" name="placesName" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="e.g. panaji + North Goa + South Goa"
                                    required
                                    onChange={onChange}
                                    value={creditial.placesName} />
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="duration" className="leading-7 text-sm text-gray-600">Duration :</label>
                                <input type="text" id="duration" name="duration" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="e.g. 10 days / 9 nights"
                                    required
                                    onChange={onChange}
                                    value={creditial.duration} />
                            </div>


                            <div className="relative mb-4">
                                <label htmlFor="placeContent" className="leading-7 text-sm text-gray-600">Place Content :</label>
                            </div>
                            <textarea name="placeContent" id="placeContent" cols="60" rows="10" required
                                onChange={onChange}
                                value={creditial.placeContent}></textarea>


                            {/* places details */}
                            <div className="container my-4 flex">
                                <div className=" rounded-lg  py-3 flex flex-col w-full mt-10 md:mt-0">
                                    <h2 className='py-3 text-lg font-medium'>places details</h2>

                                    {placesFields.map((placesField, index) => (
                                        <div key={index} className="relative mb-4 flex ">
                                            <div className='flex flex-col'>
                                                <div>
                                                    <label htmlFor={`place-${index}`} className="leading-7 text-sm "> {placesArray[index]} :</label>
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
                                            className={`text-white bg-indigo-500  hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 font-medium rounded-lg text-sm w-full py-2 px-4 mt-4 disabled:${dayFields.length > days}`}
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
                                            className={`text-white bg-indigo-500  hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 font-medium rounded-lg text-sm w-full py-2 px-4 mt-4 disabled:${dayFields.length > days}`}
                                            onClick={addDayField}
                                        >
                                            Add Another Day
                                        </button>
                                    </div>

                                </div>
                            </div>








                            <div className="relative mb-4">
                                <label htmlFor="hotelName" className="leading-7 text-sm text-gray-600">Hotel Name :</label>
                                <input type="text" id="hotelName" name="hotelName" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    placeholder="e.g. Taj Hotel"
                                    required
                                    onChange={onChange}
                                    value={creditial.hotelName} />
                            </div>



                            <div className="relative mb-4">
                                <label htmlFor="area" className="leading-7 text-sm text-gray-600">Area :</label>
                                <input type="text" id="area" name="area" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    placeholder="e.g. C-224 Alkapuri, goa"
                                    required
                                    onChange={onChange}
                                    value={creditial.area} />
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="img2" className="leading-7 text-sm text-gray-600">Image1 :</label>
                                <input type="file" id="img2" name="img2" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    required
                                    onChange={onChange} />
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="img3" className="leading-7 text-sm text-gray-600">Image2 :</label>
                                <input type="file" id="img3" name="img3" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    required
                                    onChange={onChange} />
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="img4" className="leading-7 text-sm text-gray-600">Image3 :</label>
                                <input type="file" id="img4" name="img4" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    required
                                    onChange={onChange} />
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="img5" className="leading-7 text-sm text-gray-600">Image4 :</label>
                                <input type="file" id="img5" name="img5" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    required
                                    onChange={onChange} />
                            </div>




                        </div>


                    </div>
                    <button className="text-white bg-yellow-400 mx-7 mb-3 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-500 rounded text-lg">Submit</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AdminPlacePageForm
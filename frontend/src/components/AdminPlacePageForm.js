import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPlacePageForm = () => {
    const host = "http://localhost:5000";
    const [creditial, setCreditial] = useState({ placeName: "", placesName: "", duration: "", placeContent: "", price: "", greeting: "", age: "", hotelName: "", hotelRating: "", area: "",  img2: "", img3: "", img4: "", img5: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission
        const formData = new FormData();
        formData.append('placeName', creditial.placeName);
        formData.append('placesName', creditial.placesName);
        formData.append('duration', creditial.duration);
        formData.append('placeContent', creditial.placeContent);
        formData.append('price', creditial.price);
        formData.append('greeting', creditial.greeting);
        formData.append('age', creditial.age);
        formData.append('hotelName', creditial.hotelName);
        formData.append('hotelRating', creditial.hotelRating);
        formData.append('area', creditial.area);
        formData.append('img2', creditial.img2);
        formData.append('img3', creditial.img3);
        formData.append('img4', creditial.img4);
        formData.append('img5', creditial.img5);

        // Api call
        const response = await fetch(`${host}/api/place/placeDetails`, {
            method: "POST",
            body: formData,
        });
        const json = await response.json();

        // console.log(json);
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
                                <input type="text" id="placeName" name="placeName" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="e.g.Goa"  required
                                onChange={onChange}
                                value={creditial.placeName}/>
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="placesName" className="leading-7 text-sm text-gray-600">Places Name :</label>
                                <input type="text" id="placesName" name="placesName" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="e.g. panaji + North Goa + South Goa"
                                required
                                onChange={onChange}
                                value={creditial.placesName}/>
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="duration" className="leading-7 text-sm text-gray-600">Duration :</label>
                                <input type="text" id="duration" name="duration" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="e.g. 10 days / 9 nights"
                                required
                                onChange={onChange}
                                value={creditial.duration}/>
                            </div>


                            <div className="relative mb-4">
                                <label htmlFor="placeContent" className="leading-7 text-sm text-gray-600">Place Content :</label>
                            </div>
                            <textarea name="placeContent" id="placeContent" cols="60" rows="10"  required
                                onChange={onChange}
                                value={creditial.placeContent}></textarea>

                            <div className="relative my-4">
                                <label htmlFor="price" className="leading-7 text-sm text-gray-600">Price :</label>
                                <input type="text" id="price" name="price" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="e.g. 10,000"
                                required
                                onChange={onChange}
                                value={creditial.price}/>
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="greeting" className="leading-7 text-sm text-gray-600">Greeting :</label>
                                <input type="text" id="greeting" name="greeting" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="e.g. Welcome to Goa"
                                required
                                onChange={onChange}
                                value={creditial.greeting}/>
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="age" className="leading-7 text-sm text-gray-600">Age :</label>
                                <input type="text" id="age" name="age" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="e.g.18-30"
                                required
                                onChange={onChange}
                                value={creditial.age}/>
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="hotelName" className="leading-7 text-sm text-gray-600">Hotel Name :</label>
                                <input type="text" id="hotelName" name="hotelName" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                placeholder="e.g. Taj Hotel"
                                required
                                onChange={onChange}
                                value={creditial.hotelName}/>
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="hotelRating" className="leading-7 text-sm text-gray-600">Hotel Rating :</label>
                                <input type="text" id="hotelName" name="hotelRating" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                placeholder="e.g. 5 star"
                                required
                                onChange={onChange}
                                value={creditial.hotelRating}/>
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="area" className="leading-7 text-sm text-gray-600">Area :</label>
                                <input type="text" id="area" name="area" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                placeholder="e.g. C-224 Alkapuri, goa"
                                required
                                onChange={onChange}
                                value={creditial.area}/>
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="img2" className="leading-7 text-sm text-gray-600">Image1 :</label>
                                <input type="file" id="img2" name="img2" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                required
                                onChange={onChange}/>
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="img3" className="leading-7 text-sm text-gray-600">Image2 :</label>
                                <input type="file" id="img3" name="img3" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                required
                                onChange={onChange}/>
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="img4" className="leading-7 text-sm text-gray-600">Image3 :</label>
                                <input type="file" id="img4" name="img4" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                required
                                onChange={onChange}/>
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="img5" className="leading-7 text-sm text-gray-600">Image4 :</label>
                                <input type="file" id="img5" name="img5" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                required
                                onChange={onChange}/>
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
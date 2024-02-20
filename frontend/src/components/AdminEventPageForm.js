import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";

const AdminEventPageForm = () => {

    const host = "http://localhost:5000";
    const [creditial, setCreditial] = useState({ placeName: "", placesName: "", duration: "", image: "" });
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const clickHandler = async (e) => {
        const formData = new FormData();
        formData.append('placeName', creditial.placeName);
        formData.append('placesName', creditial.placesName);
        formData.append('duration', creditial.duration);
        formData.append('image', creditial.image);

        // Api call
        const response = await fetch(`${host}/api/place/event`, {
            method: "POST",
            body: formData,
        });
        const json = await response.json();

        console.log(json);
        const tocken = localStorage.getItem('tocken');
        if (tocken) {
            navigate("/event");
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

    return (
        <div className='container mx-auto my-20 bg-gray-100'>

            <div className="container my-3 ">
                <form onSubmit={handleSubmit(clickHandler)} encType='multipart/form-data'>
                    <h2 className='px-8 py-5 text-xl'>Event Page Information</h2>
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

                        <div className='px-10 py-10'>
                            <img src="../images/Event-Forms.png" alt="" srcset="" className="size-96"/>
                        </div>
                    </div>
                    <button className="text-white bg-yellow-400 border-0 mx-7 mb-3 py-2 px-6 focus:outline-none hover:bg-yellow-500 rounded text-lg">Submit</button>
                </form>
            </div>


            <ToastContainer />
        </div>
    )
}

export default AdminEventPageForm;

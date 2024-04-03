import React, { useState } from 'react'
import displayRazorpay from "../utils/PaymnetGateway"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const ReviewUserDetailsForm = () => {

    const formData = localStorage.getItem("travelerFormData")
    const parsedData = JSON.parse(formData);
    console.log(parsedData.adults)
    const navigate = useNavigate();
    const [styles, setStyles] = useState({
        borderColor: 'border-gray-200',
        bgColor: 'bg-gray-200'
    });

    const handlePayment = async () => {
        try {
            setStyles({
                borderColor: 'border-indigo-500',
                bgColor: 'bg-indigo-500'
            });;
            const amount = localStorage.getItem('totalCost');
            displayRazorpay(amount)
                .then(async (totalAmount) => {
                    const travelerFormData = localStorage.getItem("travelerFormData");
                    const placeName = localStorage.getItem("placeName");
                    const startingDate = localStorage.getItem("startingDate");
                    const duration = localStorage.getItem("Duration");
                    const totalCost = localStorage.getItem("totalCost");
                    console.log(travelerFormData);

                    try {
                        const response = await fetch("http://localhost:5000/api/travelUser/reviewUserDetails", {
                            method: "POST",
                            body: JSON.stringify({ travelerFormData, placeName, startingDate, duration, totalCost }),
                            headers: {
                                "Content-Type": "application/json",
                            }
                        });

                        toast.success("Payment done successfully", {
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

                        // Parse response data
                        const data = await response.json();
                        navigate("/home");
                        console.log(data);
                    } catch (error) {
                        toast.warning("Attention! your payment not done. due to internal server error", {
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
                        console.error("user data stored error:", error);
                    }

                    console.log("Payment ID:", totalAmount);
                    // Handle success, such as navigating to a success page
                })
                .catch((error) => {

                    // setPaymentError("Payment failed. Please try again later.");
                    console.error("Payment error:", error);
                    toast.warning("Attention! your payment not done.", {
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
                });
        } catch (error) {
            console.error("Payment error:", error);
            toast.warning("Attention! your payment not done. due to internal server error", {
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


            // setPaymentError("Payment failed. Please try again later.");
        }
    };




    return (
        <section className="text-gray-600 body-font">
            <div className="container py-24 mx-auto">
                <h1 className="text-3xl font-medium title-font  mb-12 text-center">Review Form Details</h1>
                <div className="flex mx-32   flex-wrap my-10 ">
                    <a className="sm:px-6 py-3 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none border-indigo-400 tracking-wider rounded-t">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full  inline-flex items-center justify-center mx-2  relative z-10 bg-indigo-50 text-indigo-500">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                <path d="M22 4L12 14.01l-3-3"></path>
                            </svg>
                        </div>Select A Date
                    </a>
                    <a className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-indigo-400 hover:text-gray-900 tracking-wider">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full  inline-flex items-center justify-center mx-2  relative z-10 bg-indigo-50 text-indigo-500">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                <path d="M22 4L12 14.01l-3-3"></path>
                            </svg>
                        </div>Travellers
                    </a>
                    <a className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-indigo-400 hover:text-gray-900 tracking-wider">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full  inline-flex items-center justify-center mx-2  relative z-10 bg-indigo-50 text-indigo-500">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                <path d="M22 4L12 14.01l-3-3"></path>
                            </svg>
                        </div>Hotel
                    </a>
                    <a className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-indigo-400 hover:text-gray-900 tracking-wider">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full  inline-flex items-center justify-center mx-2  relative z-10 bg-indigo-50 text-indigo-500">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                <path d="M22 4L12 14.01l-3-3"></path>
                            </svg>
                        </div>User Details
                    </a>
                    <a className="sm:px-6 py-3  sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-indigo-400  hover:text-gray-900 tracking-wider">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 mx-2 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">5</div>Review
                    </a>

                    <a className={`sm:px-6 py-3  sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none ${styles.borderColor} hover:text-gray-900 tracking-wider`}>
                        <div className={`flex-shrink-0 w-7 h-7 rounded-full mt-10 sm:mt-0 mx-2 inline-flex items-center justify-center text-indigo-500 ${styles.bgColor}  text-white relative z-10 title-font font-medium text-sm`}>6</div>Payment
                    </a>
                </div>
                <div className="flex flex-wrap mx-auto">
                    <div className="p-4 w-3/4 mx-auto">
                        <div className="h-full flex bg-gray-100  rounded">
                            <div className=' p-8 px-10'>
                                {/* <h2 className='mt-10 text-lg font-bold'>Package Details</h2>
                                <p className='my-4 font-semibold'>Package Name : <span className='px-2 font-normal'>{localStorage.getItem("placeName")}</span></p>
                                <p className='mb-4 font-semibold'>Starting Date : <span className='px-2 font-normal'>{localStorage.getItem("startingDate")}</span></p>
                                <p className='mb-4 font-semibold'>Ending Date : <span className='px-2 font-normal'>{localStorage.getItem("EndingDate")}</span></p>
                                <p className='mb-4 font-semibold'>Duration  : <span className='px-2 font-normal'>{localStorage.getItem("duration")}</span></p>
                                <p className='mb-4 font-semibold'>Places Name : <span className='px-2 font-normal'>{localStorage.getItem("places")}</span></p> */}
                                {parsedData.adults.map((adult, index) => (
                                    <div key={`adult_${index}`}>
                                        <h2 className='mt-10 text-lg font-bold'>Adult-{index + 1} Details</h2>
                                        <p className='my-4 font-semibold'>Name: <span className='px-2 font-normal'>{adult.name} {adult.lname}</span></p>
                                        <p className='mb-4 font-semibold'>Date of Birth: <span className='px-2 font-normal'>{adult.dob}</span> </p>
                                        
                                        {index === 0 &&
                                            <>
                                                <p className='mb-4 font-semibold'>Email id: <span className='px-2 font-normal'>{adult.email}</span></p>
                                                <p className='mb-4 font-semibold'>Mobile No.: <span className='px-2 font-normal'>{adult.mobile}</span></p>
                                                <p className='mb-4 font-semibold'>Adhar No.: <span className='px-2 font-normal'>{adult.adharNo}</span></p>
                                                <p className='mb-4 font-semibold'>Address: <span className='px-2 font-normal'>{adult.address}</span></p>
                                                <p className='mb-4 font-semibold'>City: <span className='px-2 font-normal'>{parsedData.city}</span></p>
                                            </>
                                        }
                                    </div>
                                ))}

                                {parsedData.children.map((child, index) => (
                                    <div key={index}>
                                        <h2 className='mt-10 text-lg font-bold'>Child-{index + 1} Details</h2>
                                        <p className='my-4 font-semibold'>Name:  <span className='px-2 font-normal'>{child.name} {child.lname}</span> </p>
                                        {/* <p className='mb-4 font-semibold'>Email: <span className='px-2 font-normal'>{child.email}</span></p> */}
                                        <p className='mb-4 font-semibold'>Date of Birth: <span className='px-2 font-normal'>{child.dob}</span> </p>
                                        {/* <p className='mb-4 font-semibold'>Mobile: <span className='px-2 font-normal'>{child.mobile}</span></p>
                                        <p className='mb-4 font-semibold'>Adhar No.: <span className='px-2 font-normal'>{child.adharNo}</span></p>
                                        <p className='mb-4 font-semibold'>Address: <span className='px-2 font-normal'>{child.address}</span></p> */}


                                    </div>
                                ))}

                                {/* {parsedData.seniors.map((senior, index) => (
                                    <div key={index}>
                                        <h2 className='mt-10 text-lg font-bold'>senior-{index + 1} Details</h2>
                                        <p className='my-4 font-semibold'>Name: <span className='px-2 font-normal'>{senior.name} {senior.lname}</span></p>
                                        <p className='mb-4 font-semibold'>Email: <span className='px-2 font-normal'>{senior.email}</span></p>
                                        <p className='mb-4 font-semibold'>Date of Birth: <span className='px-2 font-normal'>{senior.dob}</span></p>
                                        <p className='mb-4 font-semibold'>Mobile: <span className='px-2 font-normal'>{senior.mobile}</span></p>
                                        <p className='mb-4 font-semibold'>Adhar No.: <span className='px-2 font-normal'>{senior.adharNo}</span></p>
                                        <p className='mb-4 font-semibold'>Address: <span className='px-2 font-normal'>{senior.address}</span></p>


                                    </div>
                                ))} */}


                                <div className='py-5'>
                                    {/* <p className='mb-4 font-semibold'>City: <span className='px-2 font-normal'>{parsedData.city}</span></p> */}
                                    {/* <p className='mb-4 font-semibold'>State: <span className='px-2 font-normal'>{parsedData.state}</span></p> */}
                                    <p className='mb-4 font-semibold'>Total Cost: <span className='px-2 font-normal'>Rs. {localStorage.getItem("totalCost")}</span></p>
                                </div>

                            </div>


                            <div className=' flex ml-auto '>
                                <div className='relative'>
                                    <div className=" w-auto top-16 sticky">
                                        <div className="w-full flex flex-wrap ">
                                            <div className=" w-96   mb-6 lg:mb-0">
                                                {/* <h1 className="text-gray-900 text-2xl title-font font-medium mb-4">Booking Summary</h1> */}
                                                <div className=' bg-indigo-400 px-5 py-5 text-white '>

                                                    <div className='py-1 font-bold text-xl'>{localStorage.getItem("placeName")} Trip</div>
                                                    <div className='py-2'>{localStorage.getItem("startingDate") && (
                                                        <div>
                                                            <p className='mb-1'>Starting Date : <span className='px-2 font-normal'>{localStorage.getItem("startingDate")}</span></p>
                                                            {/* <p className='mb-1 '>Ending Date : <span className='px-2 font-normal'>{localStorage.getItem("EndingDate")}</span></p> */}
                                                            <p className='mb-1 '>Duration  : <span className='px-2 font-normal'>{localStorage.getItem("Duration")}</span></p>
                                                            {/* <p className='mb-1 '>Places Name : <span className='px-2 font-normal'>{localStorage.getItem("places")}</span></p> */}
                                                        </div>
                                                    )}</div>
                                                </div>
                                                <div className="flex my-4">
                                                    <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">Travellers</a>
                                                    <a className=" border-b-2 border-gray-300 py-2 text-lg px-4">Per Person Price</a>
                                                    <a className=" flex-shrink-0 border-b-2 border-gray-300 py-2 text-lg px-4">Prices</a>
                                                </div>

                                                <div className="flex  py-2">
                                                    <span className="text-gray-500">{localStorage.getItem("adults")} Adults</span>
                                                    <span className="text-gray-500 ml-auto pl-4">{localStorage.getItem("adultCost")}</span>
                                                    <span className="ml-auto text-gray-900 px-4">{localStorage.getItem("adults") * localStorage.getItem("adultCost")}</span>
                                                </div>
                                                <div className="flex border-t border-gray-200 py-2">
                                                    <span className="text-gray-500">{localStorage.getItem("children")} Childrens</span>
                                                    <span className="text-gray-500 px-4 ml-auto">{localStorage.getItem("childCost")}</span>
                                                    <span className="ml-auto text-gray-900 px-4">{localStorage.getItem("children") * localStorage.getItem("childCost")}</span>
                                                </div>
                                                {/* <div className="flex border-t border-gray-200 py-2">
                                                    <span className="text-gray-500">{localStorage.getItem("senior")} Senior person</span>
                                                    <span className="text-gray-500 ml-auto pr-7">{localStorage.getItem("seniorCost")}</span>
                                                    <span className="ml-auto text-gray-900 px-4">{localStorage.getItem("senior") * localStorage.getItem("seniorCost")}</span>
                                                </div> */}
                                                <div className="flex border-t-2 my-3  border-indigo-400 py-2">
                                                    <span className="text-gray-500 py-1">Toal Cost:</span>
                                                    <span className="title-font ml-auto px-4 py-1 font-medium text-2xl text-gray-900">Rs. {localStorage.getItem("totalCost")}</span>
                                                </div>

                                                <div className=''>
                                                    <button className="text-white w-full bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={handlePayment}>Pay Now</button>
                                                </div>



                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

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

    )
}

export default ReviewUserDetailsForm
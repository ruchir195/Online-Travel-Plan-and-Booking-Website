import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {

    const host = "http://localhost:5000"
    const [creditial, setCreditial] = useState({ email: "" })
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const clickHandler = async () => {
        if (creditial.email !== "") {
            // Api call
            const response = await fetch(`${host}/api/auth/forgotPassword`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: creditial.email }), // body data type must match "Content-Type" header
            });
            const json = await response.json(); // parses JSON response into native JavaScript objects
            console.log(json)

            if (json.userid) {
                localStorage.setItem('email', json.email)
                localStorage.setItem('otp', json.otp)
                localStorage.setItem('id', json.userid)
                navigate("/getotp");
            } else {
                toast.warning("Attention! Please provide correct email id...", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    rtl: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }
        } else {
            console.log("Incorrect email");
        }
    }

    const onChange = (e) => {
        setCreditial({ ...creditial, [e.target.name]: e.target.value })
    }

    return (
        <div style={{ backgroundColor: "#e7edf4" }}>
            <section className=' py-20   bg-gray-100 '>
                <div className="px-5 py-10 flex items-center justify-center">
                    <div className="lg:w-2/6 md:w-1/2 bg-gray-100 items-center mr-5 justify-center rounded-lg flex flex-col w-full mt-10 md:mt-0">
                        <img alt="ecommerce" className="w-full object-cover object-center rounded" src="../images/AuthImages/forgot1.png" />
                    </div>
                    <div className="lg:w-2/6 md:w-1/2 bg-white rounded-lg py-14  flex flex-col w-full mt-10 md:mt-0  z-10 shadow-md">
                        <div className='py-8 px-14'>
                            <h2 className="text-gray-900 mb-4 pb-3 text-2xl text-center font-sans title-font">Enter Email to get OTP :<span className="  text-red-600 text-lg">*</span></h2>
                            <form onSubmit={handleSubmit(clickHandler)}>
                                <div className=" mb-4">
                                    <label htmlFor="email" className="leading-7 text-base font-sans ">Email address:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        value={creditial.email}
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                message: "Email is not valid email",
                                            },
                                        })}
                                        onChange={onChange}
                                        autoComplete='false' />
                                    <p className="text-sm text-red-500">{errors.email?.message}</p>
                                </div>

                                <button className="text-white bg-indigo-400 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-500 rounded text-lg">Get OTP</button>
                            </form>

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
            </section >
        </div>
    )
}

export default ForgotPassword
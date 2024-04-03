import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ConfirmPassword() {

    const host = "http://localhost:5000"
    const [creditial, setCreditial] = useState({ password: "", cpassword: "" })
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const clickHandler = async (e) => {

        if (creditial.password !== "" && creditial.cpassword !== "") {
            if (creditial.password === creditial.cpassword) {
                // Api call
                const response = await fetch(`${host}/api/auth/confirmPassword`, {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        "Content-Type": "application/json",
                        "id": localStorage.getItem("id")
                    },
                    body: JSON.stringify({ password: creditial.password, cpassword: creditial.cpassword }), // body data type must match "Content-Type" header
                });


                function successNoty() {
                    toast.success("Password change successfully. You may proceed for login...", {
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

                const json = await response.json(); // parses JSON response into native JavaScript objects
                console.log(json)

                if (json) {
                    // localStorage.setItem('tocken', json.tocken)
                    // localStorage.removeItem("id");
                    navigate("/login");
                    localStorage.clear();
                    setTimeout(successNoty, 1000);
                } else {
                    toast.error("Oops! Changing password is failed...", {
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
            else {
                toast.warning("Attention! Password didn't match...", {
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
        else {
            toast.error("Error: Password must be filled...", {
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
    };

    const onChange = (e) => {
        setCreditial({ ...creditial, [e.target.name]: e.target.value })
    }


    return (
        <div style={{ backgroundColor: "#e7edf4" }}>
            <section className='py-20  ' >
                <div className="px-5 py-10 flex items-center justify-center">
                    <div className="lg:w-2/6 md:w-1/2  items-center mr-5 justify-center rounded-lg flex flex-col w-full mt-10 md:mt-0">
                        <img alt="ecommerce" className="w-full object-cover pt-12 pb-3 pl-12 object-center rounded" src="../images/AuthImages/reset.png" />
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg py-3 flex flex-col w-full mt-12 md:mt-8  z-10 shadow-md">
                        <div className='py-8 px-14'>
                            <h2 className="text-gray-900 mb-4 pb-3 text-2xl text-center font-sans title-font">Reset Password</h2>
                            <form onSubmit={handleSubmit(clickHandler)}>
                                <div className=" mb-4">
                                    <label htmlFor="password" className="leading-7 text-base font-sans" >New Password :<span className="  text-red-600 text-lg">*</span></label>
                                    <input type="password"
                                        id="password"
                                        name="password"
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        value={creditial.password}
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 4,
                                                message: "Password must be more than 4 characters",
                                            },
                                            maxLength: {
                                                value: 10,
                                                message:
                                                    "Password cannot exceed more than 10 characters",
                                            },
                                        })}
                                        onChange={onChange}
                                        autoComplete='false' />
                                    <p className="text-sm text-red-500">{errors.password?.message}</p>
                                </div>
                                <div className=" mb-4">
                                    <label htmlFor="cpassword" className="leading-7 text-base font-sans ">Confirm Password :<span className="  text-red-600 text-lg">*</span></label>
                                    <input type="password"
                                        id="cpassword"
                                        name="cpassword"
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        value={creditial.cpassword}
                                        {...register("cpassword", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 4,
                                                message: "Password must be more than 4 characters",
                                            },
                                            maxLength: {
                                                value: 10,
                                                message:
                                                    "Password cannot exceed more than 10 characters",
                                            },
                                        })}
                                        onChange={onChange}
                                        autoComplete='false' />
                                    <p className="text-sm text-red-500">
                                        {errors.cpassword?.message}
                                    </p>
                                </div>

                                <button className="text-white bg-indigo-400 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-500 rounded text-lg">Update Password</button>
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

export default ConfirmPassword
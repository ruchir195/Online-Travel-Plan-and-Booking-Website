import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { GoogleLogin } from "@react-oauth/google";
// import  jwt_decode  from "jwt-decode";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Signup() {

    const host = "http://localhost:5000";
    const [creditial, setCreditial] = useState({ username: "", email: "", phone: "", password: "" });
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const clickHandler = async (e) => {

        if (creditial.username !== "" && creditial.email !== "" && creditial.phone !== "" && creditial.password !== "") {
            // Api call
            const response = await fetch(`${host}/api/auth/register`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: creditial.username, email: creditial.email, phone: creditial.phone, password: creditial.password }), // body data type must match "Content-Type" header
            });
            const json = await response.json(); // parses JSON response into native JavaScript objects
            console.log(json)

            if (json.tocken) {
                localStorage.setItem('name', json.userData.username);
                localStorage.setItem('tocken', json.tocken);
                navigate("/login");

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
        else {

            console.log("If not")
            toast.error("Please fill all the required field...", {
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
        setCreditial({ ...creditial, [e.target.name]: e.target.value })
        // console.log(...creditial, [e.target.name], e.target.value)
    }


    const clickHandlerGoogleLogin = async (e) => {

       console.log("Clcikable");

       window.location.href = 'http://localhost:5000/auth/google/';

    }


    return (
        <>
            <section className=' bg-gray-100' style={{ backgroundColor: "#e7edf4" }}>
                <div className="px-5 py-10 flex items-center justify-center mx-auto">
                    <div className="lg:w-2/6 md:w-1/2 items-center  justify-center rounded-lg flex flex-col w-full ">
                        <img alt="ecommerce" className="w-full object-cover object-center rounded hidden sm:block" src="../images/AuthImages/signup1.png" />
                    </div>
                    <div className=" lg:w-2/5 md:w-1/2  bg-white rounded-lg flex flex-col w-full mt-10 md:mt-0 z-10 shadow-md  ">
                        <ul className="nav nav-tabs flex border-b" id="myTab" role="tablist">
                            <li className="-mb-px mr-1" role="presentation">
                                <Link to="/register"> <button className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-gray-600  font-semibold" id="home-tab" data-bs-toggle="tab"
                                    data-bs-target="#home-tab-pane" type="button" role="tab"
                                    aria-controls="home-tab-pane" aria-selected="true">Sign Up</button></Link>
                            </li>
                            <li className="mr-1" role="presentation">
                                <Link to="/login"><button className="bg-white inline-block py-2 px-4   font-semibold" id="profile-tab" data-bs-toggle="tab"
                                    data-bs-target="#profile-tab-pane" type="button" role="tab"
                                    aria-controls="profile-tab-pane" aria-selected="false"
                                    style={{ color: "black" }}>Login</button></Link>
                            </li>
                        </ul>


                        <div className='py-8 px-14'>
                            <h2 className="text-gray-900 mb-4 pb-3 text-2xl text-center font-sans title-font">Create Your Travel Account</h2>
                            <form onSubmit={handleSubmit(clickHandler)}>
                                <div className="mb-4">
                                    <label htmlFor="username" className="leading-7 text-base font-sans ">Username:<span className="  text-red-600 text-lg">*</span></label>
                                    <input type="text"
                                        id="username"
                                        name="username"
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        value={creditial.username}
                                        {...register("username", { required: "Username is required" })}
                                        onChange={onChange}
                                        autoComplete='false' />
                                    <p className="text-sm text-red-500">{errors.username?.message}</p>
                                </div>
                                <div className=" mb-4">
                                    <label htmlFor="email" className="leading-7 text-base font-sans ">Email address:<span className="  text-red-600 text-lg">*</span></label>
                                    <input type="email"
                                        id="email"
                                        name="email"
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        value={creditial.email}
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                                message: "Email is not valid",
                                            },
                                        })}
                                        onChange={onChange}
                                        autoComplete='false' />
                                    <p className="text-sm text-red-500">{errors.email?.message}</p>
                                </div>
                                <div className=" mb-4">
                                    <label htmlFor="phone" className="leading-7 text-base font-sans ">Phone Number:<span className="  text-red-600 text-lg">*</span></label>
                                    <input type="phone"
                                        id="phone"
                                        name="phone"
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        value={creditial.phone}
                                        {...register("phone", {
                                            required: "Phone number is required",
                                            pattern: {
                                                value: /^\d+(?:[.,]\d+)*$/,
                                                message: "Phone number contains digits only",
                                            },
                                            pattern: {
                                                value: /^[6-9]{1}[0-9]{9}$/,
                                                message: "Phone number is not valid",
                                            },
                                            maxLength: {
                                                value: 10,
                                                message: "Phone no. cannot exceed more than 10 digits",
                                            },
                                        })}
                                        onChange={onChange}
                                        autoComplete='false' />
                                    <p className="text-sm text-red-500">{errors.phone?.message}</p>
                                </div>
                                <div className=" mb-4">
                                    <label htmlFor="password" className="leading-7 text-base font-sans">Password:<span className="  text-red-600 text-lg">*</span></label>
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
                                                message: "Password cannot exceed more than 10 characters",
                                            },
                                        })}
                                        onChange={onChange} />
                                    <p className="text-sm text-red-500">{errors.password?.message}</p>
                                </div>
                                <button className="text-white bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-500 rounded text-lg">Register</button>
                            </form>
                            <p className="my-7 flex align-middle items-center justify-between" >
                                <span className='border-b-2 border-gray-300 w-2/5 '></span>OR
                                <span className=' w-2/5 border-b-2 border-gray-300'></span>
                            </p>

                            <div className="row flex justify-center">
                                <div className="col-sm-2 mx-1 w-60 ">
                                    <div className="p-3 border-none">
                                        <div className="p-1 border-2 rounded hover:shadow-md " style={{ backgroundColor: "#dd4b39" }}>
                                            <Link onClick={clickHandlerGoogleLogin} className="btn btn-block btn-social btn-google text-white flex" to="/auth/google"
                                                role="button">
                                                <i className="fa-brands fa-google my-auto text-2xl pr-2"></i>
                                                <p className=" py-1">Sign Up with Google</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="col-sm-2 mx-1 w-60 ">
                                    <div className="p-3  border-none">
                                        <div className="p-1 border-2 rounded" style={{ backgroundColor: "#3b5998" }}>
                                            <Link className="btn btn-block btn-social btn-google text-white flex " to="/auth/facebook"
                                                role="button">
                                                <i className="fa-brands fa-facebook my-auto text-2xl pr-2"></i>
                                                <p className="py-1">Sign Up with Facebook</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div> */}
                            </div>


                            {/* <div className="mx-auto text-lg">
                                <GoogleOAuthProvider clientId="773695330225-rj3orcufnett9df8hmenhkihptib1ogd.apps.googleusercontent.com" >
                                    <div className="mx-auto text-lg">
                                        <GoogleLogin
                                            onSuccess={async (credentialResponse) => {
                                                const decode = jwt_decode(credentialResponse.credential);
                                                    
                                                let name = decode.name;
                                                let gmail = decode.email;
                                                // console.log(name, gmail);

                                                let data = await fetch(
                                                    "http://localhost:5000/google-check",
                                                    {
                                                        method: "post",
                                                        body: JSON.stringify({
                                                            username: name,
                                                            email: gmail,
                                                        }),
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        },
                                                    }
                                                );

                                                // console.log("result :", data);
                                                data = await data.json();
                                                if (!data) {
                                                    data = await fetch("http://localhost:5000/google-login", {
                                                        method: "post",
                                                        body: JSON.stringify({
                                                            username: name,
                                                            email: gmail,
                                                            image: "avtar.png",
                                                        }),
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        },
                                                    });

                                                    data = await data.json();
                                                }
                                                // console.log(data);
                                                if (data.token) {
                                                    localStorage.setItem("user", JSON.stringify(data.result));
                                                    localStorage.setItem("token", JSON.stringify(data.token));
                                                    navigate("/");
                                                }
                                            }}
                                            onError={() => {
                                                console.log("Login Failed");
                                            }}
                                        />
                                    </div>
                                </GoogleOAuthProvider>
                            </div> */}
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
        </>
    )
}

export default Signup
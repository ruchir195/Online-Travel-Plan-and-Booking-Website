import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";



const Navbar = () => {
    const navigate = useNavigate();
    let [open, setOpen] = useState(false);

    
    const username = localStorage.getItem("name");

    const handleLogout = () => {
        localStorage.removeItem("tocken");
        navigate("/login")
    }

    return (
        <div className='shadow-md w-full   top-0 left-0 z-50 sticky' >
            <div className='md:flex items-center justify-between bg-black py-4 md:px-10 px-7'>
                <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
        text-gray-800'><span className=' text-yellow-400'>Tra</span><span className=' text-white'>vel</span>
                </div>

                <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-4 cursor-pointer md:hidden'>
                    <i className={`fa-solid fa-${open ? 'xmark' : 'bars'}`}></i>
                </div>

                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static text-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>

                    <li className='md:ml-8 text-xl md:my-0 my-7'>
                        <Link to="/home" className={`text-white  hover:text-orange-400  transition-all duration-500 `}>Home</Link>
                    </li>
                    <li className='md:ml-8 text-xl md:my-0 my-7'>
                        <Link to="/about" className={` text-white hover:text-orange-400 duration-500`}>About</Link>
                    </li>
                    <li className='md:ml-8 text-xl md:my-0 my-7'>
                        <Link to="/contact" className={`  text-white hover:text-orange-400 duration-500`}>Contact</Link>
                    </li>
                    <li className='md:ml-8 text-xl md:my-0 my-7'>
                        <Link to="/eventform" className={`  text-white hover:text-orange-400 duration-500`}>eventForm</Link>
                    </li>
                    <li className='md:ml-8 text-xl md:my-0 my-7'>
                        <Link to="/placeform" className={`  text-white hover:text-orange-400 duration-500`}>placeForm</Link>
                    </li>
                    <li className='md:ml-8 text-xl md:my-0 my-7'>
                        <Link to="/event" className={`  text-white hover:text-orange-400 duration-500`}>Event</Link>
                    </li>

                    {!localStorage.getItem('tocken') ? <form>
                        {/* <li className='md:ml-8 text-xl md:my-0 my-7'>
                            <Link to="/register" className={`text-gray-800  hover:text-gray-400 duration-500`}>Signup</Link>
                        </li> */}
                        <li className='md:ml-8 text-xl md:my-0 my-7'>
                            <Link to="/login" className='text-white hover:text-yellow-400 duration-500'><i className="fa-solid fa-user pr-3"></i>login</Link>
                        </li>
                    </form> : <button className='text-yellow-400 hover:text-white text-xl pl-5 duration-500' onClick={handleLogout}>Logout ({username})</button>}
                </ul>
            </div>
        </div>
    )
}

export default Navbar
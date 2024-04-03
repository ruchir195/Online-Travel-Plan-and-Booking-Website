import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";



const Navbar = () => {
    const navigate = useNavigate();
    let [open, setOpen] = useState(false);



    const handleLogout = () => {
        localStorage.removeItem("tocken");
        localStorage.removeItem("username");
        localStorage.removeItem("user");
        localStorage.clear();

        navigate("/login")
    }

    return (
        <div className='shadow-md w-full   top-0 left-0 z-50 sticky' >
            <div className='md:flex items-center justify-between bg-black py-4 md:px-10 px-7'>
                <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
        text-gray-800'><span className=' text-indigo-400'>Tra</span><span className=' text-white'>vel</span>
                </div>

                <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-4 cursor-pointer md:hidden'>
                    <i className={`fa-solid fa-${open ? 'xmark' : 'bars'} text-white`}></i>
                </div>

                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static text-black bg-black md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-10 ' : 'top-[-490px]'}`}>

                    <li className='md:ml-8 text-xl md:my-0 my-7'>
                        <Link to="/home" className={`text-white  hover:text-indigo-400  transition-all duration-500 `}>Home</Link>
                    </li>
                    <li className='md:ml-8 text-xl md:my-0 my-7'>
                        <Link to="/about" className={` text-white hover:text-indigo-400 duration-500`}>About</Link>
                    </li>
                    <li className='md:ml-8 text-xl md:my-0 my-7'>
                        <Link to="/contact" className={`  text-white hover:text-indigo-400 duration-500`}>Contact</Link>
                    </li>
                   
                    <li className='md:ml-8 text-xl md:my-0 my-7'>
                        <Link to="/event" className={`  text-white hover:text-indigo-400 duration-500`}>Event</Link>
                    </li>

                    {localStorage.getItem('user') === '65e60102114e32bdb7693318' ? <li className='md:ml-8 text-xl md:my-0 my-7'>
                        <Link to="/admin" className={`  text-white hover:text-indigo-400 duration-500`}>Admin</Link>
                    </li> : ""}

                    {!localStorage.getItem('tocken') ? <form>
                        {/* <li className='md:ml-8 text-xl md:my-0 my-7'>
                            <Link to="/register" className={`text-gray-800  hover:text-gray-400 duration-500`}>Signup</Link>
                        </li> */}
                        <li className='md:ml-8 text-xl md:my-0 my-7'>
                            <Link to="/login" className='text-white hover:text-indigo-400 duration-500'><i className="fa-solid fa-user pr-3"></i>login</Link>
                        </li>
                    </form> :
                        <li className='md:ml-8 text-xl md:my-0 my-7'>
                            <button className='text-indigo-400 hover:text-white text-xl  duration-500' onClick={handleLogout}>Logout ({localStorage.getItem("username")})</button>
                        </li>}
                </ul>
            </div>
        </div>
    )
}

export default Navbar
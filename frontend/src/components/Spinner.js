import React from 'react'
import Loader from "../loader.gif"

const Spinner = () => {
  return (
    <div className='text-center  justify-center mx-auto items-center align-middle'>
      <img className='text-center py-20 justify-center mx-auto items-center align-middle' src={Loader} alt="" />
    </div>
  )
}

export default Spinner
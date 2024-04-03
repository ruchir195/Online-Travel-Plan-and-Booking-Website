import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CustomerDetails = () => {

  const numAdults = localStorage.getItem("adults");
  const numChildren = localStorage.getItem("children")
  const numSenior = localStorage.getItem("senior")
  const [numFormsShown, setNumFormsShown] = useState(numAdults + numChildren);
  const navigate = useNavigate();
  const [BookButtonDisabled, setBookButtonDisabled] = useState(false);


  // const handleAddAdultClick = () => {
  //   if (numFormsShown < numAdults + numChildren + numSenior) {
  //     setNumFormsShown(numFormsShown + 1);
  //     updateBookButtonState();
  //   }
  // };







  const [formData, setFormData] = useState({
    adults: [],
    children: [],
    seniors: [],
    city: '',
    state: ''
  });



  // Function to handle changes in adult traveler form
  const handleAdultChange = (index, field, value) => {
    const updatedAdults = [...formData.adults];
    // Check if the adult object at the given index exists
    if (!updatedAdults[index]) {
      updatedAdults[index] = {}; // Initialize the object if it doesn't exist
    }
    // setBookButtonDisabled(true);
    updatedAdults[index][field] = value;
    setFormData({ ...formData, adults: updatedAdults });

  };

  // Function to handle changes in child traveler form
  const handleChildChange = (index, field, value) => {
    const updatedChildren = [...formData.children];
    // Check if the adult object at the given index exists
    if (!updatedChildren[index]) {
      updatedChildren[index] = {}; // Initialize the object if it doesn't exist
    }
    // setBookButtonDisabled(true);
    updatedChildren[index][field] = value;
    setFormData({ ...formData, children: updatedChildren });

  };

  // Function to handle changes in senior traveler form
  // const handleSeniorChange = (index, field, value) => {
  //   const updatedSeniors = [...formData.seniors];
  //   if (!updatedSeniors[index]) {
  //     updatedSeniors[index] = {}; // Initialize the object if it doesn't exist
  //   }
  //   updatedSeniors[index][field] = value;
  //   setFormData({ ...formData, seniors: updatedSeniors });
  // };

  const [city, setCity] = useState('');

  const handleCityStateChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setCity(value);
    updateBookButtonState();
  };


  const renderAdultTravelerForm = (index) => {
    return (
      <div key={`adult_${index}`}>
        <div>
          <h3 className='pt-10 text-lg text-black'>Adult {index + 1}</h3>

          <div className='py-3 '>
            <div className="relative mb-4">
              <label htmlFor={`name_adult_${index}`} className="leading-7 text-sm text-gray-600">First Name</label>
              <input type="text" id={`name_adult_${index}`} name={`name_adult_${index}`} onChange={(e) => handleAdultChange(index, 'name', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
            </div>
            <div className="relative mb-4">
              <label htmlFor={`lname_adult_${index}`} className="leading-7 text-sm text-gray-600">Last Name</label>
              <input type="text" id={`lname_adult_${index}`} name={`lname_adult_${index}`} onChange={(e) => handleAdultChange(index, 'lname', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
            </div>

            <div className="relative mb-4">
              <label htmlFor={`dob_adult_${index}`} className="leading-7 text-sm text-gray-600">Date of birth</label>
              <input type="date" id={`dob_adult_${index}`} name={`dob_adult_${index}`} onChange={(e) => handleAdultChange(index, 'dob', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" min="1970-01-01"
                max="2006-01-01" required />
            </div>

            {index === 0 && (
              <>
                <div className="relative mb-4">
                  <label htmlFor={`gender_adult_${index}`} className="leading-7 text-sm pr-5 text-gray-600">Gender</label>
                  <div>
                    <input type="radio" id={`gender_adult_${index}`} name={`gender_adult_${index}`} value={"male"} onChange={(e) => handleAdultChange(index, 'gender', e.target.value)} className="px-5 mx-2 py-3 checked" checked />Male
                  </div>
                  <div>
                    <input type="radio" id={`gender_adult_${index}`} name={`gender_adult_${index}`} value={"female"} onChange={(e) => handleAdultChange(index, 'gender', e.target.value)} className="px-5 mx-2 pb-3" />Female
                  </div>
                </div>

                <div className="relative mb-4">
                  <label htmlFor={`email_adult_${index}`} className="leading-7 text-sm text-gray-600">Email</label>
                  <input type="email" id={`email_adult_${index}`} name={`email_adult_${index}`} onChange={(e) => handleAdultChange(index, 'email', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                </div>
                <div className="relative mb-4">
                  <label htmlFor={`mobile_adult_${index}`} className="leading-7 text-sm text-gray-600">Mobile No.</label>
                  <input type="text" id={`mobile_adult_${index}`} name={`mobile_adult_${index}`} onChange={(e) => handleAdultChange(index, 'mobile', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                </div>
                <div className="relative mb-4">
                  <label htmlFor={`adharno_adult_${index}`} className="leading-7 text-sm text-gray-600">Adhar No.</label>
                  <input type="text" id={`adharno_adult_${index}`} name={`adharno_adult_${index}`} onChange={(e) => handleAdultChange(index, 'adharNo', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                </div>
                <div className="relative mb-4">
                  <label htmlFor={`address_adult_${index}`} className="leading-7 text-sm text-gray-600">Address </label>
                  <input type="text" id={`address_adult_${index}`} name={`address_adult_${index}`} onChange={(e) => handleAdultChange(index, 'address', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                </div>
                <div className="relative mb-4">
                  <label for="city" className="leading-7 text-sm text-gray-600">City</label>
                  <input type="text" id="city" name="city" onChange={(e) => handleCityStateChange('city', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                </div>

              </>
            )}
          </div>
        </div>
      </div>
    );
  };


  const renderChildTravelerForm = (index) => {
    return (
      <div key={`child_${index}`}>
        <div >
          <h3 className='pt-10 text-lg text-black'>Child {index + 1}</h3>

          {/* Add additional fields for child travelers */}
          <div className="relative mb-4">
            <label htmlFor={`name_child_${index}`} className="leading-7 text-sm text-gray-600">First Name</label>
            <input type="text" id={`name_child_${index}`} name={`name_child_${index}`} onChange={(e) => handleChildChange(index, 'name', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
          </div>
          <div className="relative mb-4">
            <label htmlFor={`lname_child_${index}`} className="leading-7 text-sm text-gray-600">Last Name</label>
            <input type="text" id={`lname_child_${index}`} name={`lname_child_${index}`} onChange={(e) => handleChildChange(index, 'lname', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
          </div>

          <div className="relative mb-4">
            <label htmlFor={`dob_adult_${index}`} className="leading-7 text-sm text-gray-600">Date of birth</label>
            <input type="date" id={`dob_adult_${index}`} name={`dob_adult_${index}`} onChange={(e) => handleChildChange(index, 'dob', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" min="2006-01-01"
              max="2015-01-01" required />
          </div>

          {/* <div className="relative mb-4">
            <label htmlFor={`gender_adult_${index}`} className="leading-7 text-sm pr-5 text-gray-600">Gender</label>
            <div>
              <input type="radio" id={`gender_adult_${index}`} name={`gender_adult_${index}`} onChange={(e) => handleChildChange(index, 'gender', e.target.value)} value={"male"} className="px-5 mx-2 py-3 checked" checked />Male
            </div>
            <div>
              <input type="radio" id={`gender_adult_${index}`} name={`gender_adult_${index}`} onChange={(e) => handleChildChange(index, 'gender', e.target.value)} value={"female"} className="px-5 mx-2 pb-3" />Female
            </div>
          </div>

          <div className="relative mb-4">
            <label htmlFor={`email_child_${index}`} className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id={`email_child_${index}`} name={`email_child_${index}`} onChange={(e) => handleChildChange(index, 'email', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor={`mobile_child_${index}`} className="leading-7 text-sm text-gray-600">Mobile No.</label>
            <input type="text" id={`mobile_child_${index}`} name={`mobile_child_${index}`} onChange={(e) => handleChildChange(index, 'mobile', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor={`adharno_child_${index}`} className="leading-7 text-sm text-gray-600">Adhar No.</label>
            <input type="text" id={`adhar_child_${index}`} name={`adhar_child_${index}`} onChange={(e) => handleChildChange(index, 'adharNo', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor={`address_child_${index}`} className="leading-7 text-sm text-gray-600">Address </label>
            <input type="text" id={`address_child_${index}`} name={`address_child_${index}`} onChange={(e) => handleChildChange(index, 'address', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div> */}
        </div>
      </div>
    );
  };


  useEffect(() => {
    // Calculate the total number of forms to be shown
    const totalForms = parseInt(numAdults) + parseInt(numChildren) ;
    // Set the numFormsShown state to the total number of forms
    setNumFormsShown(totalForms);
  }, []); // This effect runs only once when the component mounts
  

  // const renderSeniorTravelerForm = (index) => {
  //   return (
  //     <div key={`senior_${index}`}>
  //       <div >
  //         <h3 className='pt-10 text-lg text-black'>Senior {index + 1}</h3>

  //         <div className='py-3 '>
  //           <div className="relative mb-4">
  //             <label htmlFor={`name_senior_${index}`} className="leading-7 text-sm text-gray-600">First Name</label>
  //             <input type="text" id={`name_senior_${index}`} name={`name_senior_${index}`} onChange={(e) => handleSeniorChange(index, 'name', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
  //           </div>
  //           <div className="relative mb-4">
  //             <label htmlFor={`lname_senior_${index}`} className="leading-7 text-sm text-gray-600">Last Name</label>
  //             <input type="text" id={`lname_senior_${index}`} name={`lname_senior_${index}`} onChange={(e) => handleSeniorChange(index, 'lname', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
  //           </div>

  //           <div className="relative mb-4">
  //             <label htmlFor={`dob_senior_${index}`} className="leading-7 text-sm text-gray-600">Date of birth</label>
  //             <input type="date" id={`dob_senior_${index}`} name={`dob_senior_${index}`} onChange={(e) => handleSeniorChange(index, 'dob', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
  //           </div>

  //           <div className="relative mb-4">
  //             <label htmlFor={`gender_senior_${index}`} className="leading-7 text-sm pr-5 text-gray-600">Gender</label>
  //             <div>
  //               <input type="radio" id={`gender_senior_${index}`} name={`gender_senior_${index}`} value={"male"} onChange={(e) => handleSeniorChange(index, 'gender', e.target.value)} className="px-5 mx-2 py-3 checked" checked />Male
  //             </div>
  //             <div>
  //               <input type="radio" id={`gender_senior_${index}`} name={`gender_senior_${index}`} value={"female"} onChange={(e) => handleSeniorChange(index, 'gender', e.target.value)} className="px-5 mx-2 pb-3" />Female
  //             </div>
  //           </div>

  //           <div className="relative mb-4">
  //             <label htmlFor={`email_senior_${index}`} className="leading-7 text-sm text-gray-600">Email</label>
  //             <input type="email" id={`email_senior_${index}`} name={`email_senior_${index}`} onChange={(e) => handleSeniorChange(index, 'email', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
  //           </div>
  //           <div className="relative mb-4">
  //             <label htmlFor={`mobile_senior_${index}`} className="leading-7 text-sm text-gray-600">Mobile No.</label>
  //             <input type="text" id={`mobile_senior_${index}`} name={`mobile_senior_${index}`} onChange={(e) => handleSeniorChange(index, 'mobile', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
  //           </div>
  //           <div className="relative mb-4">
  //             <label htmlFor={`adharno_senior_${index}`} className="leading-7 text-sm text-gray-600">Adhar No.</label>
  //             <input type="text" id={`adharno_senior_${index}`} name={`adharno_senior_${index}`} onChange={(e) => handleSeniorChange(index, 'adharNo', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
  //           </div>
  //           <div className="relative mb-4">
  //             <label htmlFor={`address_senior_${index}`} className="leading-7 text-sm text-gray-600">Address </label>
  //             <input type="text" id={`address_senior_${index}`} name={`address_senior_${index}`} onChange={(e) => handleSeniorChange(index, 'address', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
  //           </div>
  //         </div>
  //       </div>

  //     </div>
  //   );
  // };

  const renderTravelerForms = () => {
    let travelerForms = [];
    let adultCount = 0;
    let childCount = 0;
    let seniorCount = 0;
    for (let i = 0; i < numFormsShown; i++) {
      if (adultCount < numAdults) {
        travelerForms.push(renderAdultTravelerForm(adultCount));
        adultCount++;
      } else if (childCount < numChildren) {
        travelerForms.push(renderChildTravelerForm(childCount));
        childCount++;
      }
      //  else if (seniorCount < numSenior) {
      //   travelerForms.push(renderSeniorTravelerForm(seniorCount));
      //   seniorCount++;
      // }
    }
    return travelerForms;
  };



  const updateBookButtonState = () => {
    if (numFormsShown > 0) {
      setBookButtonDisabled(false);
    } else {
      setBookButtonDisabled(true);
    }
  };



  const allTravelerFormsFilled = () => {
    // Iterate over adult traveler forms
    for (let adult of formData.adults) {
      // Check if any required field is empty
      if (!adult.name || !adult.lname || !adult.dob) {
        return false;
      }
    }
  
    // Iterate over child traveler forms
    for (let child of formData.children) {
      // Check if any required field is empty
      if (!child.name || !child.lname || !child.dob) {
        return false;
      }
    }

    // All required fields are filled for all traveler forms
    return true;
  };
  






  const saveFormDataToLocal = (e) => {
    e.preventDefault();
    // if (numFormsShown >= (numAdults + numChildren + numSenior)) {
    localStorage.setItem('travelerFormData', JSON.stringify(formData));
    // Navigate to the next page
    // setBookButtonDisabled(false);
    
    // }
    // setBookButtonDisabled(true);



    if (city !== '' &&  allTravelerFormsFilled()) {
      // All required fields are filled, navigate to another page or perform other actions
      console.log('Form submitted successfully');
      navigate("/ReviewUserDetailsForm");
    } else {
      // Display an error message or handle the case when required fields are not filled
      console.log('Please fill out all required fields');
    }
  };


  



  const addButtonDisabled = numFormsShown >= numAdults + numChildren + numSenior;

  return (
    <div>
      <div className="text-gray-600 body-font">
        <div className="container px-5 pt-24 mx-auto  flex flex-wrap flex-col">
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium title-font  text-gray-900">Checkout</h1>
          </div>
          <div className="flex my-1">
            <div className="w-24 h-1 rounded-full bg-indigo-500 inline-flex"></div>
          </div>

          {/* <div className="flex mx-40   flex-wrap my-10 ">
            <a className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none border-indigo-400 tracking-wider rounded-t">
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
            <a className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider">
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 mx-2 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">4</div>Billing Details
            </a>

            <a className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider">
              <div className="flex-shrink-0 w-7 h-7 rounded-full mt-10 sm:mt-0 mx-2 inline-flex items-center justify-center text-indigo-500 bg-indigo-50  relative z-10 title-font font-medium text-sm">5</div>Payment
            </a>
          </div> */}

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
            <a className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider">
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 mx-2 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm">4</div>User Details
            </a>
            <a className="sm:px-6 py-3  sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider">
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 mx-2 inline-flex items-center justify-center text-indigo-500 bg-indigo-50 relative z-10 title-font font-medium text-sm">5</div>Review
            </a>

            <a className="sm:px-6 py-3  sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider">
              <div className="flex-shrink-0 w-7 h-7 rounded-full mt-10 sm:mt-0 mx-2 inline-flex items-center justify-center text-indigo-500 bg-indigo-50  relative z-10 title-font font-medium text-sm">6</div>Payment
            </a>
          </div>
        </div>
      </div>


      <div className="text-gray-600 body-font relative">
        <div className="container px-5 py-10 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className='flex mx-auto  px-5'>
            <div className="  w-full  bg-white flex flex-col   md:mt-0">
              <div className="flex flex-col">
                <h1 className="text-2xl pb-7 font-medium title-font  text-gray-900">Billing Details</h1>
              </div>

              <form onSubmit={saveFormDataToLocal}>



                <div id="travelerInfo">
                  {renderTravelerForms()}
                </div>


                {/* <div className="flex py-3 justify-center items-center">
                  <span className='border-b-2  flex-grow'></span>
                  <button
                    onClick={handleAddAdultClick}
                    className={`text-white border-0 p-3 rounded-full focus:outline-none text-lg mx-2 ${(addButtonDisabled)

                      ? "bg-indigo-300 hover:bg-indigo-300 cursor-not-allowed"
                      : "bg-indigo-500 hover:bg-indigo-600"
                      }`}
                    disabled={addButtonDisabled}
                  >
                    Add
                  </button>
                  <span className='border-b-2  flex-grow'></span>
                </div> */}

                {/* <div className="relative mb-4">
                  <label for="city" className="leading-7 text-sm text-gray-600">City</label>
                  <input type="text" id="city" name="city" onChange={(e) => handleCityStateChange('city', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                </div> */}
                {/* <div className="relative mb-4">
                <label for="state" className="leading-7 text-sm text-gray-600">State</label>
                <input type="text" id="state" name="state" onChange={(e) => handleCityStateChange('state', e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div> */}

                {/* <div className="flex mt-2  mb-4 items-center">
                <span className="mr-3">Which City to pick up</span>
                <div className="relative">
                  <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                    <option>Baroda</option>
                    <option>Ahmedabad</option>
                    <option>Surat</option>
                    <option>Bharuch</option>
                    <option>Delhi</option>
                    <option>Rajkot</option>
                    <option>Mumbai</option>
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div> */}

                <button disabled={BookButtonDisabled} className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" >Book Now</button>

              </form>
              <p className="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p>
            </div>
            <div className=' px-5  relative'>
              <div className="px-5 w-auto top-0 sticky">
                <div className="w-full flex flex-wrap ">
                  <div className="w-96 lg:pr-10 px-5  mb-6 lg:mb-0">
                    <h1 className="text-gray-900 text-2xl title-font font-medium mb-4">Booking Summary</h1>
                    <div className=' bg-indigo-400 px-5 py-5 text-white '>

                      <div className='py-1 font-bold text-xl'>{localStorage.getItem("placeName")} Trip</div>
                      <div className='py-2'>{localStorage.getItem("startingDate") && (
                        <div>
                          <p>Starting Date: {localStorage.getItem("startingDate")}</p>
                          <p>Ending Date: {localStorage.getItem("EndingDate")}</p>
                          <p>Duration : {localStorage.getItem("Duration")}</p>

                        </div>
                      )}</div>
                    </div>
                    <div className="flex my-4">
                      <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">Travellers</a>
                      <a className=" flex-shrink-0 border-b-2 border-gray-300 py-2 text-lg px-4">Prices</a>
                    </div>

                    <div className="flex  py-2">
                      <span className="text-gray-500">Adults</span>
                      <span className="ml-auto text-gray-900 px-4">{localStorage.getItem("adults") * localStorage.getItem("adultCost")}</span>
                    </div>
                    <div className="flex border-t border-gray-200 py-2">
                      <span className="text-gray-500">Childrens</span>
                      <span className="ml-auto text-gray-900 px-4">{localStorage.getItem("children") * localStorage.getItem("childCost")}</span>
                    </div>
                    {/* <div className="flex border-t border-gray-200 py-2">
                      <span className="text-gray-500">Senior person</span>
                      <span className="ml-auto text-gray-900 px-4">{localStorage.getItem("senior") * localStorage.getItem("seniorCost")}</span>
                    </div> */}
                    <div className="flex border-t-2 my-3  border-indigo-400 py-2">
                      <span className="text-gray-500 py-1">Toal Cost:</span>
                      <span className="title-font ml-auto px-4 py-1 font-medium text-2xl text-gray-900">Rs. {localStorage.getItem("totalCost")}</span>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CustomerDetails
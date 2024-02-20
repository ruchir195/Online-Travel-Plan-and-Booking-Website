import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../components/placecss.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';

const Place = () => {

  const [places, setplaces] = useState([]); // Initialize state with an empty array
  const { placeName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const host = "http://localhost:5000";
        const response = await fetch(`${host}/api/place/placeDetails/${placeName}`, {
          method: "GET",

        });
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data1 = await response.json();
        console.log("Data fetched:", data1); // Log the fetched data to inspect its format
        setplaces(data1); // Once the data is fetched, set it to the state variable
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function to fetch data when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once, equivalent to componentDidMount

  console.log("Places:", places); // Log the events array just before the return statement


  let index = 0;
  function myFunction(index) {
    var dots = document.getElementById("dots" + index);
    var moreText = document.getElementById("more" + index);
    var btnText = document.getElementById("myBtn" + index);

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";

    }
  }



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <div className="container-lg">
        {places.placeData ? (
          <div className="img_width">
            <img className=" w-full object-cover object-center" src={require(`../ImagesUpload/${places.placeData.img2Name}`)} alt="blog" style={{ height: "550px" }} />
            <div className="container mb-5 py-20 mx-auto">
              <div className="placeImgCont">
                <div className="mx-5 mt-5 mb-5">
                  <div id="carouselExampleFade" className="carousel slide carousel-fade placeCarouse"
                    data-bs-ride="carousel">
                    <Slider {...settings}>
                      <div className=" h-full">
                        <img
                          src={require(`../ImagesUpload/${places.placeData.img3Name}`)}
                          alt="Slide 1"
                          className="w-full object-cover object-center"
                          style={{ height: "450px" }}
                        />
                      </div>
                      <div className="flex items-center justify-center h-full">
                        <img
                          src={require(`../ImagesUpload/${places.placeData.img4Name}`)}
                          alt="Slide 2"
                          className="w-full object-cover object-centerl"
                          style={{ height: "450px" }}
                        />
                      </div>
                      <div className="w-full">
                        <img
                          src={require(`../ImagesUpload/${places.placeData.img5Name}`)}
                          alt="Slide 3"
                          className="w-full object-cover object-center"
                          style={{ height: "450px" }}
                        />
                      </div>
                    </Slider>
                  </div>
                </div>

                <div className="my-5 py-5 px-8 card mx-16 w-full">
                  <div className="card-body">
                    <h5 className="card-title text-2xl"><b>

                      {places.placeName}

                    </b></h5>
                    {/* Assuming places.placeData is an array */}
                    <p className='py-3'>
                      {places.placeData.placeContent.slice(0, 600)}
                      <span className="dots" id={`dots${index}`}>...</span>
                      <span className="more" id={`more${index}`}>
                        {places.placeData.placeContent.slice(600, places.placeData.placeContent.length)}
                      </span>
                      <button onClick={() => myFunction(index)} className="myBtn text-orange-600 hover:text-oreange-700" id={`myBtn${index}`}>
                        Read more
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              <div className="booking">
                <div className="hotel_left mx-5 py-14">
                  <h3 className=' text-xl pb-5'>
                    {places.placeData.greeting}
                  </h3>
                  <div className="hotel_icon   my-3">
                    <div className="icon_first"><i className="fa-solid fa-calendar-week"></i>
                      <div className="detail">
                        <h4>Duration</h4>
                        <p>

                          {places.placeData.duration}

                        </p>
                      </div>
                    </div>
                    <div className="icon_second mx-4 px-3"><i className="fa-solid fa-people-group"></i>
                      <div className="detail">
                        <h4>Age-group</h4>
                        <p>

                          {places.placeData.age}
                        </p>
                      </div>
                    </div>
                    <div className="icon_third mx-4 pr-3"><i className="fa-solid fa-clock"></i>
                      <div className="detail">
                        <h4>Time</h4>
                        <p>10:00-7:00</p>
                      </div>
                    </div>
                  </div>
                  <div className=" icon_third hotel_left">
                    <i className="fa-solid fa-hotel text-2xl fs-2 mt-2" style={{ color: "#de5824" }}></i>
                    <div className="detail">
                      <h4 style={{ color: "black" }}>

                        {places.placeData.hotelName}

                      </h4><span>
                        {places.placeData.hotelRating}
                      </span>
                      {/* {places.placeData.hotelRating.length} star) */}
                      <p>
                        {places.placeData.area}
                      </p>
                    </div>
                  </div>

                  <div className="about my-5 ">
                    <h3 className='text-xl'>About Room</h3>
                    <p>All our Rooms are e elegantly furnished with handmade furniture include luxury
                      en-suite
                      facilities with complimentary amenities pack, flat screen LCD TV, tea/coffee making
                      facilities,
                      fan, hairdryer and the finest pure white linen and towels.</p>
                  </div>
                </div>

                <div className="card mx-7 priceCard my-14 px-7 py-5" style={{ width: "25rem" }}>
                  <div className="card-body">

                    <p><i className="fa-solid fa-indian-rupee-sign heading_icon"></i>&nbsp;
                      <strong className="price">
                        {places.placeData.price}

                      </strong>
                      /Person
                    </p>
                    <hr />
                    <p style={{ marginleft: "15px" }}>Service</p>
                    <div className="ser_icon">

                      <div className="s1">Dinner</div>
                      <div className="s2">Medical</div>
                      <div className="s3">Gym</div>
                      <div className="s4">Garden</div>
                      <div className="s5">Parking Area</div>
                      <div className="s6">Sports Area</div>
                    </div>
                    <button type="submit" className="btn btn-primary btn_book bg-orange-400 hover:bg-orange-500 text-white px-8 rounded py-2">BOOKING</button>

                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <span className=' justify-center mx-auto items-center align-middle'><Spinner /></span>
        )}
      </div>
    </div>
  )
}

export default Place
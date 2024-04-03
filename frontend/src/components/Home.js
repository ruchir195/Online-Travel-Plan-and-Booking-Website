import React, { useState, useEffect } from 'react'
import StarRatingInput from "../components/StarRatingInput"

function Home() {


  const [modal1Open, setModal1Open] = useState(false);

  const openModal = () => {
    // localStorage.setItem("propertyFor", propertyFor);
    setModal1Open(true);
  };

  const onlycloseModal1 = () => {
    setModal1Open(false);
  };



  const [comment, setComment] = useState({ userName: "", comment: "", image: "" });

  const clickHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userName', comment.userName);
    formData.append('comment', comment.comment);
    formData.append('image', comment.image);
    formData.append('rating', rating);

    try {
      const host = "http://localhost:5000";
      const response = await fetch(`${host}/api/admin/comment`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        // Reset the form after successful submission
        setComment({ userName: "", comment: "", image: "" });
        setRating(0)
        onlycloseModal1();
        alert("Comment submitted successfully!");
      } else {
        throw new Error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error.message);
      alert("Failed to submit comment. Please try again later.");
    }
  };

  const onChange = (e) => {
    const { name, value, files } = e.target;
    setComment((prevComment) => ({
      ...prevComment,
      [name]: files ? files[0] : value,
    }));
  };




  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        const host = "http://localhost:5000";
        const response = await fetch(`${host}/api/home/getComment`, {
          method: "GET"
        });

        if (!response.ok) {
          throw new Error("Failed to fetch comment data");
        }

        const commentData = await response.json();
        console.log(commentData);
        setCommentData(commentData.commentData);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchCommentData();
  }, []);


  const [expandedCommentIndex, setExpandedCommentIndex] = useState(-1);

  const toggleExpand = (index) => {
    setExpandedCommentIndex(expandedCommentIndex === index ? -1 : index);
  };


  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };



  const getStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled text-yellow-500' : 'empty'}`}>
          ★
        </span>
      );
    }
    return stars;
  };



  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="flex w-full pt-10 container px-28">
          <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900 border-b-4 border-indigo-500">Comment Section</h1>


        </div>
        <div className="container px-5 py-24 mx-auto  ">
          {/* <div className="flex flex-wrap -m-4">
          {commentData && commentData.map((comment, index) => (
            <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src={comment.image  ? require(`../ImagesUpload/${comment.imageName}`)  : "../images/userLogo-2.png"} />
                <p className="leading-relaxed">{comment.comment}</p>
                <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-lg">{comment.userName}</h2>

              </div>
            </div>
          ))}  
              
          </div> */}


          <div class="flex flex-wrap -m-4 mt-2 mx-10  whitespace-normal overflow-x-auto overflow-y-hidden">
            {commentData && commentData.map((comment, index) => (
              <div class="lg:w-1/3 lg:mb-0 mb-6 p-4 py-3 text-sm from-neutral-400 border-t-white flex overflow-hidden">
                <img alt="testimonial" className="w-14 h-14 mb-8 object-cover flex object-center rounded-full shadow-lg  border-2 border-gray-200 bg-gray-100" src={comment.image ? require(`../ImagesUpload/${comment.imageName}`) : "../images/userLogo-2.png"} />




                <div>
                  <div className='mx-3 font-semibold text-md text-black'>
                    {comment.userName}
                  </div>
                  <div>
                    <div class="mx-3 text-lg">
                      <span>
                      {/* {getStars()} */}⭐⭐⭐⭐⭐
                      </span>
                    </div>
                  </div>
                  <div className="my-2 mx-3 text-md from-neutral-800 border-t-2 border-neutral-300 inline-block overflow-hidden">
                    <p className="py-2">
                      {expandedCommentIndex === index ? comment.comment : `${comment.comment.slice(0, 250)}...`}
                      {comment.comment.length > 250 && (
                        <button
                          onClick={() => toggleExpand(index)}
                          className="text-indigo-500 hover:text-indigo-700 focus:outline-none"
                        >
                          {expandedCommentIndex === index ? 'Read Less' : 'Read More'}
                        </button>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>


          <div className="flex justify-center py-10">
            <button onClick={openModal} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add comment</button>
          </div>


          {modal1Open && (
            <div>
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white  rounded-lg w-1/2">
                  <div className="mb-4 py-2  flex bg-indigo-400 rounded">
                    <span className="text-2xl text-white flex px-6  font-medium flex-grow">
                      Comment

                    </span>
                    <button
                      onClick={onlycloseModal1}
                      className="text-white font-bold text-xl px-3"
                    >
                      ✕
                    </button>

                  </div>




                  <div className="modal-body">
                    <div className="container mt-3 px-10">

                      <form onSubmit={clickHandler}>
                        <div className="relative mb-4">
                          <label htmlFor="image" className="leading-7 text-sm text-black">Image:</label>
                          <input
                            type="file"
                            id="image"
                            name="image"
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            onChange={onChange} />
                        </div>


                        <div className="relative mb-4 container ">
                          <label htmlFor="userName" className="leading-7 text-sm text-black ">Name:</label>
                          <input
                            type="text"
                            id="userName"
                            name="userName"
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            placeholder="e.g. ruchir"
                            required
                            onChange={onChange}
                            value={comment.userName}
                          />
                        </div>

                        {/* <div>
                          <h1>Star Rating Input</h1>
                          <StarRatingInput value={rating} onChange={handleRatingChange} />
                          <p>Selected rating: {rating}</p>
                        </div> */}



                        <div className="relative ">
                          <label htmlFor="comment" className="leading-7 text-sm text-black ">Add Comment :</label>
                        </div>
                        <textarea
                          className='mb-4 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 resize-none'
                          name="comment"
                          id="comment"
                          cols="90"
                          rows="8"
                          required
                          onChange={onChange}
                          value={comment.comment}
                        >
                        </textarea>

                        <div>
                          <button className={`text-white bg-indigo-500 border-0  mb-3 py-2 px-10 focus:outline-none hover:bg-indigo-700 rounded text-lg `}  >Submit</button>
                        </div>

                      </form>





                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
import React, { useState,useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import DebaterService from '../../../service/moderatorService';
import PostService from '../../../service/postService';
import postService from "../../../service/postService";



  
function ReportedPosts(){
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState([]);
    const [isclicked,setisclicked] = useState(false)
    const [showModal,setShowModal] = useState(false)
    const [deletedPost,setdeletedPost]=useState("")

    const [filteredResponses, setFilteredResponses] = useState([]);

  const filterByDateRange = (startDate, endDate) => {
    const filtered = user.filter((item) => {
      const itemDate = new Date(item.createdAt);
      const itemDateOnly = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());
      const startDateOnly = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
      const endDateOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
      return itemDateOnly >= startDateOnly && itemDateOnly <= endDateOnly;
    });
    setFilteredResponses(filtered);
  };


  const handleYesterdayFilter = () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      filterByDateRange(yesterday, today);
    };

  const handleTodayFilter = () => {
    const today = new Date();
    console.log(today)
    filterByDateRange(today, today);
  };

    const handle7DaysAgoFilter = () => {
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      filterByDateRange(sevenDaysAgo, today);
    };

  const handle30DaysAgoFilter = () => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    filterByDateRange(thirtyDaysAgo, today);
  };




    const filteredUsernames = user.filter((item) =>
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

   
    useEffect(() => {
      try {
        postService.getAllReportedPosts().then(
            (response) => {
                // check for token and user already exists with 200
                //   console.log("Sign up successfully", response);
        //    console.log(response.userArr)
            console.log(response.reportArr)
            setUser(response.reportArr)


            },
            (error) => {
                console.log(error);
            }
        );
    } catch (err) {
        console.log(err);
    }

  }, [isclicked])
  

  const handleDelete = async (id) => {

    try {
      await PostService.deletePost(id).then(
        (response) => {
          setisclicked(!isclicked)
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  

 
   
      
      
return(
    
    <div className="flex flex-col items-center dark:bg-zinc-900">
    <div className="w-full max-w-md ">
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Search usernames"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <button className="text-white bg-gradient-to-r from-pink-600 via-pink-600 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={handleTodayFilter}>Today</button>
      <button className="text-white bg-gradient-to-r from-pink-600 via-pink-600 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={handleYesterdayFilter}>Yesterday</button>
      <button className="text-white bg-gradient-to-r from-pink-600 via-pink-600 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={handle7DaysAgoFilter}>7 Days Ago</button>


      <div className="flex flex-col space-y-2 dark:bg-zinc-900">
        {filteredResponses.map((reason) => (
          <div
            key={reason}
            className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md"
          >
            {console.log(reason.text)}
            <p><b>Post context:</b> {reason.postContext}<br/>
              <b>Complainant username:</b> {reason.complainant}<br/>
              <b>Written reason:</b> {reason.text}</p>
            <button onClick={() => {
              setdeletedPost(reason.postId);
              setShowModal(true)
            }} type="button"
                    className="text-white bg-gradient-to-r from-pink-600 via-pink-600 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete
              Post
            </button>
          </div>
        ))}
      </div>
    </div>
    {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Are you sure you want to delete this post ?                  
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {setShowModal(false)}}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {handleDelete(deletedPost);setShowModal(false)}}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    
  </div>
  
  
)};
export default ReportedPosts

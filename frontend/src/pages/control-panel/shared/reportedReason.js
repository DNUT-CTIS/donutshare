import React, { useState,useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import DebaterService from '../../../service/debeterService';
import reasonService from '../../../service/reasonService';



  
function ReportedReason(){
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState([]);
    const [isclicked,setisclicked] = useState(false)
    const [showModal,setShowModal] = useState(false)
    const [deletedUser,setdeletedUser]=useState("")
    const [revokedUser,setrevokedUser]=useState("")
    
    const filteredUsernames = user.filter((item) =>
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

   
    useEffect(() => {
      try {
        reasonService.getallreasons().then(
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

  }, [])
  const handleUnban = (username) => {
    DebaterService.UnBanDebater(username)
    .then((data) => {
      // Success message or perform any other action
      console.log(user)



      console.log(user)
      setisclicked(!isclicked)
      setrevokedUser("")

    })
    .catch((error) => {
      // Error message or perform any other action
    });

  };

 

      const handleDelete = (username) => {
        DebaterService.DeleteDebater(username)
        .then((data) => {
          // Success message or perform any other action
          console.log(user)



          console.log(user)
          setisclicked(!isclicked)
          setdeletedUser("")

        })
        .catch((error) => {
          // Error message or perform any other action
        });

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
      <div className="flex flex-col space-y-2 dark:bg-zinc-900">
        {filteredUsernames.map((reason) => (
          <div
            key={reason}
            className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md"
          >
            {console.log(reason.text)}
            <p>{reason.text}</p>
            
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
                    {revokedUser === "" ?  "Are you sure you want to ban this debater ?": "Are you sure you want to revoke ban of this debater ?" }
                  
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
                    onClick={() => { if(revokedUser === ""){handleDelete(deletedUser);setShowModal(false);} else {handleUnban(revokedUser);setShowModal(false);} }}
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
export default ReportedReason

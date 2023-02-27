import React, { useState,useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import modService from './service/modService';
  
function ModeratorList(){
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState([]);
    const [userName,setUserName] = useState([]);
    const filteredUsernames = user.filter((item) =>
      item.username.toLowerCase().includes(searchTerm.toLowerCase())
      
    );

    const usrArr = []
    
    console.log(userName)
    useEffect(() => {
      try {
        modService.getallusers("moderator").then(
            (response) => {
                // check for token and user already exists with 200
                //   console.log("Sign up successfully", response);
        //    console.log(response.userArr)
            setUser(response.userArr)

            },
            (error) => {
                console.log(error);
            }
        );
    } catch (err) {
        console.log(err);
    }

  }, [])
      const handleDelete = () => {
        // handle add moderator here
      };
      const handleAddModerator = () => {
        // handle add moderator here
      };
      user.map((item) => {
        usrArr.concat(...usrArr, item.username)
      })
      console.log(usrArr)
return(
    <div className="flex flex-col items-center">
    <button
      className="w-full max-w-md p-2 mb-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      onClick={handleAddModerator}
    >
      Add Moderator
    </button>
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
      <div className="flex flex-col space-y-2">
        {user.map((mod) => (
          <div
            key={mod}
            className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md"
          >
            <span>{mod.username}</span>
            <span
              className="text-red-500 cursor-pointer"
              onClick={() => handleDelete(mod)}
            >
            <AiOutlineClose/>
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
)};
export default ModeratorList
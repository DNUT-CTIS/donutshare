import React, { useState,useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import DebaterService from './service/debeterService';

  
function DebaterList(){
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState([]);
    
    const filteredUsernames = user.filter((item) =>
      item.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    useEffect(() => {
      try {
        DebaterService.getallusers("debater").then(
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
        {filteredUsernames.map((debater) => (
          <div
            key={debater}
            className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md"
          >
            <span>{debater.username}</span>
            <span
              className="text-red-500 cursor-pointer"
              onClick={() => handleDelete(debater)}
            >
            <AiOutlineClose/>
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
)};
export default DebaterList
import React, { useState,useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import DebaterService from '../../../service/debeterService';


  
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
   
      const handleDelete = (username) => {
        DebaterService.DeleteDebater(username)
        .then((data) => {
          // Success message or perform any other action
          console.log(user)
  
          
      
          console.log(user)
          
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
        {filteredUsernames.map((debater) => (
          <div
            key={debater}
            className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md"
          >
            {console.log(debater.isBanned)}
           {!debater.isBanned ? (<><p>{debater.username}</p><button onClick={() => handleDelete(debater.username)} type="button" class="text-white bg-gradient-to-r from-pink-600 via-pink-600 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Ban Debater</button></>) :(<><p className='dark:text-red-700 line-through'>{debater.username}</p><button onClick={() => handleDelete(debater.username)} type="button" class="text-white bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Unban Debater</button></>)}
            
              
              
          
              
              
            
          </div>
        ))}
      </div>
    </div>
  </div>
)};
export default DebaterList

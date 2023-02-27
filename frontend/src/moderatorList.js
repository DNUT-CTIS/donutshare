import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const usernames = [
    'john_doe',
    'jane_smith',
    'peter_pan',
    'alice_in_wonderland',
    'bob_the_builder',
    'sally_sparrow',
    'michael_scott',
    'jim_halpert',
    'dwight_schrute',
    'pam_beesly',
    'andy_bernard',
    'angela_martin',
    'kevin_malone',
    'oscar_martinez',
    'meredith_palmer',
    'ryan_howard',
    'kelly_kapoor',
    'toby_flenderson',
    'creed_bratton',
    'stanley_hudson',
    'phyllis_vance',
    'roy_anderson',
    'darryl_philbin',
    'holly_flax',
    'erin_hannon',
  ];
  
function ModeratorList(){
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsernames = usernames.filter((username) =>
      username.toLowerCase().includes(searchTerm.toLowerCase())
    );

   
      const handleDelete = () => {
        // handle add moderator here
      };
      const handleAddModerator = () => {
        // handle add moderator here
      };
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
        {filteredUsernames.map((username) => (
          <div
            key={username}
            className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md"
          >
            <span>{username}</span>
            <span
              className="text-red-500 cursor-pointer"
              onClick={() => handleDelete(username)}
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
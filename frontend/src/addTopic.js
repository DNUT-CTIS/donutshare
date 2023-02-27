import React, { useState } from 'react';

function AddTopic(){
    const [topic, setTopic] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Submitted topic:', topic);
      // Add your logic to handle the submission here
    };
  
    return (
        <div className="flex flex-col items-center justify-start h-screen">
        <h1 className="text-4xl font-bold mt-8 mb-8 block text-gray-900 dark:text-white">Enter Today's Proposition</h1>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <input
                                                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-purple-500"

            type="text"
            placeholder="Type your topic here"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
          />
          <button className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Login

            Submit
          </button>
        </form>
      </div>
    );
  }

export default AddTopic;
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
        <h1 className="text-4xl font-bold mt-8 mb-8">Enter Today's Proposition</h1>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <input
            className="w-full max-w-lg px-4 py-2 border border-gray-400 rounded-lg mb-4"
            type="text"
            placeholder="Type your topic here"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
      </div>
    );
  }

export default AddTopic;
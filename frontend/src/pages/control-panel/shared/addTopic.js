import React, { useState } from 'react';
import topicService from '../../../service/topicService';

function AddTopic(){
    const [topic, setTopic] = useState('');
    const [showModal,setShowModal] = useState(false)
  
    const handleSubmit = (event) => {
      topicService.postTopic(event)
      .then((data) => {
        // Success message or perform any other action
      })
      .catch((error) => {
        // Error message or perform any other action
      });

      console.log('Submitted topic:', topic);
      // Add your logic to handle the submission here
    };

    
//handleSubmit(topic)






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
          <br></br>
          <button onClick={() => setShowModal(true) } className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">

            Submit
          </button>
        </form>
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
                      "Are you sure you want to add this topic ?"
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
                    onClick={() => {handleSubmit(topic);setShowModal(false);}}
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

      

    );
  }

export default AddTopic;
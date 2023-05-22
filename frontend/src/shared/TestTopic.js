import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import topicService from '../../../frontend/src/service/topicService';
import axios from "axios";
import PostService from "../service/postService";


function TestTopic() {
  const [topic, setTopic] = useState('');
  const [topic1, setTopic1] = useState('');
  const [topic2, setTopic2] = useState('');
  const [duration, setDuration] = useState('');
  const [allTopics, setAllTopics] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [remaining, setRemaining] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault()
    topicService.topicTimer(topic1, topic2, duration)
      .then((data) => {
        // Success message or perform any other action
        window.location.reload(false);
      })
      .catch((error) => {
        // Error message or perform any other action
      });



    // Add your logic to handle the submission here
  };


  useEffect(() => {
    try {
      topicService.getTestTopic().then(
        (response) => {
          // check for token and user already exists with 200
          //   console.log("Sign up successfully", response);
          //    console.log(response.userArr)
          console.log(response)
          setTopic(response.currentTopic);
          setRemaining(response.remainingTime);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {

      console.log(err);
    }

  }, [])


  //handleSubmit(topic)

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <h1 className="text-4xl font-bold mt-8 mb-8 block text-gray-900 dark:text-white">Enter Today's Proposition</h1>
      <form className="flex flex-col items-center">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-purple-500"
          type="text"
          placeholder="Type your topic here"
          value={topic1}
          onChange={(event) => setTopic1(event.target.value)}
        />
        <br></br>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-purple-500"
          type="text"
          placeholder="Type your topic here"
          value={topic2}
          onChange={(event) => setTopic2(event.target.value)}
        />
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-purple-500"
          type="text"
          placeholder="Type your Duration here"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
        />
        <button onClick={handleSubmit} className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">

          Submit
        </button>
      </form>
        <div className="border rounded-md shadow shadow-xl dark:bg-zinc-800 dark:border-zinc-700 w-64 flex flex-row my-4">
          <div className="mx-auto my-4 items-center flex flex-col gap-4 sm:w-fit w-48">
            <p className="max-h-60 my-2 dark:text-white text-center">
              {topic}
            </p>
          </div>
        </div>
      <div className="border rounded-md shadow shadow-xl dark:bg-zinc-800 dark:border-zinc-700 w-64 flex flex-row my-4">
        <div className="mx-auto my-4 items-center flex flex-col gap-4 sm:w-fit w-48">
          <p className="max-h-60 my-2 dark:text-white text-center">
            {remaining}
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>



  );
}

export default TestTopic;

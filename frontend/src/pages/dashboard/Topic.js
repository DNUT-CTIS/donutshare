import React from 'react';
import topicService from '../../service/topicService';
import { useState,useEffect } from 'react';

export function Topic() {
    const [topic, setTopic] = useState('');
    const[hourLeft,setHourLeft] = useState(200);



    useEffect(() => {
        
        try {
          topicService.getcCurrentTopic().then(
              (response) => {
                  // check for token and user already exists with 200
                  //   console.log("Sign up successfully", response);
          //    console.log(response.userArr)
              setTopic(response.topic)
              setHourLeft(response.timeleft)
  
              },
              (error) => {
                  console.log(error);
              }
          );
      } catch (err) {
        
          console.log(err);
      }
  
    }, [])

 
   

    return (
        <div class="flex flex-col text-center p-4 leading-normal  ">
            <h1 class="mb-3 text-3xl font-bold text-gray-900 dark:text-white">{topic} for {hourLeft}</h1>


            <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">

                <div class="buttons">
                    <button>Agree</button>
                    <button>Disagree</button>
                </div>

            </div>
        </div>

    )
}

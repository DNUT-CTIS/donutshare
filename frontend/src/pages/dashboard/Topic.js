import React from 'react';
import CountdownTimer from './CountdownTimer';
import { useEffect,useState } from 'react';
import topicService from '../../service/topicService';

import './timer.css';

export function Topic() {

    const THREE_DAYS_IN_MS = 1 * 24 * 60 * 60 * 1000;
    const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();

    const dateTimeAfterSevenDays = NOW_IN_MS + SEVEN_DAYS_IN_MS;
    const [topic, setTopic] = useState('');
    const[timeleft,setTimeLeft] = useState(null);
    console.log(timeleft)
 
    useEffect(() => {
        try {
            topicService.getcCurrentTopic().then(
                (response) => {
                    // check for token and user already exists with 200
                    //   console.log("Sign up successfully", response);
            //    console.log(response.userArr)
                setTopic(response.topic)
                setTimeLeft(response.timeleft)
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {

            console.log(err);
        }
  
    }, [])

    const dateTimeAfterThreeDays = NOW_IN_MS + timeleft;

    return (











        <div class="flex flex-col text-center p-4 leading-normal  ">



            <div class="mx-3">
                <h1>Today's Topic</h1>

                <h2>Topic expires after 1 days!!!</h2>
                <CountdownTimer targetDate={dateTimeAfterThreeDays} />

                
            </div>

            <h1 class="mb-3 text-3xl font-bold text-gray-900 dark:text-white pt-6">{topic}</h1>



            <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 p-8">

                <div class="buttons">
                    <button>Agree</button>
                    <button>Disagree</button>
                </div>

            </div>
        </div>

    )
}

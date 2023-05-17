import React from 'react';
import CountdownTimer from './CountdownTimer';
import { useEffect, useState } from 'react';
import topicService from '../../service/topicService';
import { Link, useNavigate } from "react-router-dom";
import donutImage from "./donut.png";
import socket from "../../socket/socket"
import './error.css'


import './timer.css';
import ModalContainer from "../../shared/ModalContainer";
import { SearchModal } from "./SearchModal";
import { FoundMatch } from "./FoundMatch";

export function Topic() {

  const THREE_DAYS_IN_MS = 1 * 24 * 60 * 60 * 1000;
  const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterSevenDays = NOW_IN_MS + SEVEN_DAYS_IN_MS;
  const [topic, setTopic] = useState('');
  const [timeleft, setTimeLeft] = useState(null);
  console.log(timeleft)

  const username = localStorage.getItem("username");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [found, setFound] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleModalClose = () => {
    socket.emit('leaveQueue');
    setIsModalOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    try {
      topicService.getCurrentTopic().then(
        (response) => {
          // check for token and user already exists with 200
          //   console.log("Sign up successfully", response);
          //    console.log(response.userArr)
          setTopic(response.topic)
          setTimeLeft(response.timeleft)
          setLoading(false);
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

  const token = localStorage.getItem("token");
  socket.emit("setUsername", username);

  function handleAgreeClick() {
    setIsModalOpen(true);
    socket.emit("buttonClick", "agree");

  }

  function handleDisagreeClick() {
    setIsModalOpen(true);
    socket.emit("buttonClick", "disagree");
  }

  socket.on("matched", (roomName) => {
    setFound(true);

    setTimeout(() => {
      navigate(`/chat/${roomName}`);
    }, 5000);

    socket.on("matched", (roomName) => {
      setFound(true);

      setTimeout(() => {
        navigate(`/chat/${roomName}`);
      }, 5000);
    });
  });
  return (
    <div class="flex flex-col text-center p-4 leading-normal">
      {loading ? (

        <div class="errorContainer">
          <div class="donut classic"><span class="icing"></span></div>




          <h1 className="text-center text-3xl font-extrabold text-pink-500 py-2">No Topic avaliable !</h1>
          <h1 className="text-center text-2xl font-extrabold text-orange-300 py-2">Donut worry, we'll return you to the sweet stuff soon!</h1>


        </div>

      ) : (
        <>
          <div class="mx-3 dark:text-white">

          

            

            <p class="font-mono text-2xl subpixel-antialiased font-medium tracking-wide mb-8">TODAY'S DONUT</p>

            <CountdownTimer targetDate={dateTimeAfterThreeDays} />
          </div>
          <h1 class="mb-3 text-3xl font-bold text-gray-900 dark:text-white pt-6">
            {topic}
          </h1>
          <ModalContainer isOpen={found}>
            <FoundMatch></FoundMatch>
          </ModalContainer>
          {token ? (
            <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 p-8">
              <div class="buttons">
                <button onClick={handleAgreeClick}>Agree</button>
                <ModalContainer isOpen={isModalOpen} onClose={handleModalClose}>
                  <SearchModal></SearchModal>
                  <div className="flex justify-center">
                    <button className=" bg-pink-600 text-black active:bg-pink-800 font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" onClick={handleModalClose}>Cancel</button>
                  </div>
                </ModalContainer>
                <button onClick={handleDisagreeClick}>Disagree</button>
              </div>
            </div>
          ) : (
            <div style={{ display: "none" }}>
              Hidden when token is not present
            </div>
          )}
        </>
      )}
    </div>

  );
}

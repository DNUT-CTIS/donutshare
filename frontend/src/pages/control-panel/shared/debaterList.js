import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import DebaterService from '../../../service/moderatorService';
import donutImage from '../../dashboard/donut.png';

function DebaterList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState([]);
  const [isclicked, setisclicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deletedUser, setdeletedUser] = useState('');
  const [revokedUser, setrevokedUser] = useState('');
  const [loading, setLoading] = useState(true);

  const filteredUsernames = user.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    try {
      DebaterService.getAllUsers('debater').then(
        (response) => {
          console.log(response.userArr);
          setUser(response.userArr);
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }, [isclicked]);

  const handleUnban = (username) => {
    DebaterService.unbanDebater(username)
      .then((data) => {
        console.log(user);
        setisclicked(!isclicked);
        setrevokedUser('');
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleDelete = (username) => {
    DebaterService.DeleteDebater(username)
      .then((data) => {
        console.log(user);
        setisclicked(!isclicked);
        setdeletedUser('');
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center dark:bg-zinc-900">
      <div className="w-full max-w-md">
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
              {!debater.isBanned ? (
                <>
                  <p>{debater.username}</p>
                  <button
                    onClick={() => {
                      setdeletedUser(debater.username);
                      setShowModal(true);
                    }}
                    type="button"
                    className="text-white bg-gradient-to-r from-pink-600 via-pink-600 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Ban Debater
                  </button>
                </>
              ) : (
                <>
                  <p className="dark:text-red-700 line-through">{debater.username}</p>
                  <button
                    onClick={() => {
                      setrevokedUser(debater.username);
                      setShowModal(true);
                    }}
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Unban Debater
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    {revokedUser === ''
                      ? 'Are you sure you want to ban this debater?'
                      : 'Are you sure you want to revoke ban of this debater?'}
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      if (revokedUser === '') {
                        setLoading(true);
                        handleDelete(deletedUser);
                        setShowModal(false);
                      } else {
                        setLoading(true);
                        handleUnban(revokedUser);
                        setShowModal(false);
                      }
                    }}
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

      {loading && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50"
          style={{ backdropFilter: 'blur(4px)' }}
        >
          <img src={donutImage} alt="Loading" className="w-32 h-32" />
        </div>
      )}
    </div>
  );
}

export default DebaterList;
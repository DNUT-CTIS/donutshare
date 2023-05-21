import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import DebaterService from '../../../service/moderatorService';
import PostService from '../../../service/postService';
import { toast } from 'react-toastify';
import donutImage from '../../dashboard/donut.png';

function ReportedUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState([]);
  const [isclicked, setisclicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deletedUser, setdeletedUser] = useState('');
  const [bannedOffenders, setBannedOffenders] = useState([]);
  const [loading, setLoading] = useState(true);

  const filteredUsernames = user.filter((item) =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    try {
      
      PostService.getAllReportedPosts().then(
        (response) => {
          setUser(response.reportArr);
          setLoading(false)
        },
        (error) => {
          console.log(error);
          setLoading(false)
        }
      );
    } catch (err) {
      console.log(err);
    }
  }, [isclicked]);

  const handleDelete = (username) => {
    setLoading(true)
    DebaterService.DeleteDebater(username)
      .then((data) => {
        setLoading(false)
        console.log(user);
        console.log(user);
        toast.success(`User ${username} banned successfully, to unban the user go to Debater List`)
        setBannedOffenders([...bannedOffenders, username])
        setisclicked(!isclicked);
        setdeletedUser('');
      })
      .catch((error) => {
        setLoading(false)
        console.log(error);
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
          {filteredUsernames
            .filter((reason) => reason.reportType === 'user')
            .map((reason) => (
              <div
                key={reason}
                className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md"
              >
                <p>
                  <b>Complainant username:</b> {reason.complainant}
                  <br />
                  <b>Offender:</b> {reason.offender}
                </p>
                {bannedOffenders.includes(reason.offender) ? (
                  <button
                    type="button"
                    className="text-gray-500 bg-blue-300 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    disabled
                  >
                    Banned
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setdeletedUser(reason.offender);
                      setShowModal(true);
                    }}
                    type="button"
                    className="text-white bg-gradient-to-r from-pink-600 via-pink-600 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Ban offender
                  </button>
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
                    Are you sure you want to the offender?
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
                      handleDelete(deletedUser);
                      setShowModal(false);
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

export default ReportedUsers;

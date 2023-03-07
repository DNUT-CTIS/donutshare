import React, {useEffect, useState} from "react";
import PostService from "../service/postService";
import {motion} from "framer-motion";

const SendModal = () => {
    const [showModal, setShowModal] = useState(false);

    const [txt, setTxt] = useState("");

    const [username, setUsername] = useState("");

    useEffect(() => {
        const data = localStorage.getItem('username');
        if (data) {
            setUsername(JSON.parse(data));
        }
    }, []);
    const submitPost = async (event) => {
        event.preventDefault()
        try {
            await PostService.sendPost(username , txt, "agree").then(
                (response) => {
                    // check for token and user already exists with 200
                    //   console.log("Sign up successfully", response);


                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <motion.button initial={{opacity: 0, scale: 0.5}}
                           animate={{opacity: 1, scale: 1}}
                           transition={{
                               duration: 0.8,
                               delay: 0.5,
                               ease: [0, 0.71, 0.2, 1.01]
                           }}
                className="bg-blue-200 text-black active:bg-blue-500
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => setShowModal(true)}
            >
               Send Post
            </motion.button>
            {showModal ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                    <h3 className="text-3xl font=semibold">Send Post</h3>
                                    <button
                                        className="bg-transparent border-0 text-black float-right"
                                        onClick={() => setShowModal(false)}
                                    >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Text
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" onChange={(e) => setTxt(e.target.value)}/>
                                    </form>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={submitPost}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default SendModal;

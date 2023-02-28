import React, {useEffect, useState} from "react";
import PostService from "../service/postService";

const ReportModal = (props) => {
    const [showModal, setShowModal] = useState(false);

    const [txt, setTxt] = useState("");

    const reportPost = async (event) => {
        event.preventDefault()
        try {
            await PostService.reportPost(props.id , txt).then(
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
            <button onClick={() => setShowModal(true)}>
                <div style={{ display: 'flex', alignItems: 'center', right:0 }}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 3.747a.75.75 0 0 1 .75-.75h16.504a.75.75 0 0 1 .6 1.2L16.69 9.748l4.164 5.552a.75.75 0 0 1-.6 1.2H4.5v4.749a.75.75 0 0 1-.648.743L3.75 22a.75.75 0 0 1-.743-.648L3 21.249V3.747Z" fill="#ffffff" /></svg>


                </div>



            </button>
            {showModal ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                    <h3 className="text-3xl font=semibold">Send Report</h3>
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
                                        onClick={reportPost}
                                    >
                                        Report
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

export default ReportModal;

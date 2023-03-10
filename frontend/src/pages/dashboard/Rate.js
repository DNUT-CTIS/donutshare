import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import PostService from "../../service/postService";
import ReportModal from "../../shared/ReportModal";
import {toast} from "react-toastify";



export function Rate(props) {

    const [likeCount, setLikeCount] = useState(props.upvoteCount);
    const userData=JSON.parse(localStorage.getItem("userType"))
    const username=JSON.parse(localStorage.getItem("username"))
    const [dislikeCount, setDislikeCount] = useState(props.downvoteCount);
    const [id,setId] = useState(props.id);
    const [activeBtn, setActiveBtn] = useState("none");

    //const [upvotes, setUpvotes] = useState(post.upvotes);
    const [hasUpvoted, setHasUpvoted] = useState(false);
    useEffect(() => {
        console.log(props.votes)
        if (username) {
            const vote = Object.values(props.votes).find(
              (vote) => vote.username === username
            );
            console.log(vote)
            if(vote && vote.rate === "upvote") {
                setActiveBtn("like");
            } else if(vote && vote.rate === "downvote") {
                setActiveBtn("dislike");
            }
        }

        //const userHasUpvoted = post.upvoters.includes(userId);
        //setHasUpvoted(userHasUpvoted);
    }, [props.post]);

   /* const handleDelete = async (event) => {
        event.preventDefault()
        console.log(event)
        try {
           await PostService.DeletePost(id).then(
                (response) => {
                
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    };*/
    const handleDelete = () => {
        // call the delete function passed as prop
        console.log(props.id)
        props.deleteFun(props.id);
    };

    const upvotePost = async (event) => {
        event.preventDefault()

        if (activeBtn === "none") {
            try {
                await PostService.upvotePost(id).then(
                  (response) => {
                      // check for token and user already exists with 200
                      //   console.log("Sign up successfully", response);


                  },
                  (error) => {
                      toast.error(error.response.data.message)
                      console.log(error);
                  }
                );
            } catch (err) {
                return;
                console.log(err);
            }
            setLikeCount(likeCount + 1);
            setActiveBtn("like");
            return;
        }

        if (activeBtn === 'like') {
            setLikeCount(likeCount - 1);
            setActiveBtn("none");
            return;
        }

        if (activeBtn === "dislike") {
            setLikeCount(likeCount + 1);
            setDislikeCount(dislikeCount - 1);
            setActiveBtn("like");
        }

    };

    const downvotePost = async (event) => {
        event.preventDefault()

        if (activeBtn === "none") {
            try {
                await PostService.downvotePost(id).then(
                    (response) => {
                        // check for token and user already exists with 200
                        //   console.log("Sign up successfully", response);


                    },
                    (error) => {
                        toast.error(error.response.data.message)
                        console.log(error);
                    }
                );
            } catch (err) {
                console.log(err);
            }
            setDislikeCount(dislikeCount + 1)
            setActiveBtn("dislike");
            return;
        }

        if (activeBtn === 'dislike'){
            setDislikeCount(dislikeCount - 1);
            setActiveBtn("none");
            return;
        }

        if (activeBtn === "like") {
            setDislikeCount(dislikeCount + 1);
            setLikeCount(likeCount - 1);
            setActiveBtn("dislike");
        }

    };

    return (
        <div className="container top-100">
            <div className="btn-container">
                <button
                    className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
                    onClick={upvotePost}
                >

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {activeBtn !== "like" ? (
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.057 9.004c.46-1.427.693-2.676.693-3.753 0-2.399-.939-4.248-2.5-4.248-.847 0-1.109.505-1.437 1.747.017-.065-.163.634-.215.821-.101.36-.277.97-.527 1.831a.247.247 0 0 1-.03.065L8.175 9.953A5.885 5.885 0 0 1 5.32 12.28l-1.257.481a1.75 1.75 0 0 0-1.092 1.968l.686 3.538a2.25 2.25 0 0 0 1.673 1.757l8.25 2.022a4.75 4.75 0 0 0 5.733-3.44l1.574-6.173a2.75 2.75 0 0 0-2.665-3.429h-3.165Z" fill="#ffffff" /></svg>
                        ) : (
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.057 9.004c.46-1.427.693-2.676.693-3.753 0-2.399-.939-4.248-2.5-4.248-.847 0-1.109.505-1.437 1.747.017-.065-.163.634-.215.821-.101.36-.277.97-.527 1.831a.247.247 0 0 1-.03.065L8.175 9.953A5.885 5.885 0 0 1 5.32 12.28l-1.257.481a1.75 1.75 0 0 0-1.092 1.968l.686 3.538a2.25 2.25 0 0 0 1.673 1.757l8.25 2.022a4.75 4.75 0 0 0 5.733-3.44l1.574-6.173a2.75 2.75 0 0 0-2.665-3.429h-3.165Z" fill="#2ECC70" /></svg>)}
                        <span style={{ marginLeft: '4px' }} className="dark:text-white">{likeCount}</span>
                    </div>

                </button>

                <button
                    className={`btn ${activeBtn === "dislike" ? "dislike-active" : ""}`}
                    onClick={downvotePost}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {activeBtn !== "dislike" ? (
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.057 14.183c.46 1.427.693 2.676.693 3.753 0 2.399-.939 4.248-2.5 4.248-.8 0-1.078-.45-1.383-1.547l-.27-1.021c-.1-.359-.276-.97-.526-1.831a.246.246 0 0 0-.03-.065l-2.866-4.486a5.886 5.886 0 0 0-2.855-2.327l-1.257-.48A1.75 1.75 0 0 1 2.97 8.458l.686-3.539A2.25 2.25 0 0 1 5.33 3.163l8.25-2.022a4.75 4.75 0 0 1 5.733 3.44l1.574 6.173a2.75 2.75 0 0 1-2.665 3.429h-3.165Z" fill="#ffffff" />
                        </svg>) : (
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.057 14.183c.46 1.427.693 2.676.693 3.753 0 2.399-.939 4.248-2.5 4.248-.8 0-1.078-.45-1.383-1.547l-.27-1.021c-.1-.359-.276-.97-.526-1.831a.246.246 0 0 0-.03-.065l-2.866-4.486a5.886 5.886 0 0 0-2.855-2.327l-1.257-.48A1.75 1.75 0 0 1 2.97 8.458l.686-3.539A2.25 2.25 0 0 1 5.33 3.163l8.25-2.022a4.75 4.75 0 0 1 5.733 3.44l1.574 6.173a2.75 2.75 0 0 1-2.665 3.429h-3.165Z" fill="#aaaaaa" />
                        </svg>
                        )}
                        <span style={{ marginLeft: '4px' }} className="dark:text-white">{dislikeCount}</span>
                    </div>
                </button>
                
                <ReportModal id={props.id}></ReportModal>
                {userData === "moderator" ?(
                <button  onClick={handleDelete} >
                    <div style={{ display: 'flex', alignItems: 'center', right:0 }}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1Zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648Zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648ZM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5Z" fill="#ffffff"/></svg>
                    </div>
                    
                    

                </button>
                ): ""}



                

            </div>

            
            
  

        </div>
        

    );
}

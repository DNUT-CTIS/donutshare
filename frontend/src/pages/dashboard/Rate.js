import React, {useEffect, useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import PostService from "../../service/postService";


export function Rate(props) {

    const [likeCount, setLikeCount] = useState(props.upvoteCount);
    const [dislikeCount, setDislikeCount] = useState(props.downvoteCount);
    const [id,setId] = useState(props.id);
    const [activeBtn, setActiveBtn] = useState("none");

    const handleLikeClick = () => {
        if (activeBtn === "none") {
            setLikeCount(likeCount + 1);

            setActiveBtn("like");
            return;
        }

        if (activeBtn === 'like'){
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

    const upvotePost = async (event) => {
        if (activeBtn === "none") {
            setLikeCount(likeCount + 1);
            event.preventDefault()
            try {
                await PostService.upvotePost(id).then(
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
            setActiveBtn("like");
            return;
        }

        if (activeBtn === 'like'){
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
        if (activeBtn === "none") {
            setDislikeCount(dislikeCount - 1);
            event.preventDefault()
            try {
                await PostService.downvotePost(id).then(
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
            setActiveBtn("dislike");
            return;
        }

        if (activeBtn === 'dislike'){
            setDislikeCount(dislikeCount + 1);
            setActiveBtn("none");
            return;
        }

        if (activeBtn === "like") {
            setDislikeCount(dislikeCount - 1);
            setLikeCount(likeCount - 1);
            setActiveBtn("dislike");
        }

    };

    const handleDisikeClick = () => {
        if (activeBtn === "none") {
            setDislikeCount(dislikeCount + 1);
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
        <div className="container">
            {console.log(props)}
            <div className="btn-container">
                <button
                    className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
                    onClick={upvotePost}
                >

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {activeBtn !== "like" ? (
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.057 9.004c.46-1.427.693-2.676.693-3.753 0-2.399-.939-4.248-2.5-4.248-.847 0-1.109.505-1.437 1.747.017-.065-.163.634-.215.821-.101.36-.277.97-.527 1.831a.247.247 0 0 1-.03.065L8.175 9.953A5.885 5.885 0 0 1 5.32 12.28l-1.257.481a1.75 1.75 0 0 0-1.092 1.968l.686 3.538a2.25 2.25 0 0 0 1.673 1.757l8.25 2.022a4.75 4.75 0 0 0 5.733-3.44l1.574-6.173a2.75 2.75 0 0 0-2.665-3.429h-3.165Z" fill="#ffffff"/></svg>
                        ) : (
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.057 9.004c.46-1.427.693-2.676.693-3.753 0-2.399-.939-4.248-2.5-4.248-.847 0-1.109.505-1.437 1.747.017-.065-.163.634-.215.821-.101.36-.277.97-.527 1.831a.247.247 0 0 1-.03.065L8.175 9.953A5.885 5.885 0 0 1 5.32 12.28l-1.257.481a1.75 1.75 0 0 0-1.092 1.968l.686 3.538a2.25 2.25 0 0 0 1.673 1.757l8.25 2.022a4.75 4.75 0 0 0 5.733-3.44l1.574-6.173a2.75 2.75 0 0 0-2.665-3.429h-3.165Z" fill="#2ECC70"/></svg>                        )}
                        <span style={{ marginLeft: '4px' }} className="dark:text-white">{likeCount}</span>
                    </div>

                </button>

                <button
                    className={`btn ${activeBtn === "dislike" ? "dislike-active" : ""}`}
                    onClick={downvotePost}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.057 14.183c.46 1.427.693 2.676.693 3.753 0 2.399-.939 4.248-2.5 4.248-.8 0-1.078-.45-1.383-1.547l-.27-1.021c-.1-.359-.276-.97-.526-1.831a.246.246 0 0 0-.03-.065l-2.866-4.486a5.886 5.886 0 0 0-2.855-2.327l-1.257-.48A1.75 1.75 0 0 1 2.97 8.458l.686-3.539A2.25 2.25 0 0 1 5.33 3.163l8.25-2.022a4.75 4.75 0 0 1 5.733 3.44l1.574 6.173a2.75 2.75 0 0 1-2.665 3.429h-3.165Z" fill="#ffffff" />
                        </svg>
                        <span style={{ marginLeft: '4px' }}>{dislikeCount}</span>
                    </div>
                </button>
            </div>
        </div>

    );
}

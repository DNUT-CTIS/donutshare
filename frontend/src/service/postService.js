import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "https://donutshare-api.onrender.com/api";
const user = JSON.parse(localStorage.getItem("token"));
const config = {
    headers: { Authorization: `Bearer ${user}` }
};
const sendPost = (username, text) => {
    return axios.post(API_URL + "/post", {
        username, text
    }, config).then(console.log(text));
};

const DeletePost = (id) => {
    return axios
        .delete(API_URL + "/post/delete", {
            headers: { Authorization: `Bearer ${user}` },data:{
            _id:id
          }
        }).then(() => {
        
        });
};

const upvotePost = (id) => {
    return axios.put(API_URL + "/post/upvote", {
        id,
    }, config).then(console.log(id));
}

const downvotePost = (id) => {
    return axios.put(API_URL + "/post/downvote", {
        id,
    }, config).then(console.log(id));
}
const postService = {
    sendPost,
    upvotePost,
    downvotePost,
    DeletePost,
};

export default postService;

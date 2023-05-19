import axios from "axios";
import { toast } from 'react-toastify';

const API_URL = "https://donutshare-api.onrender.com/api";
const user = JSON.parse(localStorage.getItem("token"));
const config = {
    headers: { Authorization: `Bearer ${user}` }
};
const sendPost = (username, text, opinion) => {
    return axios.post(API_URL + "/post", {
        username, text, opinion,
    }, config).then(console.log(text));
};

const reportUser = (offender, text, reportType) => {
  return axios.post(API_URL + "/report/", {
    offender, text, reportType
  }, config).then(console.log(text)).catch(error => {
    console.log(error.response)
    toast.error(error.response.data.message)
    return error
  });
};


const reportPost = (id, text, reportType) => {
    return axios.post(API_URL + "/report/post", {
        id, text, reportType
    }, config).then(console.log(text)).catch(error => {
        console.log(error.response)
        toast.error(error.response.data.message)
        return error
      });

};

const getAllReportedPosts = () => {
    return axios
      .get(API_URL + "/report/allReports", {

      })
      .then((response) => {
          return response.data;
      });
};

const deletePost = (id) => {
    return axios
        .delete(API_URL + "/post/delete", {
            config
            ,data:{
            id:id
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
    deletePost,
    reportUser,
    reportPost,
    getAllReportedPosts,
};

export default postService;

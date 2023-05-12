import axios from "axios";
import { toast } from 'react-toastify';
const API_URL = "https://donutshare-api.onrender.com/api";

const postTopic = (content) => {
    return axios
        .post(API_URL + "/topic/addTopic", {
            content
        })
        .then((response) => {
            toast.success("The new topic added successfully")
            return response.data;
        }).catch(error => {
            console.log(error.response)
            toast.error(error.response.data.message)
            return error
          });
};

const getCurrentTopic = (content) => {
    return axios
        .get(API_URL + "/topic/currentTopic", {
            content
        })
        .then((response) => {
            return response.data;
        });
};

const getAllTopics = (content) => {
    return axios
      .get(API_URL + "/topic/allTopics", {
          content
      })
      .then((response) => {
          return response.data;
      });
};

const topicService = {
    postTopic,
    getCurrentTopic,
    getAllTopics
};

export default topicService;

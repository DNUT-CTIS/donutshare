import axios from "axios";

const API_URL = "https://donutshare-api.onrender.com/api";

const postTopic = (content) => {
    return axios
        .post(API_URL + "/topic/addTopic", {
            content
        })
        .then((response) => {
            return response.data;
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

const topicService = {
    postTopic,
    getCurrentTopic
};

export default topicService;

import axios from "axios";

const API_URL = "https://donutshare-api.onrender.com/api";
const user = JSON.parse(localStorage.getItem("token"));
const config = {
    headers: { Authorization: `Bearer ${user}` }
};
const getallusers = (userType) => {
    return axios
        .post(API_URL + "/user/allUsers", {
            userType
        })
        .then((response) => {
            return response.data;
        });
};

const DeleteDebater = (username) => {
    return axios
        .put(API_URL + "/user/ban", {
        username
        }, config)
        .then((response) => {
            return response.data;
        });
};
const UnBanDebater = (username) => {
    return axios
        .put(API_URL + "/user/unban", {
        username
        }, config)
        .then((response) => {
            return response.data;
        });
};

const login = (email, password) => {
    return axios
        .post(API_URL + "/user/login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("id", JSON.stringify(response.data._id))
                localStorage.setItem("username", JSON.stringify(response.data.username))
                localStorage.setItem("token", JSON.stringify(response.data.token));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("token");
};

const getCurrentToken = () => {
    return JSON.parse(localStorage.getItem("token"));
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("username"));
};

const DebaterService = {
    getallusers,
    login,
    logout,
    getCurrentUser,
    DeleteDebater,
    UnBanDebater
};

export default DebaterService;

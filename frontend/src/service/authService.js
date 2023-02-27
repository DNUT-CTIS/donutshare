import axios from "axios";

const API_URL = "https://donutshare-api.onrender.com/api";

const signup = (username, email, password) => {
    return axios
        .post(API_URL + "/user", {
            username,
            email,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("id", JSON.stringify(response.data.id))
                localStorage.setItem("username", JSON.stringify(response.data.username))
                localStorage.setItem("token", JSON.stringify(response.data.token));
            }

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

const authService = {
    signup,
    login,
    logout,
    getCurrentUser,
};

export default authService;

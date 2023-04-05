import axios from "axios";

const API_URL = "https://donutshare-api.onrender.com/api";
const user = JSON.parse(localStorage.getItem("token"));
const config = {
  headers: { Authorization: `Bearer ${user}` }
};

const getAllUsers = (userType) => {
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
const unbanDebater = (username) => {
  return axios
    .put(API_URL + "/user/unban", {
      username
    }, config)
    .then((response) => {
      return response.data;
    });
};


const DebaterService = {
  getAllUsers,
  DeleteDebater,
  unbanDebater
};

export default DebaterService;

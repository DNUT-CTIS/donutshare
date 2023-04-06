import axios from "axios";

const API_URL = "https://donutshare-api.onrender.com/api";

const getAllUsers = (userType) => {
  return axios
    .post(API_URL + "/user/allUsers", {
      userType
    })
    .then((response) => {
      return response.data;
    });
};

const modService = {
  getAllUsers,
};

export default modService;

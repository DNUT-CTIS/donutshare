import axios from "axios";
import { toast } from 'react-toastify';

const API_URL = "https://donutshare-api.onrender.com/api";

const signupMod = (username, email, password) => {
    return axios
        .post(API_URL + "/user", {
            username,
            email,
            password,
            userType:"moderator"
        })
        .then((response) => {
                console.log(response.data)

            return response;
        }).catch(error => {
          toast.error(error.response.data.message)
          return error
      });
};

const deleteMod = (username) => {
  return axios
    .delete(API_URL + "/user/deleteModerator", {
      data:{
        username:username
      }
    })
    .then((response) => {
      return response.data;
    });
};

const adminService = {
    signupMod,
    deleteMod,
};

export default adminService;

import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';

const API_URL = "https://donutshare-api.onrender.com/api";
const user = JSON.parse(localStorage.getItem("token"));
const config = {
  headers: { Authorization: `Bearer ${user}` }
};


const signup = (username, email, password) => {
    return axios
        .post(API_URL + "/user", {
            username,
            email,
            password,
        })
        .then((response) => {
            
                console.log(response.data)

                toast.success(response.data)
            return response;
        }).catch(error => {
        console.log(error.response)
        toast.error(error.response.data.message)
        return error
      });
};

const login = (email, password) => {
    return axios
        .post(API_URL + "/user/login", {
            email,
            password,
        })
        .then((response) => {
                console.log(response.data.token)
                localStorage.setItem("id", JSON.stringify(response.data._id))
                localStorage.setItem("username", JSON.stringify(response.data.username))
                localStorage.setItem("token", JSON.stringify(response.data.token));


            return response.data;
        }).catch(error => {
            return error
        });
};

const changePassword = (currentPassword, newPassword) => {
    return axios.put(API_URL + "/user/changePassword", {
    currentPassword,
    newPassword,
    }, config)
    .then(response => {
      console.log(response);
      toast.success(response.data.message)
      return response;
    })
    .catch(error => {
      console.log(error);
      toast.error(error.response.data.message)
      return error;
    });
  }

const resend = (email) => {
  return axios
    .post(API_URL + "/mail/resend", {
      email,
    })
    .then((response) => {
      toast.success(response.data)
      return response.data;
    }).catch(error => {
      console.log(error.response.data.msg)
      toast.error(error.response.data.msg)
      return error
    });
};

const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("userType");
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
    resend,
    getCurrentUser,
    changePassword
  
    
};

export default authService;

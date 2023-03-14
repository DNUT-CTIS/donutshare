import axios from "axios";

const API_URL = "https://donutshare-api.onrender.com/api";

const getallreasons = () => {
    return axios
        .get(API_URL + "/report/allReports", {
            
        })
        .then((response) => {
            return response.data;
        });
};


const reasonService = {
    getallreasons,
};

export default reasonService;

import axios from 'axios';
import header from './header';

const BASE_URL = "https://torre-backend-test.herokuapp.com/api/v1/" //"http://localhost:8080/api/v1/";

class Job_server {
    getPublicContent() {
        return axios.get(BASE_URL + "all");
    }

    getUserDashboard() {
        return axios.get(BASE_URL + "user", {headers: header() });
    }

    getHrDashboard() {
        return axios.get(BASE_URL + "hr", {headers: header()});
    }

    getAdminDashaboard() {
        return axios.get(BASE_URL + "admin", {headers: header( )});
    }
}

export default new Job_server();
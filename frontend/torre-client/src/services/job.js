import axios from 'axios';
import header from './header';

const BASE_URL = "http://localhost:8080/api/v1/";

class Job_server {
    getBiosDashboard() {
        return axios.get(BASE_URL + "bios", {headers: header() });
    }

    getOppDashboard() {
        return axios.get(BASE_URL + "opportunities", {headers: header() });
    }

}

export default new Job_server();
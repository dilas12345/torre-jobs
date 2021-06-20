import axios from 'axios';
import header from './header';

const BASE_URL = "https://torre-backend-test.herokuapp.com/api/v1/" //"http://localhost:8080/api/v1/";

class Job_server {
    getBiosDashboard() {
        return axios.get(BASE_URL + "bios");
    }

    getOppDashboard() {
        return axios.get(BASE_URL + "opportunities");
    }

}

export default new Job_server();
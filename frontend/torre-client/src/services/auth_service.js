import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/auth/";

class Authentication {
    login(username, password) {
        return axios
            .post(BASE_URL + "login", {
                username,
                password
            })
             .then(response => {
                 if (response.data.accesstoken) {
                     localStorage.setItem("user", JSON.stringify(response.data));
                 }

                 return response.data;
             });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(BASE_URL + "register", {
            username,
            email,
            password
        });
    }

    getRecentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new Authentication();
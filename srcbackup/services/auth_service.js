import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/auth/";  // "https://torre-backend-test.herokuapp.com/api/auth/"

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

                 console.log("Response-->", response.data)
                 return response.data;
             });
    };

    logout() {
        localStorage.removeItem("user");
    };

    register(username, email, password) {
        return axios.post(BASE_URL + "register", {
            username,
            email,
            password
        });
    };

}

export default new Authentication();
import axios from "axios";
import authHeader from "./header";

const BASE_URL = "http://localhost:8080/api/v1/";

class UserService {
  getPublicContent() {
    return axios.get(BASE_URL + "all");
  }

  getUserBoard() {
    return axios.get(BASE_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(BASE_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(BASE_URL + "admin", { headers: authHeader() });
  }

  getBiosDashboard() {
    return axios.get(BASE_URL + "bios", {headers: authHeader() });
  }

  getOppDashboard() {
      return axios.get(BASE_URL + "opportunities", {headers: authHeader() });
  }

}

export default new UserService();

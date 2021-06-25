import axios from "axios";

const API_URL = "https://search.torre.co/api/search/job_search"; //external api

class SearchService {
  searchOne(offset, size) {
    return axios
      .post(API_URL + "search", { offset, size: 7 })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("global", JSON.stringify(response.data));
        }

        return response.data;
      });
  }
}

export default new SearchService();

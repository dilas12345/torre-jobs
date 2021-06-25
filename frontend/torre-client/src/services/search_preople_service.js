import axios from "axios";

const API_URL = "https://search.torre.co/opportunities/";

class SearchPeopleService {
  searchOne(offset, size, aggregate ) {
    return axios
      .post(API_URL + "searchPeople", { offset, size, aggregate })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("global", JSON.stringify(response.data));
        }

        return response.data;
      });
  }
}

export default new SearchPeopleService();
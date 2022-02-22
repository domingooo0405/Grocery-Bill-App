import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/v1/auth/user";


class RegisterService {
  getUser() {
    return axios.get(USER_API_BASE_URL);
  }
  
  signupUser(user) {
    return axios.post(USER_API_BASE_URL, user);
  }
 

}

export default new RegisterService();

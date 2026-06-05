import * as axios from "axios";

const axiosApi = axios.create({
  baseURL: 'https://blog-js-ec7a1-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi
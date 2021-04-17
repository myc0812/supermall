import axios from "axios";

export function reqeust(config) {
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/m5",
    timeout: 50000
  });

  instance.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      console.log(error);
    }
  );

  instance.interceptors.response.use(
    res => {
      return res.data;
    },
    error => {
      console.log(error);
    }
  );
}

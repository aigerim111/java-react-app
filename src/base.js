import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token !== undefined) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url !== "/login" && error.response) {
      if (error.response.status === 403 && !originalRequest.retry) {
        originalRequest.retry = true;


        try {
          const response = await refreshToken();

          console.log(response);

          updateLocalAccessToken(response.data);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + getLocalAccessToken();
          return instance(originalRequest);
        } catch (err) {
          localStorage.removeItem("user");
          return Promise.reject(err);
        }
      }
    }
    return Promise.reject(error);
  }
);

function updateLocalAccessToken(token) {
  let user = JSON.parse(localStorage.getItem("user"));
  user.accessToken = token.accessToken;
  localStorage.setItem("user", JSON.stringify(user));
}

function getLocalRefreshToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.refreshToken;
}

function getLocalAccessToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.accessToken;
}

function refreshToken(){
  return instance.post("/refresh/token",null, {
    headers: {
      RefreshToken: getLocalRefreshToken(),
    },
  })
}

export default instance;

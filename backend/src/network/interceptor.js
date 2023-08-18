import axios from "axios";
import Cookies from 'js-cookie'; 

export const isHandlerEnabled = (config = {}) =>
  !(config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled);

export const requestHandler = (request) => {
  if (isHandlerEnabled(request)) {
    let Token = null;    
    Token = Cookies.get("auth_token");
    if (Token) {
      request.headers.Authorization = `Bearer ${Token}`;
    }
  }
  return request;
};

export const successHandler = (response) => {
  return response;
};
let isRefreshing = false;
let subscribers = [];

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

export const errorHandler = (error) => {
  console.log(error, "error");
  if (isHandlerEnabled(error.config)) {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
      }
      const retryOrigReq = new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers.Authorization = token;
          resolve(axios(originalRequest));
        });
      });
      return retryOrigReq;
    }
  }
  return Promise.reject({ ...error });
};
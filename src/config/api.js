import axios from 'axios';

let url;
switch (process.env.REACT_APP_ENVIRONMENT) {
  case 'PRODUCTION':
    url = process.env.REACT_APP_BACKEND_BASE_URL_PRODUCTION;
    break;
  case 'HOMOLOGATION':
    url = process.env.REACT_APP_BACKEND_BASE_URL_HOMOLOGATION;
    break;
  case 'LOCAL':
    url = process.env.REACT_APP_BACKEND_BASE_URL_LOCAL;
    break;
  default:
    break;
}

const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    // I cand handle a request with errors here
    return Promise.reject(error);
  }
);

export default api;

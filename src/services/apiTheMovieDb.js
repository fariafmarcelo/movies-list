import axios from 'axios';

const baseURL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: baseURL,
  responseType: 'json',
});

export default api;
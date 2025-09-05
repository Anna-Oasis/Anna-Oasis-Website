import axios from 'axios';

const api = import.meta.env.VITE_API_URL_BASE || 'http://localhost:5000'

console.log("API URL:", api);
if (!api) {
  throw new Error("API_URL is not defined. Please set the API_URL environment variable.");
}

const axios_api = axios.create({
  baseURL: api,
});

export {
    axios_api,
    api
}
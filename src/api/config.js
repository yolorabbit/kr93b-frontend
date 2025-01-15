import axios from 'axios';

export const API_BASE_URL = 'https://dummyjson.com';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const api = axiosInstance; 
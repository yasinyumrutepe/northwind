                                                           

import axios from 'axios';
const baseURL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: `${baseURL}`,
  timeout: 15000, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',

  },
});


api.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      return config;
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
  
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {

    return response;
  },
  (error) => {

    if (error.response && error.response.status === 401) {
   
    
      window.location.href = '/authorization';
     
    }
    return Promise.reject(error);
  }
);



export default api;

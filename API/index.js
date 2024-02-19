import axios from 'axios';

export const HOST = 'http://192.168.1.87'

const axiosInstance = axios.create({ baseURL: `${HOST}:8000/api` });

export default axiosInstance;
// export const axiosInstance = axios.create({ baseURL: 'http://172.18.0.9:8000/api' });
// export const axiosInstance = axios.create({ baseURL: 'http://195.19.59.137:8000/api' })
// export const axiosInstance = axios.create({ baseURL: 'http://localhost:8000/api' });
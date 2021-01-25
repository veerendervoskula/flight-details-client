import axios from 'axios';

const axiosConfig = { baseURL: 'http://localhost:3600' };
const instance = axios.create(axiosConfig);

export default instance;

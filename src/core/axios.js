import axios from 'axios';

const axiosConfig = { baseURL: 'http://localhost:3000' };
const instance = axios.create(axiosConfig);

export default instance;

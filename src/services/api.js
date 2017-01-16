import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://api.wvvw.me/',
    baseURL: 'http://localhost:8081/',
    timeout: 100,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;

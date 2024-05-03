import axios from "axios";
import {message} from "antd";

const API_URL = 'http://localhost:8080/api/auth';
const token = localStorage.getItem('token');
const headers = {
    'Authorization': `Bearer ${token}`
};

export const loginRequest = async (requestBody) => {
    axios.post(`${API_URL}/login`, requestBody, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            const token = response.data.token;
            const userId = response.data.userId;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            window.location.reload();
        })
        .catch(error => {
            message.error('Ви ввели невалідні дані!');
        });
}

export const registrationRequest = async (requestBody) => {
    axios.post(`${API_URL}/register`, requestBody, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            const token = response.data.token;
            const userId = response.data.userId;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            window.location.reload();
        })
        .catch(error => {
            message.error('Ви ввели невалідні дані!');
        });
}
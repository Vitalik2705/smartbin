import axios from "axios";

const API_URL = 'http://localhost:8080/api/user';
const token = localStorage.getItem('token');

const headers = {
    'Authorization': `Bearer ${token}`
};

export const getUserById = async () => {
    const userId = localStorage.getItem('userId');
    try {
        const response = await axios.get(`${API_URL}/${userId}`, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export const addGarbageBinToUser = async (garbageBinId) => {
    const userId = localStorage.getItem('userId');
    try {
        const response = await axios.post(`${API_URL}/${userId}/add-garbage-bin?garbageBinId=${garbageBinId}`,{}, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error.response.data;
    }
};

export const removeGarbageBinFromUser = async (garbageBinId) => {
    const userId = localStorage.getItem('userId');
    try {
        const response = await axios.delete(`${API_URL}/${userId}/garbage-bin/${garbageBinId}`, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error.response.data;
    }
};

export const addBalanceToUser = async (amount) => {
    const userId = localStorage.getItem('userId');
    try {
        const response = await axios.patch(`${API_URL}/${userId}/add-balance?amount=${amount}`, {}, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error.response.data;
    }
};
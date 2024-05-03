import axios from "axios";

const API_URL = 'http://localhost:8080/api/messages';

const token = localStorage.getItem('token');

const headers = {
    'Authorization': `Bearer ${token}`
};

export const sendMessage = async (message) => {
    const userId = localStorage.getItem('userId');
    try {
        const response = await axios.post(`${API_URL}/${userId}/send`, message, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error.response.data;
    }
};

export const getMessagesByUserId = async () => {
    const userId = localStorage.getItem('userId');
    try {
        const response = await axios.get(`${API_URL}/${userId}`, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error.response.data;
    }
};

export const deleteMessageById = async (messageId) => {
    try {
        await axios.delete(`${API_URL}/${messageId}`, {
            headers: headers
        });
    } catch (error) {
        console.error('Error:', error);
        throw error.response.data;
    }
};
import axios from "axios";

const API_URL = 'http://localhost:8080/api/garbage-bins';

export const getAllGarbageBins = async (page, pageSize) => {
    try {
        const response = await axios.get(`${API_URL}?page=${page - 1}&size=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export const getBinById = async (binId) => {
    const url = `${API_URL}/${binId}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const searchGarbageBins = async (query, page, pageSize) => {
    const url = `${API_URL}/search?name=${query}&page=${page}&size=${pageSize}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};


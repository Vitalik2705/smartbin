import axios from "axios";

const API_URL = 'http://localhost:8080/api/additional-services';

export const getAllAdditionalServices = async (page, pageSize) => {
    try {
        const response = await axios.get(`${API_URL}?page=${page - 1}&size=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export const searchAdditionalServices = async (query, page, pageSize) => {
    const url = `${API_URL}/search?name=${query}&page=${page}&size=${pageSize}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};
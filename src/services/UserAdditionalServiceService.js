import axios from "axios";

const API_URL = 'http://localhost:8080/api/user-additional-services';
const token = localStorage.getItem('token');

const headers = {
    'Authorization': `Bearer ${token}`
};


export const addAdditionalServiceToUser = async (additionalServiceId, date) => {
    const userId = localStorage.getItem('userId');
    try {
        const response = await axios.post(`${API_URL}?userId=${userId}&additionalServiceId=${additionalServiceId}&date=${date}`,{}, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error.response.data;
    }
};

export const getAllAdditionalServicesForUser = async (page, pageSize) => {
    const userId = localStorage.getItem('userId');
    try {
        const url = `${API_URL}/${userId}?page=${page - 1}&size=${pageSize}`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export const removeUserAdditionalService = async (serviceId) => {
    try {
        const response = await axios.delete(`${API_URL}/${serviceId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error.response.data;
    }
};

export const payForAdditionalService = async (serviceId) => {
    try {
        const response = await axios.post(`${API_URL}/${serviceId}/pay`, {}, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error.response.data;
    }
};


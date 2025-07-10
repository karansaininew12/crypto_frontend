import axios from 'axios';

const API_URL = 'https://crypto-backend-new-osvy.onrender.com/api';

export const fetchCoins = async () => {
    try {
        const response = await axios.get(`${API_URL}/coins`);
        return response.data;
    } catch (error) {
        console.error('Error fetching coins:', error);
        throw error;
    }
};

export const postHistory = async (historyData) => {
    try {
        const response = await axios.post(`${API_URL}/history`, historyData);
        return response.data;
    } catch (error) {
        console.error('Error posting history:', error);
        throw error;
    }
};
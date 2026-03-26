import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://nexa-fullstack-dashboard.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const api = {
    get: (resource, params = {}) => apiClient.get(`/${resource}`, { params }),
    post: (resource, data) => apiClient.post(`/${resource}`, data),
    put: (resource, id, data) => apiClient.put(`/${resource}/${id}`, data), 
    patch: (resource, id, data) => apiClient.patch(`/${resource}/${id}`, data),   
    delete: (resource, id) => apiClient.delete(`/${resource}/${id}`),
};
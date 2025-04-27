import axios from 'axios';

const API_URL = 'http://localhost:5000/api/expenses';
const token = localStorage.getItem('token');

const getAuthHeaders = () => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
};

export const fetchExpenses = () => {
    return axios.get(API_URL, getAuthHeaders());
};

export const createExpense = (expense) => {
    return axios.post(`${API_URL}/create`, expense, getAuthHeaders());
};

export const updateExpense = (id, expense) => {
    return axios.put(`${API_URL}/${id}`, expense, getAuthHeaders());
};

export const deleteExpense = (id) => {
    return axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};


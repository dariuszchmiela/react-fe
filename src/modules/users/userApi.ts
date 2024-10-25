import axios from 'axios';
import { User } from './userTypes';

const API_URL = import.meta.env.VITE_USER_API_URL;

export const getUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>(`${API_URL}/api/users`);
    return response.data;
};

export const addUser = async (user: User): Promise<User> => {
    const response = await axios.post<User>(`${API_URL}/api/users`, user);
    return response.data;
};
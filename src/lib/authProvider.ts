import { AuthProvider } from 'react-admin';
import apiUrl from './api';

const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        try {
            const response = await fetch(apiUrl('/users/login'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }
            const data = await response.json();
            const { accessToken } = data;

            if (accessToken) {
                localStorage.setItem('token', accessToken);
                return Promise.resolve();
            }

            return Promise.reject('Invalid credentials');
        } catch (error) {
            return Promise.reject('Invalid credentials');
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject('Not authenticated');
    },
    checkError: error => {
        return Promise.resolve();
    },
    getPermissions: () => Promise.resolve(),
};

export default authProvider;
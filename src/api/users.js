import { api } from './config';

export const fetchUsersApi = async () => {
  const response = await api.get('/users');
  return response.data;
}; 
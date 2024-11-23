import { PostAxiosInstance } from '@axios/axios.method';
import { LoginResponse } from './response';
import { LoginRequest } from './request';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await PostAxiosInstance<LoginResponse>('/api/v1/users/login', data);

  return response;
};

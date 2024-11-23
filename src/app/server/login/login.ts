import { PostAxiosInstance } from '@axios/axios.method';
import { LoginResponse, SignUpResponse } from './response';
import { LoginRequest, SignUpRequest } from './request';

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const response = await PostAxiosInstance<SignUpResponse>('/api/v1/users/signup', data);

  return response.data;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await PostAxiosInstance<LoginResponse>('/api/v1/user/login', data);

  return response.data;
};

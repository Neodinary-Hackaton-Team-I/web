import { PostAxiosInstance } from '@axios/axios.method';
import { SignUpRequest } from './request';
import { SignUpResponse } from './response';

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const response = await PostAxiosInstance<SignUpResponse>('/api/v1/users/signup', data);

  return response.data;
};

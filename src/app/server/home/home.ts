import { GetAxiosInstance } from '@axios/axios.method';
import { GetLetterListResponse } from './response';

export const getLetterList = async (userId: number): Promise<GetLetterListResponse> => {
  const response = await GetAxiosInstance<GetLetterListResponse>(
    `/api/v1/letters/receiver/${userId}`,
  );

  return response.data;
};

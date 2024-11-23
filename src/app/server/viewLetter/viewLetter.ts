import { GetAxiosInstance } from '@axios/axios.method';
import { GetLetterDataResponse } from './response';

export const getLetterData = async (letterId: number): Promise<GetLetterDataResponse> => {
  const response = await GetAxiosInstance<GetLetterDataResponse>(`/api/v1/letters/${letterId}`);

  return response.data;
};

import { GetAxiosInstance } from '@axios/axios.method';
import { GetFollowingListResponse } from './response';

export const getFollowingList = async (
  userId: number,
  cursor: string,
  offset: number,
): Promise<GetFollowingListResponse> => {
  const response = await GetAxiosInstance<GetFollowingListResponse>(
    `/api/v1/follow/${userId}/followings`,
    {
      params: {
        cursor: cursor,
        offset: offset,
      },
    },
  );

  return response.data;
};

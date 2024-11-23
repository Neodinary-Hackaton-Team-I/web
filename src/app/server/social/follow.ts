import { DeleteAxiosInstance, GetAxiosInstance, PostAxiosInstance } from '@axios/axios.method';
import { FollowRequest, GetFollowingUserRequest, UnfollowRequest } from './request';
import { FollowResponse, GetFollowingUserResponse, UnfollowResponse } from './response';
import { AxiosRequestConfig } from 'axios';

export const getFollowingUser = async (userId: number, config: GetFollowingUserRequest) => {
  const response = await GetAxiosInstance<GetFollowingUserResponse>(
    `/api/v1/follow/${userId}/followings`,
    {
      params: {
        cursor: config.cursor,
        offset: config.offset,
      },
    },
  );

  return response.data;
};

export const getFollowUser = async (userId: number, config: GetFollowingUserRequest) => {
  const response = await GetAxiosInstance<GetFollowingUserResponse>(
    `/api/v1/follow/${userId}/followers`,
    {
      params: {
        cursor: config.cursor,
        offset: config.offset,
      },
    },
  );

  return response.data;
};

export const follow = async (data: FollowRequest, id: number): Promise<FollowResponse> => {
  const config: AxiosRequestConfig = {
    headers: { 'X-USER-ID': id },
  };

  const response = await PostAxiosInstance<FollowResponse>('/api/v1/follow', data, config);

  return response.data;
};

export const unfollow = async (data: UnfollowRequest, id: number): Promise<UnfollowResponse> => {
  const response = await DeleteAxiosInstance<UnfollowResponse>('/api/v1/follow', data, {
    headers: { 'X-USER-ID': id },
  });

  return response.data;
};

export const getSearchUser = async (userId: number, config: GetFollowingUserRequest) => {
  const response = await GetAxiosInstance<GetFollowingUserResponse>(
    `/api/v1/follow/${userId}/search`,
    {
      params: {
        name: config.name,
        cursor: config.cursor,
        offset: config.offset,
      },
    },
  );

  return response.data;
};

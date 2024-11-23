export interface FollowResponse {
  data: {
    followUserId: number;
    followNickname: string;
  };
}

export interface UnfollowResponse {
  data: null;
}

export interface GetFollowingUserResponse {
  data: {
    follows: {
      nickname: string;
      userId: number;
      followed: boolean;
    }[];
    cursor: string;
    hasNext: boolean;
  };
}

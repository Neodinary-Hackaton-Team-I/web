export interface SocialwRequestHeader {
  'X-USER-ID': number;
}

export interface FollowRequest {
  followUserId: number;
}

export interface UnfollowRequest {
  followUserId: number;
}

export interface GetFollowingUserRequest {
  name: string;
  cursor: string;
  offset: number;
}

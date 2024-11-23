export interface GetFollowingListResponse {
  data: {
    follows: {
      nickName: string;
      userId: number;
    }[];
    cursor: string;
    hasNext: boolean;
  };
}

export interface GetLetterListResponse {
  data: {
    letterId: number;
    senderId: number;
    receiverId: number;
    imageUrl: string;
    body: string;
    createdAt: string;
    nickname: string;
    opened: boolean;
  }[];
}

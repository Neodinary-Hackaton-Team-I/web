export interface GetLetterDataResponse {
  data: {
    letterId: number;
    senderId: number;
    receiverId: number;
    imageUrl: string;
    body: string;
    nickname: string;
    createdAt: string;
    opened: boolean;
  };
}

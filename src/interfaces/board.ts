export interface IBoardAuthor {
  id: number;
  firstName: string;
  lastName: string;
}

export interface IBoardState {
  boardId: number;
  title: string;
  isPublic: boolean;
  author: IBoardAuthor;
}

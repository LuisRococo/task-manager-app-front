export interface IBoardAuthor {
  id: number;
  firstName: string;
  lastName: string;
}

export interface IBoardState {
  id: number;
  title: string;
  isPublic: boolean;
  author: IBoardAuthor;
}

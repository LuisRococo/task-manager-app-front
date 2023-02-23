export interface IBoardAuthor {
  idAuthor: number;
  firstName: string;
  lastName: string;
}

export interface IBoardState {
  boardId: number;
  title: string;
  visibility: boolean;
  author: IBoardAuthor;
}

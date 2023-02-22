interface IBoardAuthor {
  idAuthor: number;
  firstName: string;
  lastName: string;
}

interface IBoardState {
  boardId: number;
  title: string;
  visibility: boolean;
  author: IBoardAuthor;
}

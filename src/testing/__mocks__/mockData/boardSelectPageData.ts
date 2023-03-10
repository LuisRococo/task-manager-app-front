interface IBoardCard {
  boardTitle: string;
  boardId: number;
  onBoardSelection: (idBoard: number) => void;
}

export const boardPageBoardsData: IBoardCard[] = [
  {
    boardId: 1,
    boardTitle: "Board title 1",
    onBoardSelection: (boardId: number) =>
      console.log(`Placeholder ${boardId}`),
  },
  {
    boardId: 2,
    boardTitle: "Board title 2",
    onBoardSelection: (boardId: number) =>
      console.log(`Placeholder ${boardId}`),
  },
  {
    boardId: 3,
    boardTitle: "Board title 3",
    onBoardSelection: (boardId: number) =>
      console.log(`Placeholder ${boardId}`),
  },
];

export const boardsDataMock: { id: number; title: string }[] = [
  { id: 1, title: "Board title 1" },
  { id: 2, title: "Board title 2" },
  { id: 3, title: "Board title 3" },
];

interface IBoardCard {
  boardTitle: string;
  boardId: number;
  onBoardSelection: (idBoard: number) => void;
}

export const boardCardProps: IBoardCard = {
  boardId: 1,
  boardTitle: "Board test title",
  onBoardSelection: jest.fn(),
};

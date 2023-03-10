import React, { FC } from "react";

interface IBoardCard {
  boardTitle: string;
  boardId: number;
  onBoardSelection: (idBoard: number) => void;
}

export const BoardCard: FC<IBoardCard> = ({
  onBoardSelection,
  boardId,
  boardTitle,
}) => {
  function handleButtonClick() {
    onBoardSelection(boardId);
  }

  return (
    <div className="col-md-6 my-2 px-2">
      <div className="bg-light  rounded p-4">
        <h4 data-testid="board-card-title">{boardTitle}</h4>
        <hr />
        <div className="d-flex justify-content-end">
          <button onClick={handleButtonClick} className="btn btn-primary">
            See
          </button>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { useRecoilState } from "recoil";
import { boardState } from "../appState/boardState";
import { board as boardPlaceholder } from "../placeholders/boardsPlaceholders";
import { IBoardState } from "../interfaces/board";

export const useBoardState = () => {
  const [board, setBoard] = useRecoilState(boardState);

  async function fetchBoard(boardId: number) {
    setBoard(boardPlaceholder);
  }

  async function changeBoardVisibility(newValue: boolean) {
    const updatedBoard: IBoardState = {
      ...board,
      visibility: newValue,
    } as IBoardState;
    setBoard(updatedBoard);
  }

  return { board, fetchBoard, setBoard, changeBoardVisibility };
};

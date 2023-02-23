import { useRecoilState } from "recoil";
import { boardState } from "../appState/boardState";
import { board as boardPlaceholder } from "../placeholders/boardsPlaceholders";
import { IBoardState } from "../interfaces/board";

export const useBoardState = () => {
  const [board, setBoard] = useRecoilState(boardState);

  /* eslint-disable */
  async function fetchBoard(boardId: number) {
    setBoard(boardPlaceholder);
  }
  /* eslint-enable */

  async function changeBoardVisibility(newValue: boolean) {
    const updatedBoard: IBoardState = {
      ...board,
      visibility: newValue,
    } as IBoardState;
    setBoard(updatedBoard);
  }

  return { board, fetchBoard, setBoard, changeBoardVisibility };
};

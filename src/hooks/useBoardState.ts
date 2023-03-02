import { useRecoilState } from "recoil";
import { boardState } from "../appState/boardState";
import { IBoardState } from "../interfaces/board";
import { client } from "../components/wrappers/ApolloConfig";
import { findBoardQuerie } from "../queries/boardQueries";

export const useBoardState = () => {
  const [board, setBoard] = useRecoilState(boardState);

  /* eslint-disable */
  async function fetchBoard(boardId: number) {
    const queryResult = await client.query({
      query: findBoardQuerie,
      variables: { id: boardId },
    });

    setBoard(queryResult.data.board);
  }
  /* eslint-enable */

  async function changeBoardVisibility(newValue: boolean) {
    const updatedBoard: IBoardState = {
      ...board,
      isPublic: newValue,
    } as IBoardState;
    setBoard(updatedBoard);
  }

  return { board, fetchBoard, setBoard, changeBoardVisibility };
};

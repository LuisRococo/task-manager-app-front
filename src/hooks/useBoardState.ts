import { useRecoilState } from "recoil";
import { boardState } from "../appState/boardState";
import { IBoardState } from "../interfaces/board";
import { client } from "../components/wrappers/ApolloConfig";
import { findBoardQuerie, patchBoardQuerie } from "../queries/boardQueries";

export const useBoardState = () => {
  const [board, setBoard] = useRecoilState(boardState);

  async function fetchBoard(boardId: number) {
    const queryResult = await client.query({
      query: findBoardQuerie,
      variables: { id: boardId },
    });

    setBoard(queryResult.data.board);
  }

  async function changeBoardVisibility(newValue: boolean) {
    const updatedBoard: IBoardState = {
      ...board,
      isPublic: newValue,
    } as IBoardState;
    setBoard(updatedBoard);
  }

  async function updateBoard(data: {
    id: number;
    title?: string;
    isPublic?: boolean;
  }) {
    const { id, isPublic, title } = data;
    const queryResult = await client.mutate({
      mutation: patchBoardQuerie,
      variables: { id, isPublic, title },
    });

    const updatedBoard = queryResult.data.patchBoard;
    setBoard(updatedBoard);
  }

  return { board, fetchBoard, setBoard, changeBoardVisibility, updateBoard };
};

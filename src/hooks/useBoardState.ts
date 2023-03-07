import { useRecoilState } from "recoil";
import { boardState } from "../appState/boardState";
import { client } from "../components/wrappers/ApolloConfig";
import {
  findBoardQuerie,
  getUserBoardsQuery,
  patchBoardQuerie,
} from "../queries/boardQueries";
import { IBoardState } from "../interfaces/board";

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
    if (board) {
      updateBoard({ id: board.id, isPublic: newValue, title: null });
    }
  }

  async function changeBoardData(boardToChange: IBoardState) {
    updateBoard({
      id: boardToChange.id,
      title: boardToChange.title,
      isPublic: null,
    });
  }

  async function updateBoard(data: {
    id: number;
    title: string | null;
    isPublic: boolean | null;
  }) {
    const { id, isPublic, title } = data;
    const queryResult = await client.mutate({
      mutation: patchBoardQuerie,
      variables: { id, isPublic: isPublic, title: title },
    });

    const updatedBoard = queryResult.data.patchBoard;
    setBoard(updatedBoard);
  }

  async function fetchUserBoards(userId: number) {
    const queryResult = await client.query({
      query: getUserBoardsQuery,
      variables: { id: userId },
    });

    return queryResult.data.userBoards;
  }

  return {
    board,
    fetchBoard,
    setBoard,
    changeBoardVisibility,
    updateBoard,
    changeBoardData,
    fetchUserBoards,
  };
};

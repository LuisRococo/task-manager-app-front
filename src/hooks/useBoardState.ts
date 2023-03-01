import { useRecoilState } from "recoil";
import { boardState } from "../appState/boardState";
import { board as boardPlaceholder } from "../placeholders/boardsPlaceholders";
import { IBoardState } from "../interfaces/board";
import { client } from "../components/wrappers/ApolloConfig";
import { gql } from "@apollo/client";

export const useBoardState = () => {
  const [board, setBoard] = useRecoilState(boardState);

  /* eslint-disable */
  async function fetchBoard(boardId: number) {
    try {
      const queryResult = await client.query({
        query: gql`
          query getBoard {
            board(id: ${boardId}) {
              id
              title,
              isPublic
            }
          }
        `,
      });
      setBoard(queryResult.data.board);
    } catch (error) {
      setBoard(boardPlaceholder);
    }
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

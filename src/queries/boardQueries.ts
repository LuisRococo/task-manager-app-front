import { gql } from "@apollo/client";

export const findBoardQuerie = gql`
  query getBoard($id: Int!) {
    board(id: $id) {
      id
      title
      isPublic
    }
  }
`;

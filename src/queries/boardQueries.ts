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

export const patchBoardQuerie = gql`
  mutation PatchBoard($id: Int!, $title: String, $isPublic: Boolean) {
    patchBoard(id: $id, title: $title, isPublic: $isPublic) {
      id
      title
      isPublic
    }
  }
`;

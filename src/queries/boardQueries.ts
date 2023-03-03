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
  mutation PatchTaskList($id: Int!, $title: String, $isPublic: Boolean) {
    patchTaskList(id: $id, title: $title, isPublic: $isPublic) {
      id
      title
      isPublic
    }
  }
`;

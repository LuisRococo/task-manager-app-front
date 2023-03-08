import { gql } from "@apollo/client";

export const patchUserQuerie = gql`
  mutation PatchUser($id: Int!, $firstName: String, $lastName: String) {
    patchUser(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
      email
    }
  }
`;

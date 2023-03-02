import { gql } from "@apollo/client";

export const createTaskQuery = gql`
  mutation CreateTask(
    $title: String!
    $taskListId: Int!
    $points: Int!
    $description: String!
  ) {
    createTask(
      title: $title
      taskListId: $taskListId
      points: $points
      description: $description
    ) {
      id
      title
      creatorName
      completed
      assignedQuantity
      points
      description
      taskList {
        id
        name
      }
    }
  }
`;

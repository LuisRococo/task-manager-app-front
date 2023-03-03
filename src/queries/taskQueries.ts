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
      order
      taskList {
        id
        name
      }
    }
  }
`;

export const patchTaskQuery = gql`
  mutation PatchTask(
    $id: Int!
    $title: String
    $description: String
    $points: Int
    $taskListId: Int
    $order: Int
    $completed: Boolean
  ) {
    patchTask(
      id: $id
      title: $title
      description: $description
      points: $points
      taskListId: $taskListId
      order: $order
      completed: $completed
    ) {
      id
      title
      creatorName
      completed
      assignedQuantity
      points
      description
      order
      taskList {
        id
        name
      }
    }
  }
`;

export const deleteTaskQuery = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

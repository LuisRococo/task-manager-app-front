import { gql } from "@apollo/client";

export const createTaskListQuerie = gql`
  mutation CreateTaskList(
    $name: String!
    $color: String!
    $boardId: Int!
    $priority: Int!
  ) {
    createTaskList(
      name: $name
      color: $color
      boardId: $boardId
      priority: $priority
    ) {
      id
      name
      priority
      color
      tasks {
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
  }
`;

export const getTaskListsByBoardQuery = gql`
  query BoardTaskLists($id: Int!) {
    boardTaskLists(id: $id) {
      id
      name
      priority
      color
      tasks {
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
  }
`;

export const deleteTaskListQuery = gql`
  mutation DeleteTaskList($id: Int!) {
    deleteTaskList(id: $id) {
      id
    }
  }
`;

export const patchTaskListQuery = gql`
  mutation PatchTaskList(
    $id: Int!
    $name: String
    $color: String
    $priority: Int
  ) {
    patchTaskList(id: $id, name: $name, color: $color, priority: $priority) {
      id
      name
      color
      priority
    }
  }
`;

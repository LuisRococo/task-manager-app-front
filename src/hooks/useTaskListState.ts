import { taskListState } from "../appState/taskListState";
import { useRecoilState } from "recoil";
import { ICreateTaskList, ITaskListState } from "../interfaces/taskList";
import { client } from "../components/wrappers/ApolloConfig";
import { useBoardState } from "./useBoardState";
import {
  createTaskListQuerie,
  deleteTaskListQuery,
  getTaskListsByBoardQuery,
  patchTaskListQuery,
} from "../queries/taskListsQueries";

export const useTaskListState = () => {
  const [taskLists, setTaskLists] = useRecoilState(taskListState);
  const { board } = useBoardState();

  /* eslint-disable */
  async function fetchTaskLists(boardId: number) {
    const queryResult = await client.query({
      query: getTaskListsByBoardQuery,
      variables: { id: boardId },
    });

    setTaskLists(queryResult.data.boardTaskLists);
    orderTaskListsByPriority();
    orderTasks();
  }
  /* eslint-enable */

  async function setSingleTaskList(taskList: ITaskListState) {
    const elementIndex = taskLists.findIndex((item) => item.id === taskList.id);

    if (elementIndex === -1) return;

    await client.mutate({
      mutation: patchTaskListQuery,
      variables: {
        ...taskList,
      },
    });

    const updatedTaskLists = [...taskLists];
    updatedTaskLists[elementIndex] = taskList;

    setTaskLists(updatedTaskLists);
    orderTaskListsByPriority();
  }

  function orderTasks() {
    setTaskLists((prev) => {
      let editedLists: ITaskListState[] = JSON.parse(JSON.stringify(prev));
      editedLists = editedLists.map((list) => {
        list.tasks.sort((a, b) => {
          return a.order - b.order;
        });
        return list;
      });

      return editedLists;
    });
  }

  async function deleteTaskList(taskListId: number) {
    await client.mutate({
      mutation: deleteTaskListQuery,
      variables: { id: taskListId },
    });

    const updatedTaskLists: ITaskListState[] = taskLists.filter((taskList) => {
      return taskList.id !== taskListId;
    });
    setTaskLists(updatedTaskLists);
  }

  function findTaskList(taskListId: number) {
    for (let index = 0; index < taskLists.length; index++) {
      const taskList = taskLists[index];
      if (taskList.id === taskListId) {
        return taskList;
      }
    }
    return null;
  }

  async function createTaskLists(taskListData: ICreateTaskList) {
    const mutationResult = await client.mutate({
      mutation: createTaskListQuerie,
      variables: {
        name: taskListData.name,
        color: taskListData.color,
        boardId: board?.id,
        priority: taskListData.priority,
      },
    });

    const newTaskListsState: ITaskListState[] = [
      ...taskLists,
      mutationResult.data.createTaskList,
    ];
    setTaskLists(newTaskListsState);
    orderTaskListsByPriority();
  }

  function orderTaskListsByPriority() {
    setTaskLists((prev) => {
      const newList = [...prev];
      return newList.sort((a, b) => {
        return a.priority - b.priority;
      });
    });
  }

  async function exchangeListPosition(listId1: number, listId2: number) {
    const taskListsEdited: ITaskListState[] = JSON.parse(
      JSON.stringify(taskLists)
    );

    const list1 = findTaskList(listId1);
    const list2 = findTaskList(listId2);

    if (!list1 || !list2) return;

    await client.mutate({
      mutation: patchTaskListQuery,
      variables: {
        id: list1.id,
        priority: list2.priority,
        name: null,
        color: null,
      },
    });
    await client.mutate({
      mutation: patchTaskListQuery,
      variables: {
        id: list2.id,
        priority: list1.priority,
        name: null,
        color: null,
      },
    });

    for (let index = 0; index < taskListsEdited.length; index++) {
      const taskList = taskListsEdited[index];
      if (taskList.id === listId1) {
        taskList.priority = list2.priority;
      }
      if (taskList.id === listId2) {
        taskList.priority = list1.priority;
      }
    }

    setTaskLists(taskListsEdited);
    orderTaskListsByPriority();
  }

  return {
    taskLists,
    fetchTaskLists,
    setTaskLists,
    setSingleTaskList,
    findTaskList,
    deleteTaskList,
    createTaskLists,
    exchangeListPosition,
  };
};

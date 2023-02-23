import React from "react";
import { taskListState } from "../appState/taskListState";
import { useRecoilState } from "recoil";
import { ICreateTaskList, ITaskListState } from "../interfaces/taskList";
import { taskLists as taskListsPlaceholder } from "../placeholders/taskListsPlaceholders";
import { randomInteger } from "../utils/utils";

export const useTaskListState = () => {
  const [taskLists, setTaskLists] = useRecoilState(taskListState);

  async function fetchTaskLists(boardId: number) {
    const newTaskLists: ITaskListState[] = taskListsPlaceholder;
    setTaskLists(newTaskLists);
  }

  function setSingleTaskList(taskList: ITaskListState) {
    const elementIndex = taskLists.findIndex(
      (item) => item.listId === taskList.listId
    );

    if (elementIndex === -1) return;

    const updatedTaskLists = [...taskLists];
    updatedTaskLists[elementIndex] = taskList;

    setTaskLists(updatedTaskLists);
  }

  function deleteTaskList(taskListId: number) {
    const updatedTaskLists: ITaskListState[] = taskLists.filter((taskList) => {
      return taskList.listId !== taskListId;
    });
    setTaskLists(updatedTaskLists);
  }

  function findTaskList(taskListId: number) {
    for (let index = 0; index < taskLists.length; index++) {
      const taskList = taskLists[index];
      if (taskList.listId === taskListId) {
        return taskList;
      }
    }
    return null;
  }

  function createTaskLists(taskListData: ICreateTaskList) {
    const newTaskList: ITaskListState = {
      ...taskListData,
      listId: randomInteger(1, 1000),
      tasks: [],
    };

    const newTaskListsState: ITaskListState[] = [...taskLists, newTaskList];
    setTaskLists(newTaskListsState);
  }

  return {
    taskLists,
    fetchTaskLists,
    setTaskLists,
    setSingleTaskList,
    findTaskList,
    deleteTaskList,
    createTaskLists,
  };
};

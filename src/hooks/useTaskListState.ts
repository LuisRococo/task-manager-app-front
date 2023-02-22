import React from "react";
import { taskListState } from "../appState/taskListState";
import { useRecoilState } from "recoil";
import { ITaskListState } from "../interfaces/taskList";
import { taskLists as taskListsPlaceholder } from "../placeholders/taskListsPlaceholders";

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

  function findTaskList(taskListId: number) {
    for (let index = 0; index < taskLists.length; index++) {
      const taskList = taskLists[index];
      if (taskList.listId === taskListId) {
        return taskList;
      }
    }
    return null;
  }

  return {
    taskLists,
    fetchTaskLists,
    setTaskLists,
    setSingleTaskList,
    findTaskList,
  };
};

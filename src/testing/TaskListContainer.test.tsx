import { cleanup, render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { TaskListContainer } from "../components/boardPage/TaskListContainer/TaskListContainer";
import { taskListStateMockArray } from "./__mocks__/mockData/taskListStateMock";
import { createRef } from "react";

afterEach(cleanup);

const root = document.createElement("div");
root.id = "task-list-option-modal";
document.body.appendChild(root);

jest.mock("../hooks/useTaskListState", () => ({
  useTaskListState: () => ({
    taskLists: taskListStateMockArray,
  }),
}));

jest.mock("react-dnd", () => ({
  useDrop: () => [0, createRef()],
  useDrag: () => [{ opacity: 1 }, createRef()],
}));

it("It shows task lists when present", () => {
  const { getAllByTestId } = render(
    <RecoilRoot>
      <TaskListContainer />
    </RecoilRoot>
  );

  const taskListTitle = getAllByTestId("task-list-title-text");

  for (let i = 0; i < taskListStateMockArray.length; i++) {
    const taskListstate = taskListStateMockArray[i];
    const taskListComponentTitle = taskListTitle[i];

    expect(taskListComponentTitle.textContent).toBe(taskListstate.name);
  }
});

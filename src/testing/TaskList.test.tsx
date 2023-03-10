import { cleanup, render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { createRef } from "react";
import { TaskList } from "../components/boardPage/TaskList/TaskList";
import {
  taskListParamsMockNoTasks,
  taskListParamsMockWithTasks,
} from "./__mocks__/mockData/taskListParams";

afterEach(cleanup);

jest.mock("react-dnd", () => ({
  useDrop: () => [0, createRef()],
  useDrag: () => [{ opacity: 1 }, createRef()],
}));

it("It shows a correct title", () => {
  const { getByTestId } = render(
    <RecoilRoot>
      <TaskList {...taskListParamsMockNoTasks} />
    </RecoilRoot>
  );

  const taskCardTitle = getByTestId("task-list-title-text");

  expect(taskCardTitle.textContent).toBe(
    taskListParamsMockNoTasks.taskList.name
  );
});

it("It shows a 'No cards' message on no tasks", () => {
  const { queryByTestId } = render(
    <RecoilRoot>
      <TaskList {...taskListParamsMockNoTasks} />
    </RecoilRoot>
  );

  const taskCardTitle = queryByTestId("task-list-no-tasks-card-text");

  expect(taskCardTitle?.textContent).toBeDefined();
});

it("It does not shows a 'No cards' message when tasks defined", async () => {
  const { queryByTestId } = render(
    <RecoilRoot>
      <TaskList {...taskListParamsMockWithTasks} />
    </RecoilRoot>
  );

  const taskCardTitle = queryByTestId("task-list-no-tasks-card-text");

  expect(taskCardTitle?.textContent).toBeUndefined();
});

import { cleanup, render } from "@testing-library/react";
import { TaskCard } from "../components/boardPage/TaskCard.tsx/TaskCard";
import { taskCardParamsMock } from "./__mocks__/mockData/taskCardParams";
import { RecoilRoot } from "recoil";
import { createRef } from "react";

afterEach(cleanup);

jest.mock("react-dnd", () => ({
  useDrop: () => [0, createRef()],
  useDrag: () => [{ opacity: 1 }, createRef()],
}));

it("It shows a correct title", () => {
  const { getByTestId } = render(
    <RecoilRoot>
      <TaskCard {...taskCardParamsMock} />
    </RecoilRoot>
  );

  const taskCardTitle = getByTestId("task-card-title");

  expect(taskCardTitle.textContent).toBe(taskCardParamsMock.title);
});

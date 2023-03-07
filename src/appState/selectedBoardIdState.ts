import { atom } from "recoil";

interface ISelectedBoardIdState {
  id: null | number;
}

export const selectedBoardIdState = atom<ISelectedBoardIdState>({
  key: "board-id-state",
  default: { id: null },
});

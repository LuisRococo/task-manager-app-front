import { atom } from "recoil";

export const boardMenuVisibilityState = atom({
  key: "board-menu-visibility", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

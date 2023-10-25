import { atom } from "recoil";

export const languageIndexState = atom({
  key: "languageIndexState",
  default: 0,
});

export const translateIndexState = atom({
  key: "translateIndexState",
  default: 0,
});

export const darkModeState = atom({
  key: "darkModeState",
  default: false,
});

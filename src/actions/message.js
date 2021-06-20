import { _MESSAGE, REMOVE_MESSAGE } from "./types";

export const setMessage = (message) => ({
  type: _MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: REMOVE_MESSAGE,
});
import { _MESSAGE, REMOVE_MESSAGE } from "../actions/types";

const initialState = {};

export default function messageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case _MESSAGE:
      return { message: payload };

    case REMOVE_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}
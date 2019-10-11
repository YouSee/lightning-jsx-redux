import { createStore } from "redux";
import { provide } from "./redux/index";

const defaultState = {
  currentKey: "NOKEY"
};

const keyReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "NEW_KEY": {
      return {
        ...state,
        currentKey: action.key
      };
    }
    default:
      return state;
  }
};

export const store = createStore(keyReducer);
provide(store);

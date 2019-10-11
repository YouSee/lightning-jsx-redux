import { createStore } from "redux";
import { createConnectedLightningClass, connect, provide } from "./redux/index";

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

const myConnectedComponent = (state, actions, mapState) => (
  <MyText
    x={110}
    y={110}
    text={{
      fontSize: 24,
      text: state.currentKey,
      fontStyle: "bold",
      textColor: 0xff636efb,
      shadow: true,
      shadowColor: 0xff636efb,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowBlur: 2
    }}
    mapState={mapState}
    updated={(newState, oldState) => {
      if (newState.currentKey === 75) {
        // keystroke K
        actions.sendKey("WUUUH! K AS IN KENNETH");
        return {};
      }
      return {
        MyText: {
          text: {
            text: `new: ${newState.currentKey} old: ${oldState.currentKey}`
          }
        }
      };
    }}
  >
    <MyText
      x={40}
      y={40}
      text={{
        fontSize: 24,
        text: `new text: ${state.currentKey}`,
        fontStyle: "bold",
        textColor: 0xff636efb,
        shadow: true,
        shadowColor: 0xff636efb,
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowBlur: 2
      }}
    ></MyText>
  </MyText>
);

const myApp = connect(
  state => ({ currentKey: state.currentKey }),
  { sendKey: key => ({ type: "NEW_KEY", key: key }) }
)(myConnectedComponent);

class application extends lng.Application {
  static _template() {
    return {
      MyComponentInstance: {
        type: myApp
      }
    };
  }

  _handleKey(key) {
    store.dispatch({
      type: "NEW_KEY",
      key: key.keyCode
    });
  }
}

export default application;

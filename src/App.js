import { store } from "./initializeRedux";
import Text from "./components/text";

class application extends lng.Application {
  static _template() {
    return {
      MyComponentInstance: {
        type: Text
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

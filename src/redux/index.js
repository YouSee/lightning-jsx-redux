import * as helpers from "./helpers";
import { observeStore, wrapActionCreators } from "./helpers";

let currentStore;

const defaultMapState = () => ({});
const defaultMapDispatch = dispatch => ({ dispatch });

export { helpers };

function initializeConnectedLightning() {
  document._createConnectedLightningClass = (key, options, ...values) => {
    const setChildren = values => {
      if (!values || !values.length) return [];
      if (values.length === 1)
        return {
          Child: { type: values[0] }
        };
      const valueTypes = values.map(component => ({
        type: component
      }));
      return {
        children: valueTypes
      };
    };
    class connectedClass extends lng.Component {
      static _template() {
        const myObject = {
          ...options,
          ...setChildren(values)
        };
        delete myObject.updated;
        delete myObject.propsUpdated;
        delete myObject.__mapState
        return myObject;
      }

      set props(props) {
        if (
          options.propsUpdated &&
          typeof options.propsUpdated === "function"
        ) {
          // Parse updated props to function
          options.propsUpdated(props, this);
        }
      }

      updated(newState, oldState) {
        if (options.updated && typeof options.updated === "function") {
          options.updated(newState, oldState, this);
        }
      }

      _init() {
        console.log(options)
        if (options.__mapState) {
          const currentState = options.__mapState(currentStore.getState());
          observeStore(
            currentStore,
            currentState,
            options.__mapState,
            (newState, oldState) => this.updated(newState, oldState)
          );
        }
      }
    }
    return connectedClass;
  };
}

export function provide(store) {
  initializeConnectedLightning()
  currentStore = store;
}

export function connect(
  mapState = defaultMapState,
  mapDispatch = defaultMapDispatch
) {
  const actions = wrapActionCreators(mapDispatch)(currentStore.dispatch);
  const currentState = mapState(currentStore.getState());
  if (typeof mapState !== "function") {
    mapState = defaultMapState; // eslint-disable-line no-param-reassign
  }
  Object.defineProperty(mapState, "name", { value: "mapState" });
  return component => {
    return component(currentState, actions, mapState);
  };
}

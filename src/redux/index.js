import * as helpers from "./helpers";
import { observeStore, wrapActionCreators } from "./helpers";

let currentStore;

const defaultMapState = () => ({});
const defaultMapDispatch = dispatch => ({ dispatch });

export { helpers };

export function provide(store) {
  currentStore = store;
}

export function initializeConnectedLightning() {
  document._createConnectedLightningClass = (key, options, value) => {
    class connectedClass extends lng.Component {
      static _template() {
        const myObject = {
          [key]: {
            ...options,
            ...(typeof value === "function" ? { Child: { type: value } } : []),
            updated: undefined,
            mapState: undefined
          }
        };
        return myObject;
      }

      updated(newState, oldState) {
        if (options.updated) {
          options.updated(newState, oldState, this);
        }
      }

      _init() {
        if (options.mapState) {
          const currentState = options.mapState(currentStore.getState());
          observeStore(
            currentStore,
            currentState,
            options.mapState,
            (newState, oldState) => this.updated(newState, oldState)
          );
        }
      }
    }
    return connectedClass;
  };
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
  return component => {
    return component(currentState, actions, mapState, mapDispatch);
  };
}

import * as helpers from "./helpers";
import { observeStore, wrapActionCreators } from "./helpers";

let currentStore;

const defaultMapState = () => ({});
const defaultMapDispatch = dispatch => ({ dispatch });

export { helpers };

function initializeConnectedLightning() {
  document._createConnectedLightningClass = (key, options, ...values) => {
    if (typeof key === "function" && typeof key.constructor === "function") {
      // Key is a class, return it as is
      return key;
    }
    if (typeof key === "function") {
      // Key is a function ref
      return key(options);
    }

    const mapArrayToLightningClasses = values => {
      return {
        children: values.map(component => ({
          type: component
        }))
      };
    };
    const setChildren = values => {
      if (!values || !values.length) return [];
      if (values.length === 1) {
        if (values[0].length) {
          return mapArrayToLightningClasses(values[0]);
        }
        return {
          Child: { type: values[0] }
        };
      }
      return mapArrayToLightningClasses(values);
    };
    class connectedClass extends lng.Component {
      static _template() {
        const myObject = {
          ...options,
          ...setChildren(values)
        };
        delete myObject.updated;
        delete myObject.propsUpdated;
        delete myObject.__mapState;
        delete myObject.active;
        delete myObject.inactive;
        delete myObject.firstActive;
        delete myObject.pure;
        delete myObject.componentWillMount;
        delete myObject.props;
        delete myObject.init;
        return myObject;
      }

      set props(props) {
        this._props = props;
        if (options.pure && !this.__isActive) return;
        if (
          options.propsUpdated &&
          typeof options.propsUpdated === "function"
        ) {
          // Parse updated props to function
          options.propsUpdated(props, this);
        }
      }

      updated(newState, oldState) {
        if (options.pure && !this.__isActive) return;
        if (options.updated && typeof options.updated === "function") {
          options.updated(newState, oldState, this);
        }
      }

      _firstActive() {
        super._firstActive();
        this.__isActive = true;
        if (options.firstActive && typeof options.firstActive === "function") {
          options.firstActive(this._reduxState, this._props, this);
        }
      }

      _active() {
        super._active();
        this.__isActive = true;
        if (options.active && typeof options.active === "function") {
          options.active(this._reduxState, this._props, this);
        }
      }

      _inactive() {
        super._inactive();
        this.__isActive = false;
        if (options.inactive && typeof options.inactive === "function") {
          options.inactive(this._reduxState, this._props, this);
        }
      }

      setMapState(mapState) {
        if (
          this._reduxUnsubscribe &&
          typeof this._reduxUnsubscribe === "function"
        ) {
          // Unsubscribe
          this._reduxUnsubscribe();
        }
        if (mapState && typeof mapState === "function") {
          const currentState = mapState(currentStore.getState());
          this._reduxState = currentState;
          this._reduxUnsubscribe = observeStore(
            currentStore,
            currentState,
            mapState,
            (newState, oldState) => {
              this._reduxState = newState;
              this.updated(newState, oldState);
            }
          );
        }
      }

      _init() {
        super._init();
        this.setMapState(options.__mapState);
        this.updateMapState = this.setMapState.bind(this);
        if (options.props) {
          this._props = options.props;
        }
        if (options.init && typeof options.init === "function") {
          options.init(this._reduxState, this._props, this);
        }
      }
    }
    return connectedClass;
  };
}

export function provide(store) {
  initializeConnectedLightning();
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

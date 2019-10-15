import "./initializeRedux";
import MyApp from "./App.js";
import { connect, provide, initializeConnectedLightning } from "./redux";
import plugin from "./plugin/babel-transform";

module.exports = {
  connect,
  provide,
  initializeConnectedLightning,
  plugin
};

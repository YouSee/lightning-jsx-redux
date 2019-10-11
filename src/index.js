import MyApp from "./App.js";

const options = {
  stage: { w: 1920, h: 1080, clearColor: 0xff000000 },
  keys: {
    83: "Search"
  }
};
const app = new MyApp(options);
document.body.appendChild(app.stage.getCanvas());

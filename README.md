# Lightning-jsx-redux

This library enables use of jsx syntax with redux connect when developing lightning apps [Lightning framework documentation](https://webplatformforembedded.github.io/Lightning). 

# Setup

```
npm install lightning-jsx-redux --save-dev 
```

Add the following to your babelrc config:
```
{
  "plugins": [
    ["./src/plugin/babel-transform", {
      "pragma": "document._createConnectedLightningClass"
    }]
  ]
}
```

Before your lightning app is initiated you will need to initialize ```lightning-jsx-redux``` library with redux store.

```
import { createStore } from "redux";
import { initializeConnectedLightning, provide } from 'lightning-jsx-redux'
initializeConnectedLightning()
export const store = createStore(myReducer);
provide(store);
```

Here's an example of a connected jsx component:

```
import { connect } from 'lightning-jsx-redux'

const myComponent = (state, actions, mapState) => (
  <Text
    x={110}
    y={110}
    text={{
      fontSize: 24,
      text: state.myState,
      fontStyle: "bold",
      textColor: 0xff636efb,
    }}
    mapState={mapState}
    updated={(newState, oldState, self) => {
      // My update logic
    }}
  />
);

export default connect(
  state => ({ myState: state.myState }),
  { myFunc: value => ({ type: "SOME_ACTION", input: value }) }
)(myComponent);
```

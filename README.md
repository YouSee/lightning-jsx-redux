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
    "./src/plugin/babel-transform"
  ]
}
```

Before your lightning app is initiated you will need to provide ```lightning-jsx-redux``` library with your redux store.

``` javascript
import { createStore } from "redux";
import { provide } from 'lightning-jsx-redux'

export const store = createStore(myReducer);
provide(store);
```

Here's an example of a connected jsx component:

``` javascript
import { connect } from 'lightning-jsx-redux'

const myComponent = (state, actions) => (
  <Text
    x={110}
    y={110}
    text={{
      fontSize: 24,
      text: state.myState,
      fontStyle: "bold",
      textColor: 0xff636efb,
    }}
    updated={(newState, oldState, self) => {
      // My update logic
      self.patch({
        text: {
          text: newState.myState
        }
      })

      // Dispatch my redux action
      actions.myFunc('someValue')
    }}
    firstActive={(currentState, self) => console.log('First time visible')}
    active={(currentState, self) => console.log('Visible on screen')}
    inactive={(currentState, self) => console.log('Not visible on screen')}
  />
);

export default connect(
  state => ({ myState: state.myState }),
  { myFunc: value => ({ type: "SOME_ACTION", input: value }) }
)(myComponent);
```

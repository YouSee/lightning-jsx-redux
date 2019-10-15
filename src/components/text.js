import { connect } from "../redux";

const textComponent = (state, actions, mapState) => (
  <MySpecialText
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
    updated={(newState, oldState, self) => {
      if (!self._myAnimation)
        self._myAnimation = self.tag("MySpecialText").animation({
          duration: 1, //duration of 1 second
          repeat: 30, //Plays only once
          stopMethod: "immediate", //Stops the animation immediately
          actions: [{ p: "x", v: { 0: 0, 0.25: 50, 0.75: -50, 1: 0 } }]
        });
      if (newState.currentKey === 75) {
        // keystroke K
        self._myAnimation.start();
        self.patch({
          MySpecialText: {
            text: {
              text: `Wuuuh I'm animating`
            }
          }
        });
        return;
      }
      self._myAnimation.stop();
      self.patch({
        MySpecialText: {
          text: {
            text: `new: ${newState.currentKey} old: ${oldState.currentKey}`
          }
        }
      });
    }}
  >
    <MyText
      x={40}
      y={40}
      text={{
        fontSize: 24,
        text: `I am a child with: ${state.currentKey}`,
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
        return {
          MyText: {
            text: {
              text: `I am a child with: ${newState.currentKey}`
            }
          }
        };
      }}
    ></MyText>
  </MySpecialText>
);

export default connect(
  state => ({ currentKey: state.currentKey }),
  { sendKey: key => ({ type: "NEW_KEY", key: key }) }
)(textComponent);

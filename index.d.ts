declare namespace Lightning {
  declare const TEXT_ALIGN_LEFT: "left";
  declare const TEXT_ALIGN_RIGHT: "right";
  declare const TEXT_ALIGN_CENTER: "center";

  type LightningTextAlign =
    | typeof TEXT_ALIGN_LEFT
    | typeof TEXT_ALIGN_RIGHT
    | typeof TEXT_ALIGN_CENTER;

  declare const TEXT_OVERFLOW_ELLIPSIS = "ellipsis";
  declare const TEXT_OVERFLOW_CLIP = "clip";

  type LightningTextOverflow =
    | typeof TEXT_OVERFLOW_ELLIPSIS
    | typeof TEXT_OVERFLOW_CLIP
    | string;

  interface LightningTextAtributes {
    text: string;
    fontFace?: null | number;
    fontSize?: number;
    fontStyle?: string;
    lineHeight?: null | number;
    textAlign?: LightningTextAlign;
    wordWrap?: boolean;
    maxLines?: number;
    maxLinesSuffix?: number;
    wordWrapWidth?: number;
    textOverflow?: null | LightningTextOverflow;
    textBaseline?: string;
    textColor?: number;
    paddingLeft?: number;
    paddingRight?: number;
    highlightColor?: number;
    highlightOffset?: number;
    highlightPaddingLeft?: number;
    highlightPaddingRight?: number;
    offsetX?: number;
    offsetY?: number;
    shadow?: boolean;
    shadowColor?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    shadowBlur?: number;
    cutSx?: number;
    cutEx?: number;
    cutSy?: number;
    cutEy?: number;
  }

  declare const FLEX_DIRECTION_COLUMN: "column";
  declare const FLEX_DIRECTION_COLUMN_REVERSE: "column-reverse";
  declare const FLEX_DIRECTION_ROW: "row";
  declare const FLEX_DIRECTION_ROW_REVERSE: "row-reverse";

  type LightningFlexDirection =
    | typeof FLEX_DIRECTION_COLUMN
    | typeof FLEX_DIRECTION_COLUMN_REVERSE
    | typeof FLEX_DIRECTION_ROW
    | typeof FLEX_DIRECTION_ROW_REVERSE;

  declare const FLEX_ALIGN_ITEMS_FLEX_START: "flex-start";
  declare const FLEX_ALIGN_ITEMS_FLEX_END: "flex-end";
  declare const FLEX_ALIGN_ITEMS_CENTER: "center";
  declare const FLEX_ALIGN_ITEMS_STRETCH: "stretch";

  type LightningFlexAlignItems =
    | typeof FLEX_ALIGN_ITEMS_FLEX_START
    | typeof FLEX_ALIGN_ITEMS_FLEX_END
    | typeof FLEX_ALIGN_ITEMS_CENTER
    | typeof FLEX_ALIGN_ITEMS_STRETCH;

  declare const FLEX_JUSTIFY_CONTENT_FLEX_START: "flex-start";
  declare const FLEX_JUSTIFY_CONTENT_FLEX_END: "flex-end";
  declare const FLEX_JUSTIFY_CONTENT_CENTER: "center";
  declare const FLEX_JUSTIFY_CONTENT_SPACE_BETWEEN: "space-between";
  declare const FLEX_JUSTIFY_CONTENT_SPACE_AROUND: "space-around";
  declare const FLEX_JUSTIFY_CONTENT_SPACE_EVENLY: "space-evenly";

  type LightningFlexJustifyContent =
    | typeof FLEX_JUSTIFY_CONTENT_FLEX_START
    | typeof FLEX_JUSTIFY_CONTENT_FLEX_END
    | typeof FLEX_JUSTIFY_CONTENT_CENTER
    | typeof FLEX_JUSTIFY_CONTENT_SPACE_BETWEEN
    | typeof FLEX_JUSTIFY_CONTENT_SPACE_AROUND
    | typeof FLEX_JUSTIFY_CONTENT_SPACE_EVENLY;

  declare const FLEX_ALIGN_CONTENT_FLEX_START: "flex-start";
  declare const FLEX_ALIGN_CONTENT_FLEX_END: "flex-end";
  declare const FLEX_ALIGN_CONTENT_CENTER: "center";
  declare const FLEX_ALIGN_CONTENT_SPACE_BETWEEN: "space-between";
  declare const FLEX_ALIGN_CONTENT_SPACE_AROUND: "space-around";
  declare const FLEX_ALIGN_CONTENT_SPACE_EVENLY: "space-evenly";
  declare const FLEX_ALIGN_CONTENT_STRETCH: "stretch";

  type LightningFlexAlignContent =
    | typeof FLEX_ALIGN_CONTENT_FLEX_START
    | typeof FLEX_ALIGN_CONTENT_FLEX_END
    | typeof FLEX_ALIGN_CONTENT_CENTER
    | typeof FLEX_ALIGN_CONTENT_SPACE_BETWEEN
    | typeof FLEX_ALIGN_CONTENT_SPACE_AROUND
    | typeof FLEX_ALIGN_CONTENT_SPACE_EVENLY
    | typeof FLEX_ALIGN_CONTENT_STRETCH;

  interface Flex {
    direction?: LightningFlexDirection;
    wrap?: boolean;
    alignItems?: LightningFlexAlignItems;
    justifyContent?: LightningFlexJustifyContent;
    alignContent?: LightningFlexAlignContent;
    padding?: number | Array<number>;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
  }

  declare const FLEX_ITEM_ALIGN_SELF_FLEX_START: "flex-start";
  declare const FLEX_ITEM_ALIGN_SELF_FLEX_END: "flex-end";
  declare const FLEX_ITEM_ALIGN_SELF_CENTER: "center";
  declare const FLEX_ITEM_ALIGN_SELF_STRETCH: "stretch";

  type FlexItemAlignSelf =
    | typeof FLEX_ITEM_ALIGN_SELF_FLEX_START
    | typeof FLEX_ITEM_ALIGN_SELF_FLEX_END
    | typeof FLEX_ITEM_ALIGN_SELF_CENTER
    | typeof FLEX_ITEM_ALIGN_SELF_STRETCH;

  interface FlexItem {
    grow?: number;
    shrink?: number;
    alignSelf?: FlexItemAlignSelf;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    margin?: number | Array<number>;
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
  }

  type LightningWidthFunction = (ParentWidth: number) => number;
  type LightningHeightFunction = (ParentHeight: number) => number;

  interface Shader {
    type: any;
    [key: string]: any;
  }

  interface Texture {
    type: any;
    src?: string;
    [key: string]: any;
  }

  interface Props {
    [propKey: string]: any;
  }

  interface Child extends LightningBasicElementAttributes {
    type: any;
    props: Props;
  }

  interface Transition {
    duration?: number;
    delay?: number;
    timingFunction?: string;
  }

  interface Transitions {
    [element: string]: null | Transition;
  }

  type SmoothType = null | number | (number | Transition)[];

  interface Smooth {
    [element: string]: SmoothType;
  }

  const ANIMATION_STOP_METHOD_FADE: "fade";
  const ANIMATION_STOP_METHOD_REVERSE: "reverse";
  const ANIMATION_STOP_METHOD_FORWARD: "forward";
  const ANIMATION_STOP_METHOD_IMMEDIATE: "immediate";
  const ANIMATION_STOP_METHOD_ONETOTWO: "onetotwo";

  type AnimationStopMethod =
    | typeof ANIMATION_STOP_METHOD_FADE
    | typeof ANIMATION_STOP_METHOD_REVERSE
    | typeof ANIMATION_STOP_METHOD_FORWARD
    | typeof ANIMATION_STOP_METHOD_IMMEDIATE
    | typeof ANIMATION_STOP_METHOD_ONETOTWO;

  interface Animation {
    duration?: number;
    delay?: number;
    repeat?: number;
    repeatDelay?: number;
    repeatOffset?: number;
    actions?: Array<any>;
    stopMethod?: AnimationStopMethod;
    stopDuration?: number;
    stopDelay?: number;
    autostop?: boolean;
  }

  interface AnimationElement {
    start: () => void;
    play: () => void;
    pause: () => void;
    replay: () => void;
    skipDelay: () => void;
    finish: () => void;
    stop: () => void;
    stopNow: () => void;
    isPaused: () => boolean;
    isPlaying: () => boolean;
    isStopping: () => boolean;
    isActive: () => boolean;
    progress: (dt: number) => void;
  }

  interface LightningBasicElementAttributes {
    x?: number;
    y?: number;
    w?: number | LightningWidthFunction;
    h?: number | LightningHeightFunction;
    _id?: string | number;
    pure?: boolean;
    finalX?: number;
    finalY?: number;
    finalW?: number;
    finalH?: number;
    mountX?: number;
    mountY?: number;
    alpha?: number;
    visible?: boolean;
    color?: number;
    colorTop?: number;
    colorBottom?: number;
    colorLeft?: number;
    colorRight?: number;
    colorUl?: number;
    colorUr?: number;
    colorBl?: number;
    colorBr?: number;
    clipping?: boolean;
    zIndex?: number;
    forceZIndexContext?: boolean;
    shader?: null | Shader;
    texture?: null | Texture;
    boundsMargin?: number | Array<number>;
    flex?: Flex;
    flexItem?: FlexItem;
    props?: Props;
    Child?: Child;
    children?: Array<Child>;
    transitions?: Transitions;
    smooth?: Smooth;
    rtt?: boolean;
    setSmooth?: (
      element: string,
      value?: number,
      transition?: Transition
    ) => void;
    fastForward?: (element: string) => void;
    getSmooth?: (element: string) => number;
    animation?: (animation: Animation) => AnimationElement;
  }

  interface LightningAttributesText<LightningElementText>
    extends LightningBasicElementAttributes {
    text?: LightningTextAtributes;
    updated?: (
      newState: any,
      oldState: any,
      self: LightningElementText
    ) => void;
    firstActive?: (
      currentState: any,
      currentProps: any,
      self: LightningElementText
    ) => void;
    active?: (
      currentState: any,
      currentProps: any,
      self: LightningElementText
    ) => void;
    inactive?: (
      currentState: any,
      currentProps: any,
      self: LightningElementText
    ) => void;
    propsUpdated?: (props: any, self: LightningElementText) => void;
  }

  interface LightningElementText extends LightningBasicElementAttributes {
    patch: (
      data: LightningAttributesText<LightningElementText>,
      createMode?: boolean
    ) => void;
  }

  interface LightningAttributesRect<LightningElementRect>
    extends LightningBasicElementAttributes {
    rect?: boolean;
    updated?: (
      newState: any,
      oldState: any,
      self: LightningElementRect
    ) => void;
    firstActive?: (
      currentState: any,
      currentProps: any,
      self: LightningElementRect
    ) => void;
    active?: (
      currentState: any,
      currentProps: any,
      self: LightningElementRect
    ) => void;
    inactive?: (
      currentState: any,
      currentProps: any,
      self: LightningElementRect
    ) => void;
    propsUpdated?: (props: any, self: LightningElementRect) => void;
  }

  interface LightningElementRect extends LightningBasicElementAttributes {
    patch: (
      data: LightningAttributesRect<LightningElementRect>,
      createMode?: boolean
    ) => void;
  }

  interface LightningAttributesView<LightningElementView>
    extends LightningBasicElementAttributes {
    updated?: (
      newState: any,
      oldState: any,
      self: LightningElementView
    ) => void;
    firstActive?: (
      currentState: any,
      currentProps: any,
      self: LightningElementView
    ) => void;
    active?: (
      currentState: any,
      currentProps: any,
      self: LightningElementView
    ) => void;
    inactive?: (
      currentState: any,
      currentProps: any,
      self: LightningElementView
    ) => void;
    propsUpdated?: (props: any, self: LightningElementView) => void;
  }

  interface LightningElementView extends LightningBasicElementAttributes {
    patch: (
      data: LightningAttributesView<LightningElementView>,
      createMode?: boolean
    ) => void;
  }

  interface LightningAttributesImage<LightningElementImage>
    extends LightningBasicElementAttributes {
    src?: string;
    updated?: (
      newState: any,
      oldState: any,
      self: LightningElementImage
    ) => void;
    firstActive?: (
      currentState: any,
      currentProps: any,
      self: LightningElementImage
    ) => void;
    active?: (
      currentState: any,
      currentProps: any,
      self: LightningElementImage
    ) => void;
    inactive?: (
      currentState: any,
      currentProps: any,
      self: LightningElementImage
    ) => void;
    propsUpdated?: (props: any, self: LightningElementImage) => void;
  }

  interface LightningElementImage extends LightningBasicElementAttributes {
    patch: (
      data: LightningAttributesImage<LightningElementImage>,
      createMode?: boolean
    ) => void;
  }

  interface State {
    [stateKey: string]: any;
  }

  interface Actions {
    [actionKey: string]: any;
  }

  type MapState = (state: any) => State;

  interface Action {
    [actionProperty: string]: any;
    type: string;
  }

  type ActionWithParams = (...args: any[]) => Action;

  interface Dispatch {
    [dispatchAction: string]: Action | ActionWithParams;
  }

  type MapDispatch = Dispatch;

  type Component = (state: State, actions: Actions) => void;

  interface Connect {
    (mapState: MapState, mapDispatch: MapDispatch): (
      component: Component
    ) => any;
  }

  const connect: Connect;
}

declare global {
  namespace JSX {
    interface Element {
      key?: string;
      type: string | (() => any);
      props: { [propName: string]: any };
    }
    interface IntrinsicElements {
      view: Lightning.LightningAttributesView<Lightning.LightningElementView>;
      rect: Lightning.LightningAttributesRect<Lightning.LightningElementRect>;
      text: Lightning.LightningAttributesText<Lightning.LightningElementText>;
      image: Lightning.LightningAttributesImage<
        Lightning.LightningElementImage
      >;
    }
  }
}

export = Lightning;
export as namespace Lightning;

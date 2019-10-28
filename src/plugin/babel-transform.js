"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _helperPluginUtils() {
  const data = require("@babel/helper-plugin-utils");

  _helperPluginUtils = function() {
    return data;
  };

  return data;
}

function _pluginSyntaxJsx() {
  const data = _interopRequireDefault(require("@babel/plugin-syntax-jsx"));

  _pluginSyntaxJsx = function() {
    return data;
  };

  return data;
}

function _helperBuilderReactJsx() {
  const data = _interopRequireDefault(
    require("@babel/helper-builder-react-jsx")
  );

  _helperBuilderReactJsx = function() {
    return data;
  };

  return data;
}

function _core() {
  const data = require("@babel/core");

  _core = function() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _default = (0, _helperPluginUtils().declare)((api, options) => {
  api.assertVersion(7);
  const THROW_IF_NAMESPACE =
    options.throwIfNamespace === undefined ? true : !!options.throwIfNamespace;
  const PRAGMA_DEFAULT =
    options.pragma || "document._createConnectedLightningClass";
  const JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/;

  const createIdentifierParser = id => () => {
    return id
      .split(".")
      .map(name => _core().types.identifier(name))
      .reduce((object, property) =>
        _core().types.memberExpression(object, property)
      );
  };

  const visitor = (0, _helperBuilderReactJsx().default)({
    pre(state) {
      const tagName = state.tagName;
      const args = state.args;

      args.push(_core().types.stringLiteral(tagName));
    },

    post(state, pass) {
      state.callee = pass.get("jsxIdentifier")();
    },

    throwIfNamespace: THROW_IF_NAMESPACE
  });
  visitor.Program = {
    enter(path, state) {
      const { file } = state;
      let pragma = PRAGMA_DEFAULT;
      let pragmaSet = !!options.pragma;

      if (file.ast.comments) {
        for (const comment of file.ast.comments) {
          const jsxMatches = JSX_ANNOTATION_REGEX.exec(comment.value);

          if (jsxMatches) {
            pragma = jsxMatches[1];
            pragmaSet = true;
          }
        }
      }

      state.set("jsxIdentifier", createIdentifierParser(pragma));
      state.set("pragmaSet", pragmaSet);
    },

    exit(path, state) {
      if (
        state.get("pragmaSet") &&
        state.get("usedFragment") &&
        !state.get("pragmaFragSet")
      ) {
        throw new Error(
          "transform-react-jsx: pragma has been set but " +
            "pragmafrag has not been set"
        );
      }
    }
  };

  visitor.JSXAttribute = function(path) {
    if (_core().types.isJSXElement(path.node.value)) {
      path.node.value = _core().types.jsxExpressionContainer(path.node.value);
    }
  };

  const functionRestParam = _core().types.restElement(
    _core().types.identifier("rest")
  );
  const functionRestAttribute = _core().types.jsxAttribute(
    _core().types.jsxIdentifier("__mapState"),
    _core().types.jsxExpressionContainer(
      _core().types.logicalExpression(
        "&&",
        _core().types.logicalExpression(
          "&&",
          _core().types.identifier("rest"),
          _core().types.memberExpression(
            _core().types.identifier("rest"),
            _core().types.identifier("length")
          )
        ),
        _core().types.callExpression(
          _core().types.memberExpression(
            _core().types.identifier("rest"),
            _core().types.identifier("find")
          ),
          [
            _core().types.arrowFunctionExpression(
              [_core().types.identifier("item")],
              _core().types.binaryExpression(
                "===",
                _core().types.memberExpression(
                  _core().types.identifier("item"),
                  _core().types.identifier("name")
                ),
                _core().types.stringLiteral("mapState")
              )
            )
          ]
        )
      )
    )
  );

  visitor.JSXOpeningElement = function(path) {
    const id = _core().types.jsxIdentifier("__mapState");

    let functionParent = path.getFunctionParent();
    if (!functionParent) return;

    // We dont want map functions
    while (
      functionParent.parent &&
      functionParent.parent.callee &&
      functionParent.parent.callee.property &&
      functionParent.parent.callee.property.name === "map"
    ) {
      let nextParent = functionParent.getFunctionParent();
      if (!nextParent) return;
      functionParent = nextParent;
    }

    const functionParam =
      functionParent &&
      functionParent.node &&
      functionParent.node.params &&
      functionParent.node.params.length > 2 &&
      functionParent.node.params[2];

    const hasRestParams =
      functionParent &&
      functionParent.node &&
      functionParent.node.params &&
      functionParent.node.params.find(
        item => item && item.type === "RestElement"
      );

    if (functionParam && functionParam.name === "mapState")
      path.node.attributes.push(
        _core().types.jsxAttribute(
          id,
          _core().types.jsxExpressionContainer(functionParam)
        )
      );
    else {
      // Push rest param and attribute
      if (!hasRestParams) functionParent.node.params.push(functionRestParam);
      path.node.attributes.push(functionRestAttribute);
    }
  };

  return {
    name: "transform-react-jsx",
    inherits: _pluginSyntaxJsx().default,
    visitor
  };
});

exports.default = _default;

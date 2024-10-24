"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Models;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _RNMBXModelsNativeComponent = _interopRequireDefault(require("../specs/RNMBXModelsNativeComponent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _resolveAssets(models) {
  const resolvedModels = {};
  Object.keys(models).forEach(key => {
    const model = models[key];
    if (typeof model === 'string') {
      resolvedModels[key] = {
        url: model
      };
    } else {
      const asset = _reactNative.Image.resolveAssetSource(model);
      if (!asset) {
        throw new Error(`Could not resolve model asset: ${model}`);
      }
      resolvedModels[key] = asset;
    }
  });
  return resolvedModels;
}

/**
 * Name of 3D model assets to be used in the map
 */
function Models(props) {
  const {
    models,
    ...restOfProps
  } = props;
  return /*#__PURE__*/_react.default.createElement(_RNMBXModelsNativeComponent.default, _extends({}, restOfProps, {
    models: _resolveAssets(models)
  }));
}
//# sourceMappingURL=Models.js.map
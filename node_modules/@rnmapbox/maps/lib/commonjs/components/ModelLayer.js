"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _RNMBXModelLayerNativeComponent = _interopRequireDefault(require("../specs/RNMBXModelLayerNativeComponent"));
var _AbstractLayer = _interopRequireDefault(require("./AbstractLayer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Mapbox = _reactNative.NativeModules.RNMBXModule;

// @{codepart-replace-start(LayerPropsCommon.codepart-tsx)}

// @{codepart-replace-end}

/**
 * ModelLayer is a style layer that renders one or more stroked polylines on the map.
 */
class ModelLayer extends _AbstractLayer.default {
  static defaultProps = {
    sourceID: Mapbox.StyleSource.DefaultSourceID
  };
  render() {
    const props = {
      ...this.baseProps,
      sourceLayerID: this.props.sourceLayerID
    };
    return /*#__PURE__*/_react.default.createElement(_RNMBXModelLayerNativeComponent.default, _extends({
      ref: this.setNativeLayer
    }, props));
  }
}
var _default = exports.default = ModelLayer;
//# sourceMappingURL=ModelLayer.js.map
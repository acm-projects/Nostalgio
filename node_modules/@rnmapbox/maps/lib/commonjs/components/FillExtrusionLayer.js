"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _RNMBXFillExtrusionLayerNativeComponent = _interopRequireDefault(require("../specs/RNMBXFillExtrusionLayerNativeComponent"));
var _AbstractLayer = _interopRequireDefault(require("./AbstractLayer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const MapboxGL = _reactNative.NativeModules.RNMBXModule;
/**
 * FillExtrusionLayer is a style layer that renders one or more 3D extruded polygons on the map.
 */
class FillExtrusionLayer extends _AbstractLayer.default {
  static defaultProps = {
    sourceID: MapboxGL.StyleSource.DefaultSourceID
  };
  render() {
    const props = {
      ...this.props,
      ...this.baseProps,
      sourceLayerID: this.props.sourceLayerID
    };
    return /*#__PURE__*/_react.default.createElement(_RNMBXFillExtrusionLayerNativeComponent.default
    // @ts-expect-error just codegen stuff
    , _extends({
      ref: this.setNativeLayer
    }, props));
  }
}
var _default = exports.default = FillExtrusionLayer;
//# sourceMappingURL=FillExtrusionLayer.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _RNMBXLightNativeComponent = _interopRequireDefault(require("../specs/RNMBXLightNativeComponent"));
var _StyleValue = require("../utils/StyleValue");
var _nativeRef = _interopRequireDefault(require("../utils/nativeRef"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Light represents the light source for extruded geometries
 */
function Light(props, ref) {
  const {
    style,
    ...propWithoutStyle
  } = props;
  const nativeLightRef = (0, _nativeRef.default)((0, _react.useRef)(null));
  (0, _react.useImperativeHandle)(ref, () => ({
    setNativeProps(_props) {
      let propsToPass = _props;
      if (_props.style) {
        propsToPass = {
          ..._props,
          reactStyle: (0, _StyleValue.transformStyle)(_props.style)
        };
      }
      nativeLightRef.current?.setNativeProps(propsToPass);
    }
  }));
  return /*#__PURE__*/_react.default.createElement(_RNMBXLightNativeComponent.default
  // @ts-expect-error just codegen stuff
  , _extends({
    ref: nativeLightRef,
    testID: "RNMBXLight"
  }, propWithoutStyle, {
    reactStyle: (0, _StyleValue.transformStyle)(style)
  }));
}
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(/*#__PURE__*/(0, _react.forwardRef)(Light));
//# sourceMappingURL=Light.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const UnimplementedComponent = name => class SymbolLater extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement("div", null, "TODO implement ", name);
  }
};
var _default = exports.default = UnimplementedComponent;
//# sourceMappingURL=UnimplementedComponent.js.map
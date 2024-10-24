"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _heading = _interopRequireDefault(require("../assets/heading.png"));
var _SymbolLayer = require("./SymbolLayer");
var _Images = _interopRequireDefault(require("./Images"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const style = {
  iconImage: 'userLocationHeading',
  iconAllowOverlap: true,
  iconPitchAlignment: 'map',
  iconRotationAlignment: 'map'
};
const HeadingIndicator = ({
  heading
}) => {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
    key: "mapboxUserLocationHeadingIndicatorWrapper"
  }, /*#__PURE__*/_react.default.createElement(_Images.default, {
    images: {
      userLocationHeading: _heading.default
    },
    key: "mapboxUserLocationHeadingImages"
  }), /*#__PURE__*/_react.default.createElement(_SymbolLayer.SymbolLayer, {
    key: "mapboxUserLocationHeadingIndicator",
    id: "mapboxUserLocationHeadingIndicator",
    sourceID: "mapboxUserLocation",
    belowLayerID: "mapboxUserLocationWhiteCircle",
    style: {
      iconRotate: heading,
      ...style
    }
  }));
};
var _default = exports.default = HeadingIndicator;
//# sourceMappingURL=HeadingIndicator.js.map
import React from 'react';
import headingIcon from '../assets/heading.png';
import { SymbolLayer } from './SymbolLayer';
import Images from './Images';
const style = {
  iconImage: 'userLocationHeading',
  iconAllowOverlap: true,
  iconPitchAlignment: 'map',
  iconRotationAlignment: 'map'
};
const HeadingIndicator = ({
  heading
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, {
    key: "mapboxUserLocationHeadingIndicatorWrapper"
  }, /*#__PURE__*/React.createElement(Images, {
    images: {
      userLocationHeading: headingIcon
    },
    key: "mapboxUserLocationHeadingImages"
  }), /*#__PURE__*/React.createElement(SymbolLayer, {
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
export default HeadingIndicator;
//# sourceMappingURL=HeadingIndicator.js.map
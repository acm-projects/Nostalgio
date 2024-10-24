import React, { memo, useMemo } from 'react';
import { transformStyle } from '../utils/StyleValue';
import RNMBXATerrainNativeComponent from '../specs/RNMBXTerrainNativeComponent';
export const Terrain = /*#__PURE__*/memo(props => {
  let {
    style = {}
  } = props;
  if (props.exaggeration) {
    console.warn(`Terrain: exaggeration property is deprecated pls use style.exaggeration instead!`);
    style = {
      exaggeration: props.exaggeration,
      ...style
    };
  }
  const baseProps = useMemo(() => {
    return {
      ...props,
      reactStyle: transformStyle(style),
      style: undefined
    };
  }, [props, style]);
  return /*#__PURE__*/React.createElement(RNMBXATerrainNativeComponent, baseProps);
});
//# sourceMappingURL=Terrain.js.map
import React, { memo, useMemo } from 'react';
import { transformStyle } from '../utils/StyleValue';
import RNMBXAtmosphereNativeComponent from '../specs/RNMBXAtmosphereNativeComponent';
export const Atmosphere = /*#__PURE__*/memo(props => {
  const baseProps = useMemo(() => {
    return {
      ...props,
      reactStyle: transformStyle(props.style),
      style: undefined
    };
  }, [props]);
  return /*#__PURE__*/React.createElement(RNMBXAtmosphereNativeComponent, baseProps);
});
//# sourceMappingURL=Atmosphere.js.map
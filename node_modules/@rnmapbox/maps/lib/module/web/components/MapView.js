import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapContext from '../MapContext';

/**
 * MapView backed by Mapbox GL KS
 */
class MapView extends React.Component {
  state = {
    map: null
  };
  mapContainer = null;
  map = null;
  componentDidMount() {
    const {
      styleURL
    } = this.props;
    if (!this.mapContainer) {
      console.error('MapView - mapContainer should is null');
      return;
    }
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: styleURL || 'mapbox://styles/mapbox/streets-v11'
    });
    this.map = map;
    this.setState({
      map
    });
  }
  render() {
    const {
      children
    } = this.props;
    const {
      map
    } = this.state;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        height: '100%'
      },
      ref: el => this.mapContainer = el
    }, map && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute'
      }
    }, /*#__PURE__*/React.createElement(MapContext.Provider, {
      value: {
        map
      }
    }, children)));
  }
}
export default MapView;
//# sourceMappingURL=MapView.js.map
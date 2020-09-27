import _ from 'lodash';
import { featureCollection } from '@turf/helpers';
import DeckGL, { MapController, GeoJsonLayer } from 'deck.gl';
import { EditableGeoJsonLayer, DrawPolygonMode, ModifyMode, ViewMode } from 'nebula.gl';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { _MapContext as MapContext, NavigationControl, StaticMap } from 'react-map-gl';
import GeoCoder from 'react-map-gl-geocoder';

import colorToRGBArray from '../utilities/color';

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN; // eslint-disable-line

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      features: [],
      hoveredObject: null,
      pointerX: null,
      pointerY: null,
    };
    this.geocoder = React.createRef();
  }

  componentDidMount() {
    this.processData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data || this.props.view !== prevProps.view) {
      this.processData();
    }
  }

  processData = () => {
    if (!this.props.data || !this.props.data[this.props.view] || !this.props.data[this.props.view].nodes) {
      return;
    }
    const collection = this.props.data[this.props.view].nodes.map((node) => {
      if (!node.shape) {
        return [];
      }
      return [{ ...node.shape, properties: { fill: [160, 160, 180, 200], rate: node.rate } }];
    });
    const features = _.flatten(collection);
    this.setState({ features });
  }

  onLoad = () => {
    this.setState({ ready: true });
  }

  onViewStateChange = ({ viewState }) => {
    this.props.setViewPort(viewState);
  }

  onViewportChange = (viewState) => {
    this.props.setViewPort(viewState);
  }

  updateActiveBoundary = ({ updatedData }) => {
    const boundary = updatedData.features[0];
    const geography = boundary.geometry;
    this.props.setActive({
      ...this.props.active,
      boundary,
      geography,
    });
  }

  render() {
    const { features: managedFeatures, ready, hoveredObject, pointerX, pointerY } = this.state;
    const { active, extrude, elevationScale, features, viewMode, viewPort } = this.props;

    const layers = [
      new GeoJsonLayer({
        id: 'value-layer',
        data: { type: 'FeatureCollection', features: managedFeatures },
        elevationScale,
        extruded: extrude,
        filled: true,
        getElevation: (d) => (d.properties.ratio ? (2 + d.properties.ratio) * 5 : 2),
        getFillColor: (d) => (d.properties.fill ? colorToRGBArray(d.properties.fill) : [160, 160, 180, 200]),
        getLineColor: [160, 160, 180, 200],
        pickable: true,
        onHover: (info) => this.setState({
          hoveredObject: info.object,
          pointerX: info.x,
          pointerY: info.y,
        }),
      }),
    ];

    if (active) {
      let collection = { type: 'FeatureCollection', features: [] };
      let editOrCreateMode = DrawPolygonMode;
      if (this.props.active.boundary) {
        collection = featureCollection([this.props.active.boundary]);
        editOrCreateMode = ModifyMode;
      }
      const nebula = new EditableGeoJsonLayer({
        id: 'geojson-layer',
        data: collection,
        mode: viewMode === 'edit' ? editOrCreateMode : ViewMode,
        selectedFeatureIndexes: [0],
        onEdit: this.updateActiveBoundary,
      });
      layers.push(nebula);
    }

    return (
      <div className="relative w-screen h-screen/2 md:absolute md:h-screen">
        <DeckGL
          viewState={viewPort}
          onViewStateChange={this.onViewStateChange}
          controller={{ type: MapController, doubleClickZoom: false }}
          layers={layers}
          ContextProvider={MapContext.Provider}
        >
          <StaticMap
            mapboxApiAccessToken={MAPBOX_TOKEN}
            mapStyle="mapbox://styles/jaryd/cjpir43gu4i5c2sq8wxi4x4b1"
            onLoad={this.onLoad}
            ref={this.props.innerRef}
            reuseMaps
          />
          {ready && (
            <>
              {features.length === 0 && (
                <div className="hidden md:flex justify-end fixed top-0 right-0 p-4 z-10" ref={this.geocoder}>
                  <GeoCoder
                    clearOnBlur
                    containerRef={this.geocoder}
                    mapRef={this.props.innerRef}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    onViewportChange={this.onViewportChange}
                  />
                </div>
              )}
              <div className="px-4" style={{ position: 'absolute', right: 0, top: '50%', marginTop: '-25px' }} context={{ map: { version: '1.9' } }}>
                {/* eslint-disable no-underscore-dangle,no-param-reassign  */}
                <NavigationControl ref={(ref) => { if (ref != null) { ref._uiVersion = 2; } }} />
                {/* eslint-enable no-underscore-dangle,no-param-reassign  */}
              </div>
            </>
          )}
        </DeckGL>
      </div>
    );
  }
}

Map.propTypes = {
  active: PropTypes.shape({ boundary: PropTypes.shape({}) }),
  data: PropTypes.shape({}),
  elevationScale: PropTypes.number.isRequired,
  extrude: PropTypes.bool.isRequired,
  innerRef: PropTypes.shape({ current: PropTypes.instanceOf(StaticMap) }).isRequired,
  features: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  view: PropTypes.string.isRequired,
  viewMode: PropTypes.string.isRequired,
  viewPort: PropTypes.shape({}).isRequired,
  setActive: PropTypes.func.isRequired,
  setViewPort: PropTypes.func.isRequired,
};

Map.defaultProps = {
  active: null,
  data: null,
};

export default Map;

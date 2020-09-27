import { feature, featureCollection } from '@turf/helpers';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setView, setViewPort } from './slices/map';
import { focusOnFeature } from './utilities/mapping-helpers';

import Map from './containers/Map';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: [],
    }
    this.map = React.createRef();
  }

  static getDerivedStateFromProps({ view, data }) {
    let features = [];
    switch (view) {
      default:
        features = data.counties
          ? data.counties.nodes.filter((node) => node.shape !== null).map((node) => node.shape) : [];
    }
    return { features };
  }

  componentDidUpdate(prevProps) {
    if (!this.props.active && this.state.features.length > 0) {
      this.focusOnFeatures();
    }
  }

  focusOnFeatures = () => {
    if (this.state.features.length > 0 && this.map !== null) {
      const focus = featureCollection(this.state.features);
      focusOnFeature(focus, true, this.map, this.props.setViewPort);
    }
  }

  focusOnFeature = (f) => {
    if (f) {
      const focus = feature(f);
      focusOnFeature(focus, true, this.map, this.props.setViewPort);
    }
  }

  render() {
    const { features } = this.state;

    return (
      <Map
        data={this.props.data}
        features={features}
        innerRef={this.map}
      />
    );
  }
}

App.propTypes = {
  active: PropTypes.shape({}),
  data: PropTypes.shape({
    counties: PropTypes.shape({}),
  }).isRequired,
  view: PropTypes.string.isRequired,
  setViewPort: PropTypes.func.isRequired,
};

App.defaultProps = {
  active: null,
}

function mapStateToProps(state) {
  return {
    active: state.map.active,
    shape: state.map.shape,
    view: state.map.view,
  };
}

const ConnectedApp = connect(mapStateToProps, { setView, setViewPort })(App);

export default ConnectedApp;

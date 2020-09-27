import { connect } from 'react-redux';

import { setActive, setViewPort } from '../slices/map';
import Map from '../components/Map';

function mapStateToProps(state) {
  return {
    active: state.map.active,
    elevationScale: state.map.elevationScale,
    extrude: state.map.extrude,
    viewMode: state.map.viewMode,
    viewPort: state.map.viewPort,
    view: state.map.view,
  };
}

export default connect(mapStateToProps, { setActive, setViewPort })(Map);

import bbox from '@turf/bbox';
import center from '@turf/center';
import { FlyToInterpolator } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';

/**
 * Fits a zoom level to a set of bounds
 * @param {Array} bounds Array, with a top-left point and bottom-right point
 * @param {{ width: number, height: number }} viewport The current viewport, at least width/height
 * @return {{ zoom: number }} A viewport object that fits the given bounds
 */
export const fitBounds = (bounds, viewport) => new WebMercatorViewport(viewport).fitBounds(bounds);

/**
 * Focuses on single feature or a feature collection
 * @param {{ features: [], geometry: [], type: string }} feature The feature to focus on
 * @param {Boolean} fly Should we fly there? Or jump?
 * @param {{ current: Object }} map React ref for the underlying map
 * @param {Function} onViewStateChange callback for updating the viewport
 */
export const focusOnFeature = (feature, fly, map, onViewStateChange) => {
  const centerPoint = center(feature);
  const box = bbox(feature);
  const { width, height } = map.current.getMap().getContainer().getBoundingClientRect();
  const { zoom } = fitBounds([[box[0], box[1]], [box[2], box[3]]], { width, height });
  const viewState = {
    bearing: 0,
    pitch: 0,
    longitude: centerPoint.geometry.coordinates[0],
    latitude: centerPoint.geometry.coordinates[1],
    zoom: zoom - 1,
  };
  if (fly) {
    viewState.transitionInterpolator = new FlyToInterpolator();
    viewState.transitionDuration = 1000;
  }
  onViewStateChange(viewState);
};

/**
 * A default viewport containing the continental United States.
 */
export const defaultViewState = {
  latitude: 46.8772,
  longitude: -96.7898,
  pitch: 0,
  bearing: 0,
  zoom: 3,
};

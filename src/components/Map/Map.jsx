import React, { useState } from 'react';
import { BsPinFill } from 'react-icons/bs';
import ReactMapGL, { Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import styles from './Map.module.scss';

mapboxgl.workerClass = MapboxWorker;

export function Map({ location }) {
  const [viewport, setViewport] = useState(location);
  const settings = {
    dragPan: false,
    dragRotate: false,
    scrollZoom: false,
    touchZoom: false,
    touchRotate: false,
    keyboard: false,
    doubleClickZoom: false,
    zoom: 14,
    width: '100%',
    height: '200px',
  };

  return (
    <ReactMapGL
      {...viewport}
      {...settings}
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAP_ACCESS_TOKEN}
    >
      <Marker latitude={viewport.latitude} longitude={viewport.longitude} offsetLeft={-20} offsetTop={-10}>
        <BsPinFill className={styles.marker} />
      </Marker>
    </ReactMapGL>
  );
}

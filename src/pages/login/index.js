import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/header/header';
import useWebSocket from 'react-use-websocket';
import React, { useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const employee = 'Erico';

export default function Login() {
  const [receivedPositions, setReceivedPositions] = useState([]);

  // websocket
  const WS_URL = 'ws://192.168.0.10:9999/notify';
  useWebSocket(WS_URL, {
    onOpen: () => console.log('opened'),
    onMessage: (e) => {
      const toObject = JSON.parse(e.data);
      const parsed = {
        lat: parseFloat(toObject.lat),
        lng: parseFloat(toObject.lng),
      };
      setReceivedPositions((prevPositions) => [...prevPositions, parsed]);
    },
  });
  // websocket

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'SUA_API_KEY_AQUI',
  });

  const [map, setMap] = React.useState(null);

  useEffect(() => {
    if (isLoaded) {
      const bounds = new window.google.maps.LatLngBounds();
      receivedPositions.forEach((position) => {
        bounds.extend(position);
      });
      map.fitBounds(bounds);
    }
  }, [isLoaded, receivedPositions, map]);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <>
      <Header />
      <Container fluid className="bg">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={(map) => setMap(map)}
            onUnmount={onUnmount}
          >
            {receivedPositions.map((position, index) => (
              <Marker
                key={index}
                position={position}
                label={{
                  text: employee,
                  className: 'map-marker',
                }}
              />
            ))}
          </GoogleMap>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}

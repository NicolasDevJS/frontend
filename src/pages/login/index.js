import { useState } from "react";
import { Container } from "react-bootstrap";
import Header from "../../components/header/header";
import useWebSocket from 'react-use-websocket';
import React from 'react'
import { GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import { MarkerF} from '@react-google-maps/api';


const containerStyle = {
    width: '100%',
    height: '100%'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };

  const employee = "Erico"

export default function Login() {
	const [receivedPositions, setReceivedPositions] = useState([])

    // websocket
    const WS_URL = 'ws://192.168.0.10:9999/notify';
    useWebSocket(WS_URL, {

        onOpen: () => console.log('opened'),

        onMessage: (e) => {
            
			const toObject = JSON.parse(e.data) 
			
			const parsed = {
				lat: parseFloat(toObject.lat),
				lng: parseFloat(toObject.lng)
			}
			console.log(parsed)
			setReceivedPositions(parsed)
        }
    });
	// websocket


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDf9LYj1kzmybk0OIr5nND8AufUTthKz9U"
      })
    
      const [map, setMap] = React.useState(null)
    
      const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])

    // maps
    

    return (
        <>
            <Header />
            <Container fluid className="bg">
               {
                isLoaded ? (
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={receivedPositions}
						zoom={13}
				  >
					<MarkerF position={receivedPositions} options={{
						label: {
							text: employee,
							className: 'map-marker'
						}
						
						
					}} />
					
				  </GoogleMap>
			  ) : <></>
               }
            </Container>
        </>
        
    );
  }
import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const Map = ({ center }) => {
    return (
        <GoogleMap
            mapContainerStyle={{ width: '40wh', height: '60vh' }}
            zoom={10}
            center={center}
        >
            <Marker position={center} />
        </GoogleMap>
    );
};

export default Map;

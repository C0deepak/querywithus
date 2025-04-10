// import React from 'react';
// import Map, { Marker } from 'react-map-gl/maplibre';
// import 'maplibre-gl/dist/maplibre-gl.css';

// function MapView({ selected }) {
//     if (!selected?.coordinates) return null;

//     const [lat, lng] = selected.coordinates;

//     return (
//         <div style={{ height: '100vh', width: '100%' }}>
//             <Map
//                 initialViewState={{
//                     longitude: lng,
//                     latitude: lat,
//                     zoom: 12,
//                 }}
//                 style={{ width: '100%', height: '100%' }}
//                 mapStyle="https://tiles.stadiamaps.com/styles/osm_bright.json"
//             >
//                 <Marker longitude={lng} latitude={lat}>
//                     {/* Customize marker here if needed */}
//                     <div style={{ color: 'red', fontSize: '24px' }}>📍</div>
//                 </Marker>
//             </Map>
//         </div>
//     );
// }

// export default MapView;

'use client';

import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

export default function MapView({ selected }) {
    const mapRef = useRef(null);
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        if (selected?.coordinates && mapRef.current) {
            const [lat, lng] = selected.coordinates;
            mapRef.current.flyTo({ center: [lng, lat], zoom: 13, duration: 1000 });
            setPopupOpen(true);
        }
    }, [selected]);

    if (!selected?.coordinates) {
        return <div className="h-screen w-full bg-gray-100" />;
    }

    const [lat, lng] = selected.coordinates;

    return (
        <div className="h-screen w-full">
            <Map
                ref={mapRef}
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 12,
                }}
                mapStyle="https://tiles.stadiamaps.com/styles/osm_bright.json"
                style={{ width: '100%', height: '100%' }}
            >
                <Marker longitude={lng} latitude={lat} anchor="bottom">
                    <div style={{ color: 'red', fontSize: '24px' }}>📍</div>
                </Marker>

                {popupOpen && (
                    <Popup
                        longitude={lng}
                        latitude={lat}
                        anchor="top"
                        closeButton={false}
                        closeOnClick={false}
                        onClose={() => setPopupOpen(false)}
                    >
                        <div className="text-sm">
                            <div className="font-semibold">{selected.name}</div>
                            <div className="text-muted-foreground text-xs capitalize">
                                {selected.type.replace('_', ' ')}
                            </div>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
}


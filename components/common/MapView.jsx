'use client';

import Map, { Marker, Popup } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useRef, useState } from 'react';

export default function MapView({ selected }) {
    const mapRef = useRef(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const defaultCoordinates = [11.6234, 92.7265];;

    const coordinates = selected?.coordinates || defaultCoordinates;
    const [lat, lng] = coordinates;

    useEffect(() => {
        if (selected?.coordinates && mapRef.current) {
            const [lat, lng] = selected.coordinates;
            mapRef.current.flyTo({ center: [lng, lat], zoom: 13, duration: 1000 });
            setPopupOpen(true);
        }
    }, [selected]);

    return (
        <div className="h-screen w-full">
            <Map
                ref={mapRef}
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: selected ? 13 : 8,
                }}
                // mapStyle={`https://tiles.stadiamaps.com/styles/osm_bright.json`}
                mapStyle={`https://tiles.stadiamaps.com/styles/osm_bright.json?api_key=${process.env.NEXT_PUBLIC_STADIA_MAPS_API_KEY}`}
                // mapStyle="https://tiles.basemaps.cartocdn.com/gl/positron-gl-style/style.json"
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
                        <div className="text-sm rounded">
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


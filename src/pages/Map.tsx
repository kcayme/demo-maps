import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
    useMap,
} from 'react-leaflet';
import { useEffect, useMemo, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { LatLng } from 'leaflet';

import type { Pin } from '../types/map';
import { reverseGeocoding } from '../api/location';
import SidePanel from '../components/SidePanel';
import PinList from '../components/PinList';

type MapClickHandlerProps = {
    onAdd: (latlng: LatLng) => void;
};

type JumpToPinProps = {
    pin: Pin | null;
};

const STORE_KEY = 'map_pins';

const MapClickHandler = ({ onAdd }: MapClickHandlerProps) => {
    useMapEvents({
        click(e) {
            onAdd(e.latlng);
        },
    });
    return null;
};

const JumpToPin = ({ pin }: JumpToPinProps) => {
    const map = useMap();

    useEffect(() => {
        if (!pin) return;

        map.flyTo([pin.lat, pin.lng], Math.max(map.getZoom(), 13), {
            duration: 0.75,
        });
    }, [pin, map]);

    return null;
};

const Map = () => {
    const [pins, setPins] = useState<Pin[]>(() => {
        try {
            const stored = localStorage.getItem(STORE_KEY);
            return stored ? (JSON.parse(stored) as Pin[]) : [];
        } catch {
            return [];
        }
    });

    const [selectedPinId, setSelectedPinId] = useState<string | null>(null);

    useEffect(() => {
        localStorage.setItem(STORE_KEY, JSON.stringify(pins));
    }, [pins]);

    const selectedPin = useMemo(
        () => pins.find((p) => p.id === selectedPinId) ?? null,
        [pins, selectedPinId]
    );

    const handleAddPin = async (latlng: LatLng) => {
        const initPin: Pin = {
            id: crypto.randomUUID(),
            lat: latlng.lat,
            lng: latlng.lng,
            name: 'N/A',
            hasFetched: false,
        };

        setPins((prev) => [...prev, initPin]);

        const pinData = await reverseGeocoding(latlng);

        setPins((prev) =>
            prev.map((pin) =>
                pin.id === initPin.id
                    ? {
                          ...pin,
                          name: pinData?.displayName ?? pin.name,
                          hasFetched: true,
                      }
                    : pin
            )
        );
    };

    const handleRemovePin = (id: string) => {
        setPins((prev) => prev.filter((p) => p.id !== id));
    };

    const handleClearPins = () => {
        setPins([]);
        localStorage.removeItem(STORE_KEY);
    };

    const handleSelectPin = (pin: Pin) => setSelectedPinId(pin.id);

    return (
        <div className="flex h-screen w-screen bg-green-500 p-10">
            {/* Map */}
            <MapContainer
                center={[15.9797, 120.774]}
                zoom={13}
                className="w-screen h-full absolute inset-0 z-10"
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapClickHandler onAdd={handleAddPin} />
                <JumpToPin pin={selectedPin} />

                {pins.map((pin) => (
                    <Marker key={pin.id} position={[pin.lat, pin.lng]}>
                        <Popup>
                            Lat: {pin.lat.toFixed(5)} <br />
                            Lng: {pin.lng.toFixed(5)}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Side Panel */}
            <SidePanel pins={pins} onClear={handleClearPins}>
                <PinList
                    pins={pins}
                    selectedPinId={selectedPinId}
                    onSelect={handleSelectPin}
                    onRemove={handleRemovePin}
                />
            </SidePanel>
        </div>
    );
};

export default Map;

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from 'react-leaflet'
import { useState } from 'react'
import 'leaflet/dist/leaflet.css'
import L, { LatLng } from 'leaflet'

// Fix default marker icon issue with Leaflet + React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import type { Pin } from '../types/map'

// delete L.Icon.Default.prototype.L.Icon.Default.mergeOptions({
//     iconRetinaUrl: markerIcon2x,
//     iconUrl: markerIcon,
//     shadowUrl: markerShadow,
// })

type MapClickHandlerProps = {
    onAdd: (latlng: LatLng) => void
}

const MapClickHandler = ({ onAdd }: MapClickHandlerProps) => {
    useMapEvents({
        click(e) {
            onAdd(e.latlng)
        },
    })
    return null
}

const Map = () => {
    const [pins, setPins] = useState<Pin[]>([])

    const handleAddPin = (latlng: LatLng) => {
        setPins((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                lat: latlng.lat,
                lng: latlng.lng,
            },
        ])
    }

    const handleRemovePin = (id: any) => {
        setPins((prev) => prev.filter((p) => p.id !== id))
    }

    return (
        <div className="flex h-screen w-screen bg-green-500 p-10">
            {/* Map */}
            <MapContainer
                center={[12.9797, 121.774]}
                zoom={13}
                className="w-screen h-full absolute inset-0 z-10"
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapClickHandler onAdd={handleAddPin} />

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
            <aside className="relative z-50 left-0 h-full rounded-lg shadow-lg w-40 md:w-80 p-4 bg-white transition-transform duration-300 translate-x-0">
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg text-black font-semibold">
                            Pinned Locations
                        </h2>
                        <button className="text-lg text-gray-400">Clear</button>
                    </div>
                    {pins.length === 0 && (
                        <p className="text-sm text-center text-gray-500">
                            Click on the map to add a pin
                        </p>
                    )}
                </div>
                <ul className="space-y-2 text-gray-500">
                    {pins.map((pin, idx) => (
                        <li
                            key={pin.id}
                            className="border-b flex justify-between border-gray-300 p-2"
                        >
                            <div>
                                <div className="font-medium">
                                    {' '}
                                    Pin {idx + 1}
                                </div>
                                <div className="text-xs text-gray-600">
                                    {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
                                </div>
                            </div>
                            <button
                                className="mt-1 text-sm text-red-600"
                                onClick={() => handleRemovePin(pin.id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    )
}

export default Map

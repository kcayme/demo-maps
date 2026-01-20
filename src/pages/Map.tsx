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
import L from 'leaflet'

// Fix default marker icon issue with Leaflet + React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// delete L.Icon.Default.prototype.L.Icon.Default.mergeOptions({
//     iconRetinaUrl: markerIcon2x,
//     iconUrl: markerIcon,
//     shadowUrl: markerShadow,
// })

function MapClickHandler({ onAdd }) {
    useMapEvents({
        click(e) {
            onAdd(e.latlng)
        },
    })
    return null
}

const Map = () => {
    const [pins, setPins] = useState([])

    // const addPin = (latlng) => {
    //     setPins((prev) => [
    //         ...prev,
    //         {
    //             id: crypto.randomUUID(),
    //             lat: latlng.lat,
    //             lng: latlng.lng,
    //             name: `Location ${prev.length + 1}`,
    //         },
    //     ])
    // }

    // const removePin = (id: any) => {
    //     setPins((prev) => prev.filter((p) => p.id !== id))
    // }

    return (
        <div className="flex h-screen w-screen bg-green-500 p-10">
            {/* Side Panel */}
            <aside className="border-2 rounded-l-lg p-4 bg-red-500">
                <h2 className="text-lg font-semibold">Pinned Locations</h2>
                {pins.length === 0 && (
                    <p className="text-sm text-gray-500">
                        Click on the map to add a pin
                    </p>
                )}
                {/* <ul className="space-y-2"> */}
                {/* {pins.map((pin) => ( */}
                {/*     <li key={pin.id} className="border rounded p-2"> */}
                {/*         <div className="font-medium">{pin.name}</div> */}
                {/*         <div className="text-xs text-gray-600"> */}
                {/*             {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)} */}
                {/*         </div> */}
                {/*         <button */}
                {/*             className="mt-1 text-sm text-red-600" */}
                {/*             onClick={() => removePin(pin.id)} */}
                {/*         > */}
                {/*             Remove */}
                {/*         </button> */}
                {/*     </li> */}
                {/* ))} */}
                {/* </ul> */}
            </aside>

            {/* Map */}
            <MapContainer
                center={[37.7749, -122.4194]}
                zoom={13}
                className="w-auto"
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* <MapClickHandler onAdd={addPin} /> */}

                {/* {pins.map((pin) => ( */}
                {/*     <Marker key={pin.id} position={[pin.lat, pin.lng]}> */}
                {/*         <Popup> */}
                {/*             <strong>{pin.name}</strong> */}
                {/*             <br /> */}
                {/*             {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)} */}
                {/*         </Popup> */}
                {/*     </Marker> */}
                {/* ))} */}
            </MapContainer>
        </div>
    )
}

export default Map

import { MapPinIcon } from '@heroicons/react/24/outline';
import type { Pin } from '../types/map';
import { TrashIcon } from '@heroicons/react/24/outline';
import { MapIcon } from '@heroicons/react/24/outline';

type PinListProps = {
    pins: Pin[];
    selectedPinId: string | null;
    onSelect: (pin: Pin) => void;
    onRemove: (id: string) => void;
};

const PinList = ({ pins, selectedPinId, onSelect, onRemove }: PinListProps) => (
    <ul className="flex-1 overflow-y-auto w-full space-y-2 text-gray-500">
        {pins.map((pin, idx) => (
            <li
                key={pin.id}
                className={`border-b w-full flex justify-between gap-x-1 border-gray-300 p-2 
          hover:cursor-pointer hover:bg-gray-100 hover:shadow-sm rounded-md 
          ${selectedPinId === pin.id ? 'bg-gray-50' : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(pin);
                }}
            >
                <div className="flex flex-col gap-y-3 w-full pr text-gray-600">
                    <div className="font-medium flex justify-between items-center">
                        Pin {idx + 1}
                        <button
                            className="mt-1 text-sm text-red-600 cursor-pointer rounded-full hover:bg-red-500 hover:text-white p-1"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove(pin.id);
                            }}
                        >
                            <TrashIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {pin.hasFetched ? (
                        <>
                            <div className="text-sm flex items-center gap-x-2 hover:underline">
                                <div className="w-9 h-9 flex items-center">
                                    <MapIcon className="w-5 h-5" />
                                </div>
                                {pin.name}
                            </div>
                            <div className="text-xs flex gap-x-2 items-center">
                                <MapPinIcon className="w-5 h-5" />
                                {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
                            </div>
                        </>
                    ) : (
                        <span className="italic text-sm">
                            Fetching location for pin #{idx + 1} ...
                        </span>
                    )}
                </div>
            </li>
        ))}
    </ul>
);

export default PinList;

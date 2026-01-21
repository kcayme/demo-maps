import { FlagIcon } from '@heroicons/react/24/outline';
import type { Pin } from '../types/map';
import type React from 'react';

export type SidePanelProps = {
    pins: Pin[];
    onClear: () => void;
    children: React.ReactNode;
};

const SidePanel = ({ pins, onClear, children }: SidePanelProps) => {
    return (
        <aside
            className="fixed z-50 bg-white shadow-lg
                           transition-transform duration-300 ease-in-out
                           flex flex-col overflow-hidden

                           h-[40vh]
                           p-2

                           bottom-0 left-0 right-0
                           md:h-[70vh]
                           rounded-t-xl

                           md:relative md:left-5
                           lg:h-3/4
                           md:w-80
                           md:rounded-lg"
        >
            <div className="h-fit">
                <div className="flex justify-between items-center mb-3 border-b-2 border-gray-100 p-2">
                    <h2 className="text-lg text-black font-semibold">
                        Pinned Locations
                    </h2>
                    <button
                        className="text-sm text-gray-500 hover:underline cursor-pointer"
                        onClick={() => onClear()}
                    >
                        Clear
                    </button>
                </div>
                {pins.length === 0 && (
                    <p className="text-sm text-center gap-y-2 items-center flex flex-col text-gray-500">
                        <FlagIcon className="h-6 w-6" />
                        Add pins by clicking on the map
                    </p>
                )}
            </div>
            {children}
        </aside>
    );
};

export default SidePanel;

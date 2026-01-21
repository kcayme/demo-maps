import type { LatLng } from 'leaflet';
import AxiosClient from '../lib/axios';

export type Place = {
    lat: string;
    lon: string;
    displayName: string;
};

export const reverseGeocoding = async (
    latlng: LatLng
): Promise<Place | null> => {
    try {
        const resp = await AxiosClient.get('/reverse', {
            params: {
                lat: latlng.lat,
                lon: latlng.lng,
                format: 'json',
            },
        });

        if (!resp.data) return null;

        return {
            lat: resp.data.lat,
            lon: resp.data.lon,
            displayName: resp.data.display_name,
        };
    } catch (e) {
        console.error('Failed to fetch data', e);
        return null;
    }
};

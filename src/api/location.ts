import type { LatLng } from 'leaflet'
import AxiosClient from '../lib/axios'

export type Place = {
    lat: string
    lon: string
    displayName: string
    icon: string
}

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
            headers: {
                'User-Agent': 'MyReactLeafletApp/1.0',
            },
        })

        if (!resp.data) return null

        return {
            lat: resp.data.lat,
            lon: resp.data.lon,
            displayName: resp.data.display_name,
            icon: resp.data.icon,
        }
    } catch (e) {
        console.error('Failed to fetch data', e)
        return null
    }
}

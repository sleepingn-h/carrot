import { Aroundme } from '@/hooks/useAroundMe';
import { GeoArticle } from '@/model/article';

type Geocode = {
  x: number;
  y: number;
};

export type DisplayPosition = {
  longitude: number;
  latitude: number;
  longitudeDelta: number;
  latitudeDelta: number;
  zoom: number;
};

export async function getGeocode(address: string) {
  const response = await fetch(
    `https://api.vworld.kr/req/address?service=address&request=getcoord&address=${address}&type=road&key=${process.env.NEXT_PUBLIC_GEOCODER_API_KEY}`,
    {
      mode: 'no-cors',
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || '서버 요청 실패');
  }

  return data.response.result.point;
}

export function getDisplayPosition(map: google.maps.Map): DisplayPosition {
  const center = map.getCenter();
  const bounds = map.getBounds();

  const longitudeDelta = bounds
    ? (bounds.getNorthEast().lng() - bounds.getSouthWest().lng()) / 2
    : 0;
  const latitudeDelta = bounds
    ? (bounds.getNorthEast().lat() - bounds.getSouthWest().lat()) / 2
    : 0;
  const longitude = center ? center.lng() : 0;
  const latitude = center ? center.lat() : 0;
  const zoom = map.getZoom() || 0;

  return {
    longitude,
    latitude,
    longitudeDelta: longitudeDelta,
    latitudeDelta: latitudeDelta,
    zoom,
  };
}

export function getAroundMe(boundary: DisplayPosition, data: Aroundme[]) {
  const northEastBoundary = {
    latitude: Number(boundary.latitude) + Number(boundary.latitudeDelta),
    longitude: Number(boundary.longitude) + Number(boundary.longitudeDelta),
  };

  const southWestBoundary = {
    latitude: Number(boundary.latitude) - Number(boundary.latitudeDelta),
    longitude: Number(boundary.longitude) - Number(boundary.longitudeDelta),
  };

  const isGeocodeLatitudeWithinBounds = (geocode: GeoArticle) => {
    return geocode.lat > southWestBoundary.latitude && geocode.lat < northEastBoundary.latitude;
  };
  const isGeocodeLongitudeWithinBounds = (geocode: GeoArticle) => {
    return geocode.lng > southWestBoundary.longitude && geocode.lng < northEastBoundary.longitude;
  };

  return data.filter(
    (d) => isGeocodeLatitudeWithinBounds(d.geocode) && isGeocodeLongitudeWithinBounds(d.geocode)
  );
}

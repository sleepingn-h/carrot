import type { GeoArticle } from '@/model/article';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAroundMe from '@/hooks/useAroundMe';
import GoogleMapMarker from './GoogleMapMarker';
import styles from './GoogleMap.module.css';

const GoogleMap = () => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [currentLocation, setCurrentLocation] = useState<GeoArticle | null>(null);
  //{lat: 37.494, lng: 126.856}
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
  const { dispatch, SET_REGISTER_AREA, aroundMe } = useAroundMe(googleMap);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (currentLocation !== null && ref.current) {
      const initialMap = new window.google.maps.Map(ref.current, {
        center: currentLocation,
        zoom: 16,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID as string,
        minZoom: 12,
        maxZoom: 18,
        gestureHandling: 'greedy',
        restriction: {
          latLngBounds: {
            north: 39,
            south: 32,
            east: 132,
            west: 124,
          },
          strictBounds: true,
        },
      });

      setGoogleMap(initialMap);
    }
  }, [currentLocation]);

  useEffect(() => {
    router.refresh();
    if (googleMap !== null) {
      googleMap.addListener('idle', () => {
        const areas = aroundMe();

        dispatch(SET_REGISTER_AREA({ areas }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aroundMe, dispatch, googleMap]);

  return (
    <div ref={ref} id='map' className={styles['google-map']}>
      {googleMap !== undefined ? (
        <GoogleMapMarker map={googleMap} position={currentLocation} />
      ) : null}
    </div>
  );
};

export default GoogleMap;

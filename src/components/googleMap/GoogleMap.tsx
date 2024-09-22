import { useEffect, useRef, useState } from 'react';
import GoogleMapMarker from './GoogleMapMarker';
import styles from './GoogleMap.module.css';

const GoogleMap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: null, lng: null });
  const [googleMap, setGoogleMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        console.log(position);
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

  return (
    <div ref={ref} id='map' className={styles['google-map']}>
      {googleMap !== undefined ? (
        <GoogleMapMarker map={googleMap} position={currentLocation} />
      ) : null}
    </div>
  );
};

export default GoogleMap;

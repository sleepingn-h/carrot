import { useEffect, useRef } from 'react';
import GoogleMapPin from './GoogleMapPin';
import styles from './GoogleMap.module.css';

function GoogleMapMarker({
  map,
  position,
}: {
  map: google.maps.Map;
  position: { lat: number; lng: number };
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const initMarker = new google.maps.marker.AdvancedMarkerElement({
        position,
        map,
        title: '마커',
        content: ref.current,
      });

      return () => {
        initMarker.map = null;
      };
    }
  }, [ref, map, position]);

  return (
    <div className={styles.marker}>
      <GoogleMapPin ref={ref}>마커</GoogleMapPin>
    </div>
  );
}

export default GoogleMapMarker;

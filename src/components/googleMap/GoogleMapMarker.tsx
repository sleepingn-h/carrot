import { type MutableRefObject, useEffect, useRef } from 'react';
import useAroundMe, { Aroundme } from '@/hooks/useAroundMe';
import { GeoArticle } from '@/model/article';
import GoogleMapPin from './GoogleMapPin';
import styles from './GoogleMap.module.css';

export default function GoogleMapMarker({
  map,
  position,
}: {
  map: google.maps.Map;
  position: { lat: number; lng: number };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { area } = useAroundMe(map);

  useEffect(() => {
    if (ref.current) {
      const initMarker = new google.maps.marker.AdvancedMarkerElement({
        position,
        map,
        title: '마커',
        content: ref.current,
      });

      setMarkers(map, area, ref);

      return () => {
        initMarker.map = null;
      };
    }
  }, [ref, map, position, area]);

  if (area === undefined) {
    return <div></div>;
  }

  return area.map((a) => (
    <div key={a.id} className={styles.marker}>
      <GoogleMapPin area={a} map={map} />
    </div>
  ));
}

function setMarkers(
  map: google.maps.Map,
  areas: Aroundme[],
  ref: MutableRefObject<HTMLDivElement>
) {
  for (let i = 0; i < areas.length; i++) {
    const area = areas[i];

    new google.maps.marker.AdvancedMarkerElement({
      position: { lat: area.geocode.lat, lng: area.geocode.lng },
      map,
      // title: '마커',
      content: ref.current,
      // title: beach[0],
      // zIndex: beach[3],
    });
  }
}

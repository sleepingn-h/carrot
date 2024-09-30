import { Aroundme } from '@/hooks/useAroundMe';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

type GoogleMapPinProps = {
  area: Aroundme;
  map: google.maps.Map;
};

const GoogleMapPin = ({ area, map }: GoogleMapPinProps) => {
  const router = useRouter();

  useEffect(() => {
    const { lat, lng } = area.geocode;
    const container = document.createElement('div');
    const markerInstance = new google.maps.marker.AdvancedMarkerElement({
      position: { lat, lng },
      map: map,
      content: container,
    });

    createRoot(container).render(
      <div style={{ backgroundColor: 'red', width: '10px', height: '10px', borderRadius: '50%' }} />
    );

    markerInstance.addListener('click', () => {
      router.push(`/fleamarket/articles/${area.id}`);
    });

    return () => {
      markerInstance.map = null;
    };
  }, [area, map, router]);

  return <span></span>;
};

export default GoogleMapPin;

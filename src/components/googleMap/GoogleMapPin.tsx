import { ReactNode, forwardRef, useEffect } from 'react';

interface GoogleMapPinProps {
  children: ReactNode;
}

const GoogleMapPin = forwardRef<HTMLDivElement, GoogleMapPinProps>(function GoogleMapPin(
  { children },
  ref
) {
  useEffect(() => {
    if (typeof ref !== 'function') {
      if (ref?.current) {
        const initPin = new google.maps.marker.PinElement({
          background: '#db4455',
          borderColor: '#881824',
        });
        ref.current.appendChild(initPin.element);

        return () => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          ref.current?.removeChild(initPin.element);
        };
      }
    }
  }, [ref]);

  return <div ref={ref}>{children}</div>;
});

export default GoogleMapPin;

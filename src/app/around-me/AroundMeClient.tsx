'use client';
import GoogleMap from '@/components/googleMap/GoogleMap';
import Loader from '@/components/loader/Loader';
import { Status, Wrapper } from '@googlemaps/react-wrapper';

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <Loader />;
    case Status.FAILURE:
      return <>에러 발생</>;
    case Status.SUCCESS:
      return <GoogleMap />;
    default:
      return <>에러발생</>;
  }
};
const AroundMeClient = () => {
  return (
    <Wrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
      render={render}
      libraries={['marker']}
    />
  );
};

export default AroundMeClient;

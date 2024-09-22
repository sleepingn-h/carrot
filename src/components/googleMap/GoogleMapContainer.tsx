import { Status, Wrapper } from '@googlemaps/react-wrapper';
import GoogleMap from './GoogleMap';

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <>로딩중...</>;
    case Status.FAILURE:
      return <>에러 발생</>;
    case Status.SUCCESS:
      return <GoogleMap />;
    default:
      return <>에러발생</>;
  }
};
const GoogleMapContainer = () => {
  return (
    <Wrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
      render={render}
      libraries={['marker']}
    />
  );
};

export default GoogleMapContainer;

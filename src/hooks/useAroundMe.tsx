import type { FetchArticle, GeoArticle } from '@/model/article';
import { getAllCollections } from '@/lib/firebase/firebase-database';
import { selectArea, SET_REGISTER_AREA } from '@/redux/slice/areaSlice';
import { type DisplayPosition, getAroundMe, getDisplayPosition } from '@/utils/geocode';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export type Aroundme = {
  id: string;
  geocode: GeoArticle;
};

const useAroundMe = (map: google.maps.Map) => {
  const [geocode, setGeocode] = useState<Aroundme[]>();
  const data = useMemo(async () => {
    await getAllCollections<FetchArticle>('products') //
      .then<Aroundme[]>((res) => res.map((r) => ({ id: r.id, geocode: r.geocode })))
      .then((result) => setGeocode(result));
  }, []);

  const dispatch = useDispatch();
  const area = useSelector(selectArea);

  const aroundMe = useCallback(() => {
    if (map === null) return;
    const boundary: DisplayPosition = getDisplayPosition(map);

    if (geocode) {
      // console.log(getAroundMe(boundary, geocode));
      return getAroundMe(boundary, geocode);
    }

    return [];
  }, [geocode, map]);

  return { dispatch, SET_REGISTER_AREA, aroundMe, area };
};

export default useAroundMe;

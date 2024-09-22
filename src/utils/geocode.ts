type Geocode = {
  x: number;
  y: number;
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

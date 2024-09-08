import { TCoords } from '@/types';

export const getDistance = (userCoords: TCoords, destCoords: TCoords) => {
  const lat1 = userCoords.latitude;
  const lon1 = userCoords.longitude;
  const lat2 = destCoords.latitude;
  const lon2 = destCoords.longitude;

  const xDiff = (lon2 - lon1) * Math.cos((((lat1 + lat2) / 2) * Math.PI) / 180); // 경도 보정
  const yDiff = lat2 - lat1;
  const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff) * 111320; // 위도/경도 -> 미터로 변환
  return distance;
};

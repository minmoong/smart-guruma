import { TCoords } from '@/types';
import haversine from 'haversine';

export const getDistance = (userCoords: TCoords, destCoords: TCoords) => {
  const start = {
    latitude: userCoords.latitude,
    longitude: userCoords.longitude,
  };
  const end = {
    latitude: destCoords.latitude,
    longitude: destCoords.longitude,
  };
  return haversine(start, end, { unit: 'meter' });
};

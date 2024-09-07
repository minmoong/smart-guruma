import * as Location from 'expo-location';
import { TUserLocation } from '@/types';

export const requestLocation = async (
  setIsLocationDenied: React.Dispatch<React.SetStateAction<boolean>>,
  setUserLocation: React.Dispatch<
    React.SetStateAction<TUserLocation | undefined>
  >
) => {
  let { status: foregroundStatus } =
    await Location.requestForegroundPermissionsAsync();

  if (foregroundStatus !== 'granted') {
    setIsLocationDenied(true);
    return;
  }

  let { status: backgroundStatus } =
    await Location.requestBackgroundPermissionsAsync();

  if (backgroundStatus !== 'granted') {
    setIsLocationDenied(true);
    return;
  }

  let locationSubscription = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.BestForNavigation,
    },
    (location) => {
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        heading: location.coords.heading ?? 0,
      });
    }
  );
};
